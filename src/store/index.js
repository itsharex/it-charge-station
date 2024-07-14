import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 页面状态，用来记录当前页面的一些变化，控制页面数据的持久化和传递
    // 页面创建：init，页面最小化、非当前窗口、被其他应用覆盖等使用：hidden，页面最大化、切回当前table，其他应用最小化：show，
    // 页面刷新：flush，页面关闭：close
    pageState: "init",
    // TODO 这里还是无法解决先切换到别的页面然后后台播放然后backplay = true，然后再刷新导致不能播放的问题
    userInfo: {
      uid: 9527,
      username: '布衣草人',
      domain: 'lovbe0210',
      level: 6,
      avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hndj43fdrsj30s010vgtz.jpg',
      token: '06ba1e5d8dcd4bf7b27ed10c6a202766'
    },
    // 是否有后台播放音乐的页面
    backgroundPlay: false,
    // 首页显示激活的菜单项
    activeName: 'recommend',
    // 手机页面的菜单栏的状态，true为打开，false为关闭，默认关闭
    showContext: false,
    // 自适应页面宽度
    isPhone: false,
    // 计算是否要固定右侧标签的高度
    fixedHeight: null,
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
      // 下拉框背景色
      dropdownBackgroundColor: '#FFFFFF',
      // 下拉框内的item-hover颜色
      dropdownItemHover: '#E9E9E9',
      // 主题色上面的小块背景色
      onThemeBackgroundColor: '#FAFAFA',
      ramblyJotEditorBackgroundColor: '#F2F3F5',
      modalBackgroundColor: '#FFFFFF'
    },
    // 显示自定义主题开关background-color: #4158D0;
    // background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    showCustomer: false,
    // 音乐播放相关
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
          "name": "忙しい生活「人山人海」",
          "id": 1877526024,
          "pst": 0,
          "t": 0,
          "ar": [{"id": 46269147, "name": "时空储蓄罐", "tns": [], "alias": []}],
          "alia": [],
          "pop": 100,
          "st": 0,
          "rt": "",
          "fee": 8,
          "v": 13,
          "crbt": null,
          "cf": "",
          "al": {
            "id": 133118696,
            "name": "忙しい生活「人山人海」",
            "picUrl": "http://p3.music.126.net/nsqh0VBUziGp2z5_5w_6fA==/109951166378021242.jpg",
            "tns": [],
            "pic_str": "109951166378021242",
            "pic": 109951166378021250
          },
          "dt": "02:03",
          "h": {"br": 320000, "fid": 0, "size": 4957040, "vd": 23249, "sr": 44100},
          "m": {"br": 192000, "fid": 0, "size": 2974241, "vd": 25895, "sr": 44100},
          "l": {"br": 128000, "fid": 0, "size": 1982842, "vd": 27706, "sr": 44100},
          "sq": {"br": 1087003, "fid": 0, "size": 16829138, "vd": 23248, "sr": 44100},
          "hr": null,
          "a": null,
          "cd": "01",
          "no": 1,
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "djId": 0,
          "copyright": 0,
          "s_id": 0,
          "mark": 64,
          "originCoverType": 0,
          "originSongSimpleData": null,
          "tagPicList": null,
          "resourceState": true,
          "version": 13,
          "songJumpInfo": null,
          "entertainmentTags": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "rurl": null,
          "mst": 9,
          "cp": 0,
          "mv": 0,
          "rtype": 0,
          "publishTime": 0,
          "alg": "ugc_payrec_101792810058_TG"
        },
        {
          "name": "吻得太逼真",
          "id": "5249178",
          "pst": 0,
          "t": 0,
          "ar": [{"id": 6462, "name": "张敬轩", "tns": [], "alias": []}],
          "alia": [],
          "pop": 100,
          "st": 0,
          "rt": "",
          "fee": 1,
          "v": 678,
          "crbt": null,
          "cf": "",
          "al": {
            "id": 511713,
            "name": "我们的主打歌 3",
            "picUrl": "http://p3.music.126.net/hCkKHm7J1hDNlmC9vmAV4Q==/109951163368468453.jpg",
            "tns": [],
            "pic_str": "109951163368468453",
            "pic": 109951163368468450
          },
          "dt": "03:53",
          "h": {"br": 320000, "fid": 0, "size": 9333072, "vd": -51917, "sr": 44100},
          "m": {"br": 192000, "fid": 0, "size": 5599861, "vd": -49424, "sr": 44100},
          "l": {"br": 128000, "fid": 0, "size": 3733255, "vd": -48004, "sr": 44100},
          "sq": {"br": 1638743, "fid": 0, "size": 47783018, "vd": -51896, "sr": 44100},
          "hr": null,
          "a": null,
          "cd": "1",
          "no": 15,
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "djId": 0,
          "copyright": 1,
          "s_id": 0,
          "mark": 8192,
          "originCoverType": 1,
          "originSongSimpleData": null,
          "tagPicList": null,
          "resourceState": true,
          "version": 678,
          "songJumpInfo": null,
          "entertainmentTags": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "rurl": null,
          "mst": 9,
          "cp": 7003,
          "mv": 0,
          "rtype": 0,
          "publishTime": 1226592000000
        },
        {
          "name": "风雨无阻",
          "id": 187797,
          "pst": 0,
          "t": 0,
          "ar": [{"id": 6456, "name": "周华健", "tns": [], "alias": []}],
          "alia": [],
          "pop": 100,
          "st": 0,
          "rt": "600902000000028920",
          "fee": 8,
          "v": 58,
          "crbt": null,
          "cf": "",
          "al": {
            "id": 19031,
            "name": "风雨无阻",
            "picUrl": "http://p4.music.126.net/WvSPLq6pHBE3oFv2CdfLnQ==/109951165611287994.jpg",
            "tns": [],
            "pic_str": "109951165611287994",
            "pic": 109951165611288000
          },
          "dt": "04:33",
          "h": {"br": 320000, "fid": 0, "size": 10935946, "vd": 14361, "sr": 44100},
          "m": {"br": 192000, "fid": 0, "size": 6561585, "vd": 16971, "sr": 44100},
          "l": {"br": 128000, "fid": 0, "size": 4374404, "vd": 18665, "sr": 44100},
          "sq": {"br": 1524108, "fid": 0, "size": 52073707, "vd": 14382, "sr": 44100},
          "hr": null,
          "a": null,
          "cd": "1",
          "no": 2,
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "djId": 0,
          "copyright": 0,
          "s_id": 0,
          "mark": 1125899906851328,
          "originCoverType": 1,
          "originSongSimpleData": null,
          "tagPicList": null,
          "resourceState": true,
          "version": 58,
          "songJumpInfo": null,
          "entertainmentTags": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "rurl": null,
          "mst": 9,
          "cp": 684010,
          "mv": 10930281,
          "rtype": 0,
          "publishTime": 770400000000
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

  actions: {

  },

  // 同步操作state中的数据(commit)
  mutations: {
    /**
     * 退出登录
     * @param state
     * @param value
     */
    clearUserInfo(state, value) {
      state.userInfo = {}
    },
    updatePageState(state, value) {
      state.pageState = value;
    },
    /**
     * 修改music的前后台播放状态
     * @param state
     * @param value
     */
    updateBackgroundPlay(state, value) {
      state.backgroundPlay = value;
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
    editFlagContent(state, value) {
      state.flagContent.content = value
    },
    /**
     * 登录，保存userinfo
     * @param state
     * @param value
     */
    login(state, value) {
      state.userInfo = value
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
    }
  }
})
