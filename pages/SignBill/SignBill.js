// pages/apply_list_1/apply_list.js
var app = getApp();
var util = require("../../utils/util.js");
var config = require("../../config/config.js");
Page({
  data: {
    tabitemConsume: {},
    tabitemRecharge: {},
    activeTabId: null,
    currentTab: 0,
    grantorAutho: {},
    grantorUnautho: {},
    grantorUnauthoRefuse: {},
    currentText: "", //识别内容
    isClick: false,
    /* 记账相关信息 */
    summary: null, //分类信息
    debit: "", //借方科目
    debitAmount: null, //借方金额
    credit: "", //贷方科目
    creditAmount: null, //贷方金额
    date: "", //日期
    itemId: "",
    party: "",
    secondSig: "",
    firstSig: "",
    thirdSig: "",
    firstCompName: "",
    secondCompName: "",
    thirdCompName: ""
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
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
      });
    }
  },

  /* 下拉刷新，自动监听 */
  onPullDownRefresh: function() {
    util.getSignList();
    this.onShow();
  },

  onReady: function() {},

  /* 加载页面 */
  onLoad: function(options) {
    var res = wx.getStorageSync("BillInfo");
    this.setData({
      summary: res.summary, //分类信息
      debit: res.debit, //借方科目
      debitAmount: res.debitAmount, //借方金额
      credit: res.credit, //贷方科目
      creditAmount: res.creditAmount, //贷方金额
      date: util.msToDate(res.time).withoutTime, //日期
      itemId: res.itemId,
      party: res.party,
      secondSig: res.secondSig,
      firstSig: res.firstSig,
      thirdSig: res.thirdSig,
      firstCompName: res.firstCompName,
      secondCompName: res.secondCompName,
      thirdCompName: res.thirdCompName
    });
    if (options.tp == 7) {
      this.setData({
        isClick: true
      });
    }
  },
  onShow: function() {
    this.setData({
      grantorUnautho: wx.getStorageSync("unsigned"),
      grantorAutho: wx.getStorageSync("signed"),
      grantorUnauthoRefuse: wx.getStorageSync("signedRefuse")
    });
  },
  goSignBill: function(e) {
    var tag = "disagree";
    if (e.target.dataset["type"] == "agree") {
      tag = "agree";
    }
    console.log(this.data.party);
    wx.request({
      url: config.signUrl,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        loginFlag: wx.getStorageSync("loginFlag"),
        tag: tag,
        itemId: this.data.itemId,
        party: this.data.party
      },
      success: function(e) {
        wx.showToast({
          title: "成功",
          icon: "success"
        });
        util.getSignList(() =>
          wx.navigateBack({
            delta: 1
          })
        );
      },
      fail: function(e) {
        wx.showToast({
          title: "请求发送失败",
          icon: "none"
        });
      }
    });
  },
  goSignInfo: function() {
    wx.navigateTo({
      url: "../SignInfo/SignInfo"
    });
  }
});
