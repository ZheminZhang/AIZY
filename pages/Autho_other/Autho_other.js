var util = require('../../utils/util.js');

Page({
  data: {
    tabitemConsume: {},
    tabitemRecharge: {},
    activeTabId: null,
    currentTab: 0,
    grantorAutho: {},
    grantorUnautho: {},
    grantorUnauthoRefuse: {},

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
    util.getAuthoList();
  },

  onReady: function () {
  },

  /* 加载页面 */
  onLoad: function () {
    this.setData({
      grantorUnautho: wx.getStorageSync('grantorUnautho'),
      grantorAutho: wx.getStorageSync('grantorAutho'),
      grantorUnauthoRefuse: wx.getStorageSync('grantorUnauthoRefuse')
    })
    console.log(this.data.grantorUnauthoRefuse);
  },

  toDetail: function (e) {
    let index = e.currentTarget.id;
    let url_ = '../authorize/authorize?' + 'tp=' + e.target.dataset["tp"]
    if (e.target.dataset["tp"] == '1') {
      url_ = url_ +
        "&companyName=" + this.data.grantorUnautho[index].user +
        "&id=" + this.data.grantorUnautho[index].id +
        "&authStartTime=" + util.msToData(this.data.grantorUnautho[index].authStartTime).withoutTime +
        "&authEndTime=" + util.msToData(this.data.grantorUnautho[index].authEndTime).withoutTime +
        "&recordStartTime=" + util.msToData(this.data.grantorUnautho[index].recordStartTime).withoutTime +
        "&recordEndTime=" + util.msToData(this.data.grantorUnautho[index].recordEndTime).withoutTime +
        "&type=" + this.data.grantorUnautho[index].type + "&recordId=" + this.data.grantorUnautho[index].recordId;
    }
    else if (e.target.dataset["tp"] == '2') {
      url_ = url_ +
        "&companyName=" + this.data.grantorAutho[index].user +
        "&id=" + this.data.grantorAutho[index].id +
        "&authStartTime=" + util.msToData(this.data.grantorAutho[index].authStartTime).withoutTime +
        "&authEndTime=" + util.msToData(this.data.grantorAutho[index].authEndTime).withoutTime +
        "&recordStartTime=" + util.msToData(this.data.grantorAutho[index].recordStartTime).withoutTime +
        "&recordEndTime=" + util.msToData(this.data.grantorAutho[index].recordEndTime).withoutTime +
        "&type=" + this.data.grantorAutho[index].type + "&recordId=" + this.data.grantorAutho[index].recordId;
    }
    else if (e.target.dataset["tp"] == '3') {
      url_ = url_ +
        "&companyName=" + this.data.grantorUnauthoRefuse[index].user +
        "&id=" + this.data.grantorUnauthoRefuse[index].id +
        "&authStartTime=" + util.msToData(this.data.grantorUnauthoRefuse[index].authStartTime).withoutTime +
        "&authEndTime=" + util.msToData(this.data.grantorUnauthoRefuse[index].authEndTime).withoutTime +
        "&recordStartTime=" + util.msToData(this.data.grantorUnauthoRefuse[index].recordStartTime).withoutTime +
        "&recordEndTime=" + util.msToData(this.data.grantorUnauthoRefuse[index].recordEndTime).withoutTime +
        "&type=" + this.data.grantorUnauthoRefuse[index].type + "&recordId=" + this.data.grantorUnauthoRefuse[index].recordId;
    }
   
    console.log("这里开始");
    console.log(this.data.grantorUnautho);
    wx.navigateTo({
      url: url_,
      fail: function (e) {
        console.log(e)
      }
    })
  },
})