import {
  $,
  isEngine,
  escape,
  sanitizeUrl,
  Tooltip,
  isMobile,
  Resizer,
  CardType
} from "@aomao/engine"
import Pswp from "@/components/common/imagepreview/index.js"
import "./index.css"

export const winPixelRatio = window.devicePixelRatio
let pswp;
class Image {
  rate = 1
  isLoad = false

  constructor(editor, options) {
    this.editor = editor
    this.options = options
    this.src = this.options.src
    this.size = this.options.size || {
      width: 0,
      height: 0,
      naturalHeight: 0,
      naturalWidth: 0
    }
    this.maxHeight = this.options.maxHeight
    this.status = this.options.status
    this.root = $(this.renderTemplate())
    this.progress = this.root.find(".data-image-progress")
    this.image = this.root.find("img")
    this.detail = this.root.find(".data-image-detail")
    this.meta = this.root.find(".data-image-meta")
    this.maximize = this.root.find(".data-image-maximize")
    this.bg = this.root.find(".data-image-bg")
    this.maxWidth = this.getMaxWidth()
    this.pswp = pswp || new Pswp(editor)
    this.message = this.options.message
    pswp = this.pswp
  }

  renderTemplate(message) {
    const { link, percent, className, onBeforeRender } = this.options

    if (this.status === "error") {
      return `<span class="data-image-error" style="max-width:${this.maxWidth}px">
                <span class="data-icon data-icon-error"></span>
                ${message || this.options.message}
                <span class="data-icon data-icon-copy"></span>
              </span>`
    }
    const src = onBeforeRender ? onBeforeRender(this.status, this.options.src, this.editor)
      : this.options.src
    const progress = `<span class="data-image-progress">
                            <i class="data-anticon">
                                <svg viewBox="0 0 1024 1024" class="data-anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                                </svg>
                            </i>
                            <span class="percent">${percent || 0}%</span>
                        </span>`
    const alt = escape(this.options.alt || "")
    const attr = alt ? ` alt="${alt}" title="${alt}" ` : ""
    //加上 data-drag-image 样式可以拖动图片
    let img = `<img src="${sanitizeUrl(src)}" class="${className || ""} data-drag-image" ${attr}/>`
    //只读渲染加载链接
    if (link && !isEngine(this.editor)) {
      const target = link.target || "_blank"
      img = `<a href="${sanitizeUrl(link.href)}" target="${target}">${img}</a>`
    }
    //全屏图标
    // let maximize =
    //   `<span class="data-image-maximize" style="display: none;">
    //     <span class="data-icon data-icon-maximize"></span>
    //   </span>`

   /* return `<span class="data-image">
                <span class="data-image-content data-image-loading">
                    <span class="data-image-detail">
                        <span class="data-image-meta">
                          ${img}
                          ${progress}
                          <span class="data-image-bg"></span>
                          ${maximize}
                        </span>
                    </span>
                </span>
            </span>`*/

    return `<span class="data-image">
                <span class="data-image-content data-image-loading">
                    <span class="data-image-detail">
                        <span class="data-image-meta">
                          ${img}
                          ${progress}
                          <span class="data-image-bg"></span>
                        </span>
                    </span>
                </span>
            </span>`
  }

  bindErrorEvent(node) {
    const editor = this.editor
    const copyNode = node.find(".data-icon-copy")
    copyNode.on("mouseenter", () => {
      Tooltip.show(
        copyNode,
        editor.language.get("image", "errorMessageCopy").toString()
      )
    })
    copyNode.on("mouseleave", () => {
      Tooltip.hide()
    })
    copyNode.on("click", event => {
      event.stopPropagation()
      event.preventDefault()
      Tooltip.hide()
      editor.clipboard.copy(
        this.message || this.options.message || "Error message"
      )
      editor.messageSuccess(
        "copy",
        editor.language.get("copy", "success").toString()
      )
    })
  }

  setProgressPercent(percent) {
    this.progress.find(".percent").html(`${percent}%`)
  }

  imageLoadCallback() {
    const editor = this.editor
    const root = editor.card.closest(this.root)
    if (!root || this.status === "uploading") {
      return
    }

    if (this.status === "done") {
      const contentNode = this.root.find(".data-image-content")
      contentNode.addClass("data-image-loaded")
      contentNode.removeClass("data-image-loading")
    }

    const img = this.image.get()
    if (!img) return
    const { naturalWidth, naturalHeight } = img
    this.rate = naturalHeight / naturalWidth

    this.size.naturalWidth = naturalWidth
    this.size.naturalHeight = naturalHeight

    if (!this.size.width) this.size.width = naturalWidth
    if (!this.size.height) this.size.height = naturalHeight

    this.resetSize()

    this.image.css("visibility", "visible")
    this.detail.css("height", "")
    this.detail.css("width", "")
    const { onChange } = this.options
    if (isEngine(editor) && onChange) {
      onChange(this.size, true)
    }
    window.removeEventListener("resize", this.onWindowResize)
    window.addEventListener("resize", this.onWindowResize)
    editor.off("editor:resize", this.onWindowResize)
    editor.on("editor:resize", this.onWindowResize)
    // 重新调整拖动层尺寸
    if (this.resizer) {
      this.resizer.setSize(img.clientWidth, img.clientHeight)
    }
    this.isLoad = true
    if (this.options.onLoad) {
      this.options.onLoad()
    }
  }

  onWindowResize = () => {
    if (!isEngine(this.editor)) return
    this.maxWidth = this.getMaxWidth()
    this.resetSize()
    const image = this.image.get()
    if (!image) return
    const { clientWidth, clientHeight } = image
    if (this.resizer) {
      this.resizer.maxWidth = this.maxWidth
      this.resizer.setSize(clientWidth, clientHeight)
    }
  }

  imageLoadError() {
    if (this.status === "uploading") return
    this.status = "error"
    const { container } = this.options
    container.empty()
    container.append(
      this.renderTemplate(
        this.editor.language.get("image", "loadError").toString()
      )
    )
    this.detail.css("width", "")
    this.detail.css("height", "")
    this.bindErrorEvent(container)
    const { onError } = this.options
    if (onError) onError()
    this.isLoad = true
  }

  getMaxWidth(node = this.options.root) {
    const block = this.editor.block.closest(node).get()
    if (!block) return 0
    return block.clientWidth - 6
  }

  /**
   * 重置大小
   */
  resetSize() {
    this.meta.css({
      "background-color": "",
      width: ""
      //height: '',
    })

    this.image.css({
      width: ""
      //height: '',
    })

    const img = this.image.get()
    if (!img) return

    let { width, height } = this.size

    if (!height) {
      height = Math.round(this.rate * width)
    } else if (!width) {
      width = Math.round(height / this.rate)
    } else if (width && height) {
      // 修正非正常的比例
      height = Math.round(this.rate * width)
      this.size.height = height
    } else {
      const { clientWidth, clientHeight } = img
      width = clientWidth
      height = clientHeight
      const { naturalWidth, naturalHeight } = this.size
      // fix：svg 图片宽度 300px 问题
      if (this.isSvg() && naturalWidth && naturalHeight) {
        width = naturalWidth
        height = naturalHeight
      }
    }

    if (width > this.maxWidth) {
      width = this.maxWidth
      height = Math.round(width * this.rate)
    }
    if (this.options.enableResizer === false) {
      this.image.css("width", "")
    } else {
      this.image.css("width", `${width}px`)
      //this.image.css('height', `${height}px`);
    }
  }

  changeSize(width, height) {
    if (width < 24) {
      width = 24
      height = width * this.rate
    }

    if (width > this.maxWidth) {
      width = this.maxWidth
      height = width * this.rate
    }

    if (height < 24) {
      height = 24
      width = height / this.rate
    }

    width = Math.round(width)
    height = Math.round(height)
    this.size.width = width
    this.size.height = height
    this.image.css({
      width: `${width}px`
      //height: `${height}px`,
    })

    const { onChange } = this.options
    if (onChange) onChange(this.size)

    this.destroyEditor()
    this.renderEditor()
  }

  changeUrl(url) {
    if (this.src !== url) {
      this.src = url
      this.isLoad = false
      this.image.attributes("src", this.getSrc())
    }
  }

  getSrc = () => {
    const { onBeforeRender } = this.options
    return onBeforeRender && this.status !== "error"
      ? onBeforeRender(this.status, this.src, this.editor)
      : this.src
  }

  isSvg() {
    return (
      this.src.split("?")[0].endsWith(".svg") ||
      this.src.startsWith("data:image/svg+xml")
    )
  }

  openZoom = event => {
    event.preventDefault()
    event.stopPropagation()
    const editor = this.editor
    const imageArray = []
    const cardRoot = editor.card.closest(this.root)
    let rootIndex = 0

    editor.container
      .find('[data-card-key="image"]')
      .toArray()
      .filter(image => {
        return image.find("img").length > 0
      })
      .forEach((imageNode, index) => {
        const card = editor.card.find(imageNode)
        const value = card?.getValue()
        if (!card || !value) return
        const image = card.getCenter().find("img")
        const imageWidth = parseInt(image.css("width"))
        const imageHeight = parseInt(image.css("height"))
        const size = value.size
        const naturalWidth = size
          ? size.naturalWidth || this.size.naturalWidth
          : imageWidth * winPixelRatio
        const naturalHeight = size
          ? size.naturalHeight || this.size.naturalHeight
          : imageHeight * winPixelRatio
        let src = value.src
        const { onBeforeRender } = this.options
        if (onBeforeRender) src = onBeforeRender("done", src, this.editor)
        const msrc = image.attributes("src")
        imageArray.push({
          src,
          msrc,
          w: naturalWidth,
          h: naturalHeight
        })
        if (cardRoot?.equal(imageNode)) {
          rootIndex = index
        }
      })
    this.pswp.open(imageArray, rootIndex)
  }

  closeZoom() {
    this.pswp?.close()
  }

  renderEditor() {
    const img = this.image.get()
    if (!img) return
    const { clientWidth, clientHeight } = img

    if (!clientWidth || !clientHeight) {
      return
    }
    const editor = this.editor
    this.maxWidth = this.getMaxWidth()
    this.rate = clientHeight / clientWidth
    if (isMobile || !isEngine(editor) || editor.readonly) return
    if (this.options.enableResizer === false) {
      return
    }
    // 拖动调整图片大小
    const resizer = new Resizer({
      imgUrl: this.getSrc(),
      width: clientWidth,
      height: clientHeight,
      rate: this.rate,
      maxWidth: this.maxWidth,
      onChange: ({ width, height }) => this.changeSize(width, height)
    })
    const resizerNode = resizer.render()
    this.root.find(".data-image-detail").append(resizerNode)
    this.resizer = resizer
    this.resizer.on("dblclick", this.openZoom)
  }

  destroyEditor() {
    this.resizer?.off("dblclick", this.openZoom)
    this.resizer?.destroy()
  }

  destroy() {
    window.removeEventListener("resize", this.onWindowResize)
    this.editor.off("editor:resize", this.onWindowResize)
    this.destroyEditor()
    this.image.off("click", this.openZoom)
    this.image.off("dblclick", this.openZoom)
    this.maximize.off("click", this.openZoom)
  }

  focus = () => {
    if (!isEngine(this.editor)) {
      return
    }
    this.root.addClass("data-image-active")
    if (this.status === "done") {
      this.destroyEditor()
      this.renderEditor()
    }
  }

  blur = () => {
    if (!isEngine(this.editor)) {
      return
    }
    this.root.removeClass("data-image-active")
    if (this.status === "done") {
      this.destroyEditor()
    }
  }

  render(loadingBg) {
    // 阅读模式不展示错误
    const { container, display, enableResizer } = this.options;
    if (display === CardType.BLOCK) {
      this.root.addClass('data-image-blcok');
    }
    const editor = this.editor;
    if (enableResizer === false) {
      this.root.addClass('data-image-disable-resize');
    }
    if (this.status === 'error' && isEngine(editor)) {
      this.root = $(
        this.renderTemplate(
          this.message || editor.language.get('image', 'uploadError')
        )
      );
      this.bindErrorEvent(this.root);
      container.empty().append(this.root);
      this.progress.remove();
      return;
    }
    if (this.status === 'uploading') {
      this.progress.show();
      container.empty().append(this.root);
    } else {
      this.progress.remove();
    }
    if (this.status === 'done' && this.isLoad) {
      const contentNode = this.root.find('.data-image-content');
      contentNode.addClass('data-image-loaded');
      contentNode.removeClass('data-image-loading');
    }
    if (this.status === 'done' && !this.isLoad) {
      if (!this.root.inEditor()) container.empty().append(this.root);
    }
    this.maxWidth = this.getMaxWidth();
    let { width, height } = this.size;
    if ((width && height) || !this.src) {
      if (width > this.maxWidth) {
        width = this.maxWidth;
        height = Math.round((width * height) / this.size.width);
      } else if (!this.src && !width && !height) {
        width = this.maxWidth;
        height = this.maxWidth / 2;
      }
      if (this.src) {
        if (this.options.enableResizer === false) {
          this.image.css({
            width: '100%'
          });
        } else {
          this.image.css({
            width: width + 'px'
            //height: height + 'px',
          });
        }

        const { onChange } = this.options;
        if (width > 0 && height > 0) {
          this.size = { ...this.size, width, height };
          if (onChange) onChange(this.size);
        }
      }
      if (this.options.enableResizer === false) {
        this.bg.css({
          width: '100%'
        });
      } else {
        this.bg.css({
          width: width + 'px',
          height: height + 'px'
        });
      }

      if (loadingBg) {
        this.bg.css('background-image', `url(${loadingBg})`);
      }
    }

    this.image.on('load', () => this.imageLoadCallback());
    this.image.on('error', () => this.imageLoadError());
    if (!isMobile) {
      this.root.on('mouseenter', () => {
        this.maximize.show();
      });
      this.root.on('mouseleave', () => {
        this.maximize.hide();
      });
    }

    if (!isEngine(editor) || editor.readonly) {
      const link = this.image.closest('a');
      // 无链接
      if (link.length === 0) {
        this.image.on('click', this.openZoom);
      }
    }
    this.maximize.on('click', this.openZoom);
    if (isEngine(editor) || !this.root.inEditor()) {
      this.image.on('dblclick', this.openZoom);
    }
  }
}

export default Image
