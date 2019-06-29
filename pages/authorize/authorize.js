var util = require('../../utils/util.js');
var config = require('../../config/config.js');

Page({
  data: {
    disabled_name: true,
    companyName: "",
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
    var authST = util.formatToDate(this.data.authStartTime) / 1000 + 14400;
    var authET = util.formatToDate(this.data.authEndTime) / 1000 + 14400;
    var recordST = util.formatToDate(this.data.recordStartTime) / 1000 + 14400;
    var recordET = util.formatToDate(this.data.recordEndTime) / 1000 + 14400;

    wx.request({
      url: config.authorizedUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "grantorId": this.data.companyName,                    // 授予者
        "granteeId": wx.getStorageSync('loginFlag'),    // 授权发起者，即被授予者
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
  msToDate: function (msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let result1 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date) +
      ' ' +
      ((hour + 1) < 10 ? '0' + hour : hour) +
      ':' +
      ((minute + 1) < 10 ? '0' + minute : minute) +
      ':' +
      ((second + 1) < 10 ? '0' + second : second);

    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date);

    let result = {
      hasTime: result1,
      withoutTime: result2
    };
    return result;
  },
  // 加载url中的参数,同时完成unix转普通时间
  onLoad: function (options) {
    console.log(this.msToDate(options.authStartTime).withoutTime);
    this.setData({
      companyName: options.companyName,
      id: options.id,
      authStartTime: msToDate(options.authStartTime).withoutTime,
      authEndTime: msToDate(options.authEndTime).withoutTime,
      recordStartTime: msToDate(options.recordStartTime).withoutTime,
      recordEndTime: msToDate(options.recordEndTime).withoutTime,
      type: options.type,
    })
  }
})