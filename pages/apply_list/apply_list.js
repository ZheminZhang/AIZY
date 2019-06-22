// pages/apply_list_1/apply_list.js
Page({
  data: {
    navbar: ['已授权', '申请'],
    currentTab: 0,
    client: [{ name: "小米", done: false }, { name: "小米", done: false }, { name: "小米", done: false }],
    
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  agree: function(e){
    console.log(e);
    
  }
})