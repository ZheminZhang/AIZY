const api = require('../../config/config.js');
var util = require('../../utils/util.js');
var config = require('../../config/config.js');

Page({
  data: {
    disabled_name: true,
    name: "",
    id:-1,
    authStartTime: '',  //授权开始时间
    authEndTime: '',    //授权结束时间
    recordStartTime: '',//可查询记录开始时间
    recordEndTime: '',//可查询记录结束时间
    begin: '2000-06-01',
    end: '2100-06-01',
    type:[]
  },
  // TODO: 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
  },
  bindDateChange: function (e) {
    if (e.target.id == 'authStartTime') {
      this.setData({
        authStartTime: e.detail.value,
        authEndTime: e.detail.value
      })
    }
    else if (e.target.id == 'authEndTime') {
      this.setData({
        authEndTime: e.detail.value
      })
    }
    else if (e.target.id == 'recordStartTime') {
      this.setData({
        recordStartTime: e.detail.value,
        recordEndTime: e.detail.value
      })
    }
    else if (e.target.id == 'recordEndTime') {
      this.setData({
        recordEndTime: e.detail.value
      })
    }
  },
  //请求
  getMessage: function () {
    //转为unix时间
    var authST = util.formatToDate(that.data.authStartTime) / 1000 + 14400;
    var authET = util.formatToDate(that.data.authEndTime) / 1000 + 14400;
    var recordST = util.formatToDate(that.data.recordStartTime) / 1000 + 14400;
    var recordET = util.formatToDate(that.data.recordEndTime) / 1000 + 14400;

    wx.request({
      url: api.authorizedUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "grantorId": wx.getStorageSync('loginFlag'),    // 授予者
        "granteeId": this.data.name,                    // 授权发起者，即被授予者
        "authStartTime": authST,
        "authEndTime": authET,
        "recordStartTime": recordST,
        "recordEndTime": recordET,
      },
      success: function(e) {
        console.log(e);
      },
      fail: function(e) {
        console.log(e);
      }
    })
  },
  // 加载url中的参数
  onLoad: function (options) {
    this.setData({
      name: options.name,
      id: options.id,
      authStartTime: options.authStartTime,
      authEndTime: options.authEndTime,
      recordStartTime: options.recordStartTime,
      recordEndTime: options.recordEndTime,
      type: options.type,
    })
  }
})