// pages/query/query.js
const api = require("../../config/config.js");
var util = require("../../utils/util.js");

Page({
  data: {
    disabled_name: false,
    companyName: "",
    authStartTime: "",
    authEndTime: "",
    recordStartTime: "",
    recordEndTime: "",
    begin: "1950-06-01",
    end: "2100-06-01",
    name: "",
    applied: false
  },

  inputComName: function(e) {
    this.setData({
      companyName: e.detail.value
    });
  },
  formSubmit: function(e) {
    //转为unix时间
    var authST = util.formatToDate(this.data.authStartTime) / 1000 + 14400;
    var authET = util.formatToDate(this.data.authEndTime) / 1000 + 14400;
    var recordST = util.formatToDate(this.data.recordStartTime) / 1000 + 14400;
    var recordET = util.formatToDate(this.data.recordEndTime) / 1000 + 14400;
    var date = new Date();
    date = util.formatToDate(date) / 1000 + 14400;
    var that = this;
    that.setData({
      applied: true
    });
    wx.request({
      url: api.requestAuthoUrl,
      data: {
        companyName: this.data.companyName,
        loginFlag: wx.getStorageSync("loginFlag"),
        authStartTime: authST,
        authEndTime: authET,
        recordStartTime: recordST,
        recordEndTime: recordET,
        timeStamp: date
      },
      method: "POST",
      success: function(e) {
        if (e.statusCode == 200) {
          wx.showToast({
            title: "申请发送成功",
            icon: "success"
          });
          util.getApplyList(i => {
            if (i == 2) {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        } else {
          wx.showToast({
            title: e.data,
            icon: "none"
          });
        }
        that.setData({
          applied: false
        });
      },
      fail: function(e) {
        wx.showToast({
          title: "申请发送失败",
          icon: "none"
        });
        that.setData({
          applied: false
        });
      }
    });
  },

  bindDateChange: function(e) {
    if (e.target.id == "authStartTime") {
      this.setData({
        authStartTime: e.detail.value
      });
    } else if (e.target.id == "authEndTime") {
      this.setData({
        authEndTime: e.detail.value
      });
    } else if (e.target.id == "recordStartTime") {
      this.setData({
        recordStartTime: e.detail.value
      });
    } else if (e.target.id == "recordEndTime") {
      this.setData({
        recordEndTime: e.detail.value
      });
    }
  },

  onReady: function() {
    this.setData({
      authStartTime: util.formatTime(new Date(), "yyyy-MM-dd"),
      authEndTime: util.formatTime(new Date(), "yyyy-MM-dd"),
      recordStartTime: util.formatTime(new Date(), "yyyy-MM-dd"),
      recordEndTime: util.formatTime(new Date(), "yyyy-MM-dd")
    });
  }
});
