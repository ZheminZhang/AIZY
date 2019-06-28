// pages/apply_list_1/apply_list.js
Page({
  data: {
    tabitemConsume: {},
    tabitemRecharge: {},
    activeTabId: null,
    currentTab: 0,
    author: [],
    unauthor: [],
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  tabChange(e) {
    if (e.detail.source == "touch") {
      this.setActiveTab(e.detail.currentItemId);
    }
  },

  tabclick(e) {
    this.setActiveTab(e.target.id);
  },

  setActiveTab(id) {
    var rect = this.data[id];
    if (rect) {
      this.animation.width(rect.width).translate(rect.left, 0);
      this.setData({
        activeTabId: id,
        indicatorAnim: this.animation.step().export()
      })
    }
  },

  /* 下拉刷新，自动监听 */
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  
  onReady: function () {
    /* 滑动动画相关 */
    var query = wx.createSelectorQuery().in(this),
      _this = this;
    _this.animation = wx.createAnimation({
      duration: 500,  //动画持续时间
      timingFunction: "ease",  //动画效果
    })
    query.select('#tabitemConsume').boundingClientRect(function (rect) {
      _this.setData({
        tabitemConsume: rect
      });
    })
    query.select('#tabitemRecharge').boundingClientRect(function (rect) {
      _this.setData({
        tabitemRecharge: rect
      });
      _this.setActiveTab('tabitemRecharge');
    })
    query.exec();

  },

  /* 加载页面 */
  onLoad: function () {
    this.setData({
      author: wx.getStorageSync('User_Data_Author'),
      unauthor: wx.getStorageSync('User_Data_Unauthor')
    })
  },

  toDetail: function (e) {
    let index = e.currentTarget.id;
    let url_ = '../authorize/authorize?' + 'tp=' + e.target.dataset["tp"]
    if (e.target.dataset["tp"] == '1') {
      url_ = url_ + 
        "&name=" + this.data.author[index].name +
        "&id=" + this.data.author[index].id +
        "&authStartTime=" + this.data.author[index].authStartTime +
        "&authEndTime=" + this.data.author[index].authEndTime +
        "&recordStartTime=" + this.data.author[index].recordStartTime +
        "&recordEndTime=" + this.data.author[index].recordEndTime +
        "&type=" + this.data.author[index].type
    }
    else if (e.target.dataset["tp"] == '2') {
      url_ = url_ +
        "&name=" + this.data.unauthor[index].name +
        "&id=" + this.data.unauthor[index].id +
        "&authStartTime=" + this.data.unauthor[index].authStartTime +
        "&authEndTime=" + this.data.unauthor[index].authEndTime +
        "&recordStartTime=" + this.data.unauthor[index].recordStartTime +
        "&recordEndTime=" + this.data.unauthor[index].recordEndTime +
        "&type=" + this.data.unauthor[index].type
    }
    wx.navigateTo({
      url: url_,
      fail: function(e) {
        console.log(e)
      }
    })
  },
})