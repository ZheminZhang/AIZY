// pages/apply_list_1/apply_list.js
Page({
  data: {
    navbar: ['已授权', '申请'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})