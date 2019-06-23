// pages/apply_list_1/apply_list.js
Page({
  data: {
    navbar: ['已授权', '申请'],
    currentTab: 0,
    author: [
    ],
    application: [
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
  
  /* 加载页面 */
  onLoad: function () {
    this.setData({
      author: wx.getStorageSync('User_Data_Author'),
      application: wx.getStorageSync('User_Data_Application')
    })
  },

  toDetail: function (e) {
    let id = e.target.id
    let url_ = '../authorize/authorize?' + 'tp=' + e.target.dataset["tp"]
    if (e.target.dataset["tp"] == '1') {
      url_ = url_ + 
        "&name=" + this.data.author[id].name +
        "&start_date=" + this.data.author[id].start_date +
        "&end_date=" + this.data.author[id].end_date +
        "&type=" + this.data.author[id].type
    }
    else if (e.target.dataset["tp"] == '2') {
      url_ = url_ +
        "&name=" + this.data.application[id].name +
        "&start_date=" + this.data.application[id].start_date +
        "&end_date=" + this.data.application[id].end_date +
        "&type=" + this.data.application[id].type
    }
    wx.navigateTo({
      url: url_,
      fail: function(e) {
        console.log(e)
      }
    })
  },
})