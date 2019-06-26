// pages/resign_company.js
Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    name: '',
    phone: '',
    code: '',
    second: 60
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  bindNameInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindPhoneInput:function(e){
    var val = e.detail.value;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if(val[0]!='1'||val.length>11)
     {
      this.setData({
        hidden: true,
        btnValue: ''
      })
       wx.showToast({
         title: '手机格式不正确',
         icon:'none',
       })
     }
     else if(val.length==11)
    {
      if(!myreg.test(val)){
        wx.showToast({
          title: '手机格式错误',
          icon:'none'
        })
      }
      else{
        this.setData({
          phone: val,
          hidden: false,
          btnValue: '获取验证码'
        })
      }
    }
  },
  bindCodeInput:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  getCode:function(){
    console.log('获取验证码');
    //这里获得验证码


    this.timer();
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: "还有"+second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  getMessage:function(){
    if(this.data.code=="1234"&&this.data.name!=''){
      wx.showToast({
        title: '注册成功',
        icon:'success',
      })
      console.log(this.data);
    }
    else{
      wx.showToast({
        title: '注册失败',
        icon:'none',
      })
    }
  }
  //保存
  
})
