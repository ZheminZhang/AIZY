var config = require("../../config/config.js");
var zhenzisms = require("../../utils/zhenzisms.js");
Page({
  data: {
    hidden: true,
    btnValue: "",
    btnDisabled: false,
    companyName: "",
    phone: "",
    scode: "",
    code: "",
    second: 60,
    isCode: "",
    currentText: "",
    sex: [
      { name: "A", value: "男", checked: "true" },
      { name: "B", value: "女" }
    ]
  },
  formSubmit: function(e) {
    console.log("form发生了submit事件，携带数据为：", e.detail.value);
  },
  getCompanyName: function(e) {
    this.setData({
      companyName: e.detail.value
    });
  },
  bindNameInput: function(e) {
    this.setData({
      companyName: e.detail.value
    });
  },
  bindPhoneInput: function(e) {
    var val = e.detail.value;
    var _this = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (val.length > 11) {
      _this.setData({
        hidden: true,
        btnValue: ""
      });
      wx.showToast({
        title: "手机号数过多",
        icon: "none"
      });
    }
    if (val.length == 11) {
      if (!myreg.test(val)) {
        wx.showToast({
          title: "手机格式错误",
          icon: "none"
        });
      } else {
        _this.setData({
          phone: val,
          hidden: false,
          btnValue: "获取验证码"
        });
      }
    }
  },
  bindCodeInput: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  getSellArea: function(e) {
    this.setData({
      currentText: e.detail.value
    });
  },
  getCode: function() {
    console.log("获取验证码");
    //这里获得验证码
    var _this = this;
    var that = this;
    var code = Math.floor(Math.random() * 9999);
    this.setData({
      scode: code
    });
    zhenzisms.client.init(
      "https://sms_developer.zhenzikj.com",
      "102505",
      "608ddfa4-da63-42df-94be-f0a90b7a2271"
    ); //
    zhenzisms.client.sendCode(
      function(res) {
        wx.showToast({
          title: res.data.data,
          icon: "none",
          duration: 2000
        });
      },
      that.data.phone,
      "验证码为:{code}",
      "",
      60 * 5,
      4
    );
    this.timer();
  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(() => {
        var second = this.data.second - 1;
        this.setData({
          second: second,
          btnValue: "还有" + second + "秒",
          btnDisabled: true
        });
        if (this.data.second <= 0) {
          this.setData({
            second: 60,
            btnValue: "获取验证码",
            btnDisabled: false
          });
          resolve(setTimer);
        }
      }, 1000);
    });
    promise.then(setTimer => {
      clearInterval(setTimer);
    });
  },
  //获得信息，1234是发起请求，服务返回是预期的验证码
  getMessage: function() {
    var that = this;
    var result = zhenzisms.client.validateCode(this.data.phone, this.data.code);
    if (result == "ok") {
      console.log("验证正确");
      wx.showLoading({
        title: "请稍等...",
        mask: true
      });
      wx.request({
        url: config.registUrl,
        data: {
          loginFlag: wx.getStorageSync("loginFlag"),
          companyName: this.data.companyName,
          phone: this.data.phone,
          code: this.data.code,
          businessScope: this.data.currentText
        },
        method: "POST",
        success: function(res) {
          wx.hideLoading();
          if (res.statusCode == 200) {
            wx.showToast({
              title: "注册成功",
              icon: "none"
            });
            wx.navigateBack({
              delta: 1
            });
          } else {
            wx.showToast({
              title: res.data,
              icon: "none"
            });
            console.log(res);
          }
        },
        fail: function(res) {
          wx.hideLoading();
          wx.showToast({
            title: "注册失败",
            icon: "none"
          });
        }
      });
    } else if (result == "empty") {
      console.log("验证错误, 未生成验证码!");
    } else if (result == "number_error") {
      console.log("验证错误，手机号不一致!");
    } else if (result == "code_error") {
      console.log("验证错误，验证码不一致!");
    } else if (result == "code_expired") {
      console.log("验证错误，验证码已过期!");
    }
  }
});
