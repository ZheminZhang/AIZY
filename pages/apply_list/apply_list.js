// pages/apply_list_1/apply_list.js
Page({
  data: {
    tabitemConsume: {},
    tabitemRecharge: {},
    activeTabId: null,
    currentTab: 0,
    granteeUnautho: {},
    granteeAutho: {},
    grantorAutho: {},
    grantorUnautho: {},
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
      granteeUnautho: wx.getStorageSync('granteeUnautho'),
      granteeAutho: wx.getStorageSync('granteeAutho'),
      grantorAutho: wx.getStorageSync('grantorAutho'),
      grantorUnautho: wx.getStorageSync('grantorUnautho'),
    })
  },

  toDetail: function (e) {
    let index = e.currentTarget.id;
    let url_ = '../authorize/authorize?' + 'tp=' + e.target.dataset["tp"]
    if (e.target.dataset["tp"] == '1') {
      url_ = url_ + 
        "&companyName=" + this.data.grantorUnautho[index].user +
        "&id=" + this.data.grantorUnautho[index].id +
        "&authStartTime=" + this.data.grantorUnautho[index].authStartTime +
        "&authEndTime=" + this.data.grantorUnautho[index].authEndTime +
        "&recordStartTime=" + this.data.grantorUnautho[index].recordStartTime +
        "&recordEndTime=" + this.data.grantorUnautho[index].recordEndTime +
        "&type=" + this.data.grantorUnautho[index].type
    }
    else if (e.target.dataset["tp"] == '2') {
      url_ = url_ +
        "&companyName=" + this.data.grantorAutho[index].name +
        "&id=" + this.data.grantorAutho[index].id +
        "&authStartTime=" + this.data.grantorAutho[index].authStartTime +
        "&authEndTime=" + this.data.grantorAutho[index].authEndTime +
        "&recordStartTime=" + this.data.grantorAutho[index].recordStartTime +
        "&recordEndTime=" + this.data.grantorAutho[index].recordEndTime +
        "&type=" + this.data.grantorAutho[index].type
    }
    else if (e.target.dataset["tp"] == '3') {
      url_ = url_ +
        "&companyName=" + this.data.granteeUnautho[index].name +
        "&id=" + this.data.granteeUnautho[index].id +
        "&authStartTime=" + this.data.granteeUnautho[index].authStartTime +
        "&authEndTime=" + this.data.granteeUnautho[index].authEndTime +
        "&recordStartTime=" + this.data.granteeUnautho[index].recordStartTime +
        "&recordEndTime=" + this.data.granteeUnautho[index].recordEndTime +
        "&type=" + this.data.granteeUnautho[index].type
    }
    else if (e.target.dataset["tp"] == '3') {
      url_ = url_ +
        "&companyName=" + this.data.granteeAutho[index].name +
        "&id=" + this.data.granteeAutho[index].id +
        "&authStartTime=" + this.data.granteeAutho[index].authStartTime +
        "&authEndTime=" + this.data.granteeAutho[index].authEndTime +
        "&recordStartTime=" + this.data.granteeAutho[index].recordStartTime +
        "&recordEndTime=" + this.data.granteeAutho[index].recordEndTime +
        "&type=" + this.data.granteeAutho[index].type
    }
    wx.navigateTo({
      url: url_,
      fail: function(e) {
        console.log(e)
      }
    })
  },
})