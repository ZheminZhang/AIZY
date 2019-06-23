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

  toDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../authorize/authorize?id=' + e.target.id,
      fail: function(e) {
        console.log(e)
      }
    })

  }
})