var config = require('../../config/config.js')
Page({
  data: {
    companyName: '',
    phone:'',
    code:'',
    codename:'',
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  getCompanyName: function(e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var num = 61;
      var timer = setInterval(function () {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.setData({
            codename: '重新发送',
            disabled: false
          })
        } else {
          _this.setData({
            codename: num + "s"
          })
        }
      }, 1000);
    }
  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },

  /* 提交注册信息 */
  getMessage() {
    wx.request({
      url: config.registUrl,
      data: {
        'loginFlag': wx.getStorageSync('loginFlag'),
        'companyName': this.data.companyName,
        'phonenumber': this.data.phone,
        'code': this.data.code,
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }

    })
  },
})
