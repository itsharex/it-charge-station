export default {
  /**
   * 创建空白文档
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async createBlankDoc(_this) {
    return await _this.$request({
      url: "/contentProd/createBlankDoc",
      method: 'POST'
    });
  },

  /**
   * 获取文档用于编辑
   * @param _this
   * @param userId
   * @returns {Promise<void>}
   */
  async getArticleForEdit(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/" + articleId,
      method: 'GET'
    });
  },

  /**
   * 文档信息更新（不含封面图片）
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleInfo(_this, articleInfo) {
    return await _this.$request({
      url: "/contentProd/article/simpleUpdate",
      method: 'POST',
      data: articleInfo
    });
  },

  /**
   * 文档信息更新（包含封面图片）
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleCover(_this, formData) {
    return await _this.$request.put("/contentProd/article/update", formData);
  },

  /**
   * 文档内容更新
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateArticleContent(_this, contentInfo) {
    return await _this.$request({
      url: "/contentProd/article/updateContent",
      method: 'POST',
      data: contentInfo
    });
  },

  /**
   * 获取文档正文
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getArticleContent(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/content/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 获取文档列表
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getMyArticleList(_this, requestEntity) {
    return await _this.$request({
      url: "/contentProd/article/list",
      method: 'POST',
      data: requestEntity
    });
  },

  /**
   * 获取菜单列表
   * @param _this
   * @returns {Promise<void>}
   */
  async getMenuList(_this) {
    return await _this.$request({
      url: "/contentProd/menu",
      method: 'POST'
    });
  },

  /**
   * 文章置顶/取消置顶
   * @param _this
   * @returns {Promise<void>}
   */
  async updateArticleTop(_this, articleInfo) {
    return await _this.$request({
      url: "/contentProd/article/setTop",
      method: 'POST',
      data: articleInfo
    });
  },

  /**
   * 文章发布
   * @param _this
   * @returns {Promise<void>}
   */
  async publishArticle(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/publish/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 文章删除
   * @param _this
   * @returns {Promise<void>}
   */
  async deleteArticle(_this, articleId) {
    return await _this.$request({
      url: "/contentProd/article/delete/" + articleId,
      method: 'POST'
    });
  },

  /**
   * 文章批量操作
   * @param _this
   * @returns {Promise<void>}
   */
  async articleBatchOperate(_this, operateInfo) {
    return await _this.$request({
      url: "/contentProd/article/batchOperate",
      method: 'POST',
      data: operateInfo
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //                                      专栏
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  /**
   * 获取专栏列表
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async getColumnList(_this) {
    return await _this.$request({
      url: "/contentProd/columnList",
      method: 'POST'
    });
  },

  /**
   * 新建专栏
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async createColumn(_this, columnInfo) {
    return await _this.$request({
      url: "/contentProd/column/create",
      method: 'POST',
      data: columnInfo
    });
  },

  /**
   * 专栏-创建文章
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async createArticle(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/createArticle",
      method: 'POST',
      data: {uid: columnId}
    });
  },

  /**
   * 专栏-复制文章
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async copyArticle(_this, columnId, articleList) {
    return await _this.$request({
      url: "/contentProd/column/copyArticle",
      method: 'POST',
      data: {
        columnId: columnId,
        articleList: articleList
      }
    });
  },

  /**
   * 删除专栏
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async deleteColumn(_this, columnInfo) {
    return await _this.$request({
      url: "/contentProd/column/delete",
      method: 'POST',
      data: columnInfo
    });
  },

  /**
   * 获取专栏信息
   * @param _this
   * @param columnInfo
   * @returns {Promise<void>}
   */
  async getColumnInfo(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 专栏信息更新（包含封面图片）
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateColumnInfo(_this, formData) {
    return await _this.$request.put("/contentProd/column/update", formData);
  },

  /**
   * 专栏目录更新
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async updateColumnDir(_this, dirInfo) {
    return await _this.$request({
      url: "/contentProd/column/dir/update",
      method: 'POST',
      data: dirInfo
    });
  },

  /**
   * 获取专栏目录
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getColumnDir(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/dir/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 获取专栏文章
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async getColumnArticle(_this, columnId) {
    return await _this.$request({
      url: "/contentProd/column/articleList/" + columnId,
      method: 'GET'
    });
  },

  /**
   * 专栏内容批量操作
   * @param _this
   * @param articleInfo
   * @returns {Promise<void>}
   */
  async columnBatchOperate(_this, operateInfo) {
    return await _this.$request({
      url: "/contentProd/column/batchOperate",
      method: 'POST',
      data: operateInfo
    });
  }
}




