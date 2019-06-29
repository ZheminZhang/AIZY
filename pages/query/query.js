// pages/query/query.js
const api = require('../../config/config.js');
var util = require('../../utils/util.js');

Page({
  data: {
    disabled_name: false,
    companyName: '',
    authStartTime: '2019-06-01',
    authEndTime: '2019-07-01',
    recordStartTime: '2019-03-01',
    recordEndTime: '2019-06-01',
    begin: '2000-06-01',
    end: '2100-06-01',
    name:'',
    tabOut: [
      { 'id': 0, 'text': '餐饮', 'done': false},
      { 'id': 1, 'text': '娱乐', 'done': false},
      { 'id': 2, 'text': '转账', 'done': false},
      { 'id': 3, 'text': '购物', 'done': false},
      { 'id': 4, 'text': '电影', 'done': false},
      { 'id': 5, 'text': '出行', 'done': false},
      { 'id': 6, 'text': '理发', 'done': false},
      { 'id': 7, 'text': '红包', 'done': false}
    ],
    in_tabOut: [
      { 'id': 0, 'text': '基金', 'done':false},
      { 'id': 1, 'text': '股票', 'done':false},
    ],
  },
 
  inputComName: function(e) {
    this.setData({
      companyName: e.detail.value,
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)

    //转为unix时间
    var authST = util.formatToDate(this.data.authStartTime) / 1000 + 14400;
    var authET = util.formatToDate(this.data.authEndTime) / 1000 + 14400;
    var recordST = util.formatToDate(this.data.recordStartTime) / 1000 + 14400;
    var recordET = util.formatToDate(this.data.recordEndTime) / 1000 + 14400;
    wx.request({
      url: api.requestAuthoUrl,
      //url: 'http://127.0.0.1:80/api/analysis/analysis',
      data: {
        "companyName": this.data.companyName,
        "loginFlag": wx.getStorageSync('loginFlag'),
        "authStartTime": authST,
        "authEndTime": authET,
        "recordStartTime": recordST,
        "recordEndTime": recordET,
        "timeStamp": "1123456789" // TODO: 发起请求的时间，unix时间戳
      },
      method: 'POST',
      success: function (e) {
        // TODO: 成功也请提示用户
        // TODO: 出错会有错误信息，请用弹窗等提示用户
        console.log(e);
      },
      fail: function (e) {
        // TODO: 请求出错，请用弹窗等提示用户
        console.log(e);
      }
    })
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

    else if(e.target.id == 'recordStartTime'){
      this.setData({
        recordStartTime: e.detail.value,
        recordEndTime: e.detail.value
      })
    }
    else if (e.target.id == 'recordEndTime'){
      this.setData({
        recordEndTime: e.detail.value
      })
    }
  },
})
