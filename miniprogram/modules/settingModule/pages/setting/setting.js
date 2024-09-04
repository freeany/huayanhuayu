Page({
  data: {

  },
  onLoad (options) {

  },
  onReady () {

  },
  onShow () {

  },
  onHide () {

  },
  onUnload () {

  },

  // 转发功能
  onShareAppMessage () {
    return {
      title: '所有的怦然心动，都是你',
      path: '/pages/index/index',
      imageUrl: '../../../../../assets/images/love.jpg'
    }
  },

  // 转发到朋友圈功能
  onShareTimeline () { }
});