const api = require('../../config/config.js');
Page({
  data: {
    disabled_name: true,
    name: "",
    id:-1,
    start_date: '2019-06-01',
    end_date: '2019-06-01',
    begin: '2000-06-01',
    end: '2100-06-01',
    type:[]
  },
  // TODO: 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
  },
  bindDateChange: function (e) {
    if (e.target.id == 'start_date') {
      this.setData({
        start_date: e.detail.value
      })
    }
    else if (e.target.id == 'end_date') {
      this.setData({
        end_date: e.detail.value
      })
    }
  },
  //请求
  getMessage: function () {
    wx.request({
      url: api.authorizedUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "gantor": "user2",    // 授予他人的请求
        "gantee": "user1",    // 授权发起者，即被授予者
        "start_date": 1000,//this.data.start_date,
        "end_date": 1210//this.data.end_date,
        //"types": JSON.stringify([1, 2])
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
      start_date: options.start_date,
      end_date: options.end_date,
      type: options.type
    })
  }
  
})