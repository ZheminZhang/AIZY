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
    itemId:'',
    party:'',
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
    util.getAuthoList();
    this.onShow();
  },

  onReady: function() {},

  /* 加载页面 */
  onLoad: function (options) {
    this.setData({
      credit:options.credit,
      debit:options.debit,
      debitAmount:options.debitAmount,
      creditAmount:options.creditAmount,
      summary:options.summary,
      date:options.time,
      itemId:options.itemId,
      party:options.party,
    });
    console.log(options.party+"   --  "+options.itemId);
  },
  onShow: function() {
    this.setData({
      grantorUnautho: wx.getStorageSync("unsigned"),
      grantorAutho: wx.getStorageSync("signed"),
      grantorUnauthoRefuse: wx.getStorageSync("signedRefuse")
    });
  },
  goSignBill:function(e){
    var tag = "disagree";
    util._getUnAuthoList();
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
        itemId:this.data.itemId,
        party:this.data.party,
      },
      success: function (e) {
        wx.showToast({
          title: "成功",
          icon: "success"
        });
        //读取服务器的授权和未授权信息，并跳转其他页面
        util.getSignList();
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 500); //设置延时
      },
      fail: function (e) {
        wx.showToast({
          title: "请求发送失败",
          icon: "none"
        });
      }
    });
  },

});
