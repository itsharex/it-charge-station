import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},

    // ============== 页面相关参数 ===============
    // 页面状态，用来记录当前页面的一些变化，控制页面数据的持久化和传递
    // 页面创建：init，页面最小化、非当前窗口、被其他应用覆盖等使用：hidden，页面最大化、切回当前table，其他应用最小化：show，
    // 页面刷新：flush，页面关闭：close
    pageState: "init",
    uniqueId: null,
    // 首页显示激活的菜单项
    activeName: 'recommend',
    // 手机页面的菜单栏的状态，true为打开，false为关闭，默认关闭
    showContext: false,
    // 自适应页面宽度
    isPhone: false,
    // 计算是否要固定右侧标签的高度
    fixedHeight: null,

    // ============== 个性化相关 =================
    // 显示自定义主题开关
    showCustomer: false,
    // 首页的flag内容
    flagContent: {
      timestamp: new Date().getTime(),
      content: ''
    },
    customerSet: {
      // 主題色
      themeColor: 'rgba(255,255,255,1)',
      // 字体颜色
      fontColor: '#404040',
      // 标题颜色
      titleColor: '#0a0a0a',
      // 背景图(可以设置渐变色和图片两种，渐变色也可以设置纯色，只要起始色和结束色相同即可)
      backgroundImg: 'linear-gradient(45deg, #F4F5F7 0%, #F4F5F7 100%)',
      // 边框颜色
      borderColor: 'rgba(0,0,0,0.08)',
      // 下拉框背景色
      dropdownBackgroundColor: '#FFFFFF',
      // 下拉框内的item-hover颜色
      dropdownItemHover: '#E9E9E9',
      // 主题色上面的小块背景色
      onThemeBackgroundColor: '#FAFAFA',
      ramblyJotEditorBackgroundColor: '#F2F3F5',
      modalBackgroundColor: '#FFFFFF'
    },
    docStyle: {
      // 是否同步自定义主题 0否1是
      docThemeSync: 1,
      // 正文字体大小(写页面，保存到内容格式中)
      docStyleDefaultFont: 15,
      // 文章段间距  常规、宽松 standard/loose
      segmentSpace: 'standard',
      // 页面布局 0标宽模式 1超宽模式
      docStylePageSize: 0,
      // 自动发布 0否1是
      autoPublish: 0,
      // 评论功能
      enableComment: 1
    },

    // ============= 音乐播放相关 ================
    musicInfo: {
      // 当前播放音乐id
      musicId: null,
      // 正在播放的音乐在列表中的索引
      currentIndex: 0,
      // 实时播放时长
      currentTime: 0,
      // 当前设置的音量大小
      currentVolume: 30,
      // 音乐列表
      musicList: [
        {
          musicId: 1877526024,
          musicName: "忙しい生活「人山人海」",
          author: "时空储蓄罐",
          platformCode: 1,
          isLike: 0
        },
        {
          musicId: 187797,
          musicName: "风雨无阻",
          author: "周华健",
          platformCode: 1,
          isLike: 0
        }
      ],
      // 音乐是否正在播放
      isPlay: false,
      // 播放模式（顺序播放，单曲循环，随机播放）
      //       listLoop singleLoop listRandom
      playType: "listLoop",
      // 音乐是否在加载中
      isMusicLoad: false,
      // 是否展示音乐播放页面
      isMusicDetailCardShow: true
    }
  },

  actions: {},

  // 同步操作state中的数据(commit)
  mutations: {
    /**
     * 退出登录
     * @param state
     * @param value
     */
    clearUserInfo(state, value) {
      state.userInfo = {};
      localStorage.setItem('store', JSON.stringify(state));
    },
    /**
     * 更新页面状态
     * @param state
     * @param value
     */
    updatePageState(state, value) {
      state.pageState = value;
    },
    /**
     * 修改body页面激活的route
     * @param state
     * @param value
     */
    changeActiveRoute(state, value) {
      state.activeName = value
    },
    /**
     * 修改手机页面的菜单栏的状态
     * @param state
     * @param value
     */
    changeShowContext(state, value) {
      state.showContext = value
    },
    /**
     * 计算固定标签的高度
     * @param state
     * @param value
     */
    computeFixHeight(state, value) {
      state.fixedHeight = value;
    },
    /**
     * 修改页面的显示效果，true表示为手机页面，false表示pc页面
     * @param state
     * @param value
     */
    isPhone(state, value) {
      state.isPhone = value
    },
    /**
     * 更新首页的flag内容
     * @param state
     * @param value
     */
    editFlag(state, value) {
      state.flagContent.content = value;
      if (value) {
        state.flagContent.timestamp = new Date().getTime();
      } else {
        state.flagContent.timestamp = null;
      }
    },
    updateFlag(state, value) {
      state.flagContent = value;
    },
    /**
     * 登录，保存userinfo
     * @param state
     * @param value
     */
    login(state, value) {
      state.userInfo = value;
      localStorage.setItem('store', JSON.stringify(state));
    },
    /**
     * 偏好设置 注意这里的传参必须是一个对象
     * @param state
     * @param value
     */
    preferenceSet(state, value) {
      state.docStyle = Object.assign(state.docStyle, value);
    },
    /**
     * 自定义主题，注意这里的传参必须是一个对象
     * @param state
     * @param value
     */
    customerSet(state, value) {
      state.customerSet = Object.assign(state.customerSet, value);
    },

    /**
     * 更新写作中心风格
     * @param state
     * @param value
     */
    updateDocStyle(state, value) {
      state.docStyle = Object.assign(state.docStyle, value);
    },
    /**
     * 是否显示自定义主题插件
     * @param state
     * @param value
     */
    showCustomer(state, value) {
      state.showCustomer = value;
    },
    /**
     * music信息修改
     * @param state
     * @param musicInfo
     */
    updateMusicInfo(state, musicInfo) {
      state.musicInfo = Object.assign(state.musicInfo, musicInfo);
      if (musicInfo.musicList && musicInfo.musicList.length > 0 && state.musicInfo.musicId) {
        let number = state.musicInfo.musicList.findIndex(mp => mp.id === state.musicInfo.musicId);
        state.musicInfo.currentIndex = number === -1 ? 0 : number;
      }
    },
    /**
     * music信息修改
     * @param state
     * @param musicInfo
     */
    setUniqueId(state, uniqueId) {
      state.uniqueId = uniqueId;
    }
  }
})
