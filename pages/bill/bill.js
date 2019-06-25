// pages/record-expend/record-expend.js
var util = require('../../utils/util.js')

// 获取全局唯一的语音识别管理器
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()

Page({
  data: {
    tabitemVoice: {},
    tabitemForm: {},
    activeTabId: null,

    /* 语音识别信息 */
    currentText: '',      //识别内容

    /* 记账相关信息 */
    classification: "",   //分类信息
    money_bor: 0.00,      //借
    money_loan: 0.00,     //贷
    remarksText: "",      //备注
    navbar: ['支出', '收入'],
    currentTab: 0,
    money: 0.00,    //金额
    date: "",       //日期
  },

  tabChange(e) {
    if (e.detail.source == "touch") {
      var id = e.detail.currentItemId;
      this.setActiveTab(id);
    }
  },

  tabclick(e) {
    var id = e.target.id;
    this.setActiveTab(id);
  },

  setActiveTab(id) {
    var rect = this.data[id];
    if (rect) {
      this.animation.width(rect.width).translate(rect.left, 0);
      this.setData({
        activeTabId: id,
        indicatorAnim: this.animation.step().export()
      })
    }
  },

  /* 语音识别页面 */

  //开始与结束识别语音
  streamRecord: function () {
    manager.start({
      lang: 'zh_CN',
    })
  },
  streamRecordEnd: function () {
    manager.stop()
  },

  initRecord: function () {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      let text = res.result
      this.setData({
        currentText: text,
      })
    }
    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result
      if (text == '') {
        // 用户没有说话，可以做一下提示处理...
        return
      }
      this.setData({
        currentText: text,
      })
    }
  },


  /* 表单页面 */
  //分类信息输入
  classFunction: function (e) {
    var text = e.detail.value;
    this.data.classification = text;
    // this.setData({
    //   classification: text,
    // })
  },
  //金额，借
  borrowFunction: function(e) {
    this.setData({
      money_bor: e.detail.value,
    })
  },
  //金额，贷
  loanFunction: function (e) {
    this.setData({
      money_loan: e.detail.value,
    })
  },
  //选择时间
  onDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  //备注
  onInputRemarks: function (e) {
    var text = e.detail.value;
    this.setData({
      remarksText: text,
    });
  },

  //点击完成,将结果存入storage
  confirmData: function () {
    var that = this;
    if (parseFloat(that.data.money_bor) <= 0 || parseFloat(that.data.money_loan) <= 0) {
      wx.showToast({
        title: '请输入金额',
        icon:'none',
        duration: 1500
      });
      return;
    }

    //记录
    // let value = [];
    // try {
    //   value = wx.getStorageSync('Bill')
    // } catch (e) {
    // }
    // if (value == "") {
    //   value = [];
    // }
    // let json =
    // {
    //   classification: that.data.classification,
    //   money_bor: that.data.money_bor,
    //   money_loan: that.data.money_loan,
    //   date: that.data.date,
    //   remarks: that.data.remarksText,
    // };
    // value.push(json);
    // try {
    //   wx.setStorageSync('Bill', value)
    // } catch (e) {
    // }
    wx.showToast({
      title: '记账成功',
      icon: 'success',
      duration: 500,
      success: function () {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      }
    })
  },

  onLoad: function (options) {
    // 页面加载 options为页面跳转所带来的参数
    this.initRecord()
  },
  onReady: function () {
    /* 滑动动画相关 */
    var query = wx.createSelectorQuery().in(this),
      _this = this;
    _this.animation = wx.createAnimation({
      duration: 500,  //动画持续时间
      timingFunction: "ease",  //动画效果
    })
    query.select('#tabitemForm').boundingClientRect(function (rect) {
      _this.setData({
        tabitemForm: rect
      });
    })
    query.select('#tabitemVoice').boundingClientRect(function (rect) {
      _this.setData({
        tabitemVoice: rect
      });
      _this.setActiveTab('tabitemVoice');
    })
    query.exec();

    this.setData({
      date: util.formatTime(new Date(), "yyyy-MM-dd"),
    });
  },
})