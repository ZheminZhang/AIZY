// pages/apply_list_1/apply_list.js
var app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    tabitemConsume: {},
    tabitemRecharge: {},
    activeTabId: null,
    currentTab: 0,
    grantorAutho: {},
    grantorUnautho: {},
    grantorUnauthoRefuse: {}
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
  },

  tabChange(e) {
    if (e.detail.source == "touch") {
      this.setActiveTab(e.detail.currentitemId);
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
      });
    }
  },

  /* 下拉刷新，自动监听 */
  onPullDownRefresh: function () {
    util.getAuthoList();
    this.onShow();
  },

  onReady: function () { },

  /* 加载页面 */
  onLoad: function () { },
  onShow: function () {
    this.setData({
      grantorUnautho: wx.getStorageSync("unsigned"),
      grantorAutho: wx.getStorageSync("signed"),
      grantorUnauthoRefuse: wx.getStorageSync("signedRefuse")
    });
  },
  //tp是决定是拒绝同意的标志
  toDetail: function (e) {
    var index = e.currentTarget.id;
    var url_ = "../SignBill/SignBill?" + "tp=" + e.target.dataset["tp"];
    if (e.target.dataset["tp"] == "7") {
      var itemId = this.data.grantorUnautho[index].itemId;
      var party = this.data.grantorUnautho[index].party;
      util.getSignQuery(itemId, party);
    } else if (e.target.dataset["tp"] == "8") {
      var itemId = this.data.grantorAutho[index].itemId;
      var party = this.data.grantorAutho[index].party;
      util.getSignQuery(itemId, party)
    } else if (e.target.dataset["tp"] == "9") {
      var itemId = this.data.grantorUnauthoRefuse[index].itemId;
      var party = this.data.grantorUnauthoRefuse[index].party;
      util.getSignQuery(itemId, party);
    }
    url_ = url_+ "&tp=" + e.target.dataset["tp"];
    console.log(url_);
    wx.navigateTo({
      url: url_,
      fail: function (e) {
        console.log(e);
      }
    });
  }
});
