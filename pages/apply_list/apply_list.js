// pages/apply_list_1/apply_list.js
Page({
  data: {
    navbar: ['已授权', '申请'],
    currentTab: 0,
    client: [
      {
        name: "xx",
        id: 1
      },
      {
        name: "yy",
        id: 2
      }
    ],
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /* 下拉刷新，自动监听 */
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  
  toDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../authorize/authorize?id=' + e.target.id,
      fail: function(e) {
        console.log(e)
      }
    })
  },
})