// pages/apply_list_1/apply_list.js
Page({
  data: {
    navbar: ['已授权', '申请'],
    currentTab: 0,
    client: ["小米", "小智", "小徐"],

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})