var util = require("../../utils/util.js");
var config = require("../../config/config.js");
var zhuan_dingwei = require("../../libs/dingwei.js");

// 获取全局唯一的语音识别管理器
const plugin = requirePlugin("WechatSI");
const manager = plugin.getRecordRecognitionManager();
const app = getApp();

// 西班牙语

Page({
  data: {
    tabitemVoice: {},
    tabitemForm: {},
    tabitemSign: {},
    activeTabId: null,
    filetext: "上传",
    /* 语音识别信息 */
    currentText: "", //识别内容
    isClick: false,
    /* 记账相关信息 */
    summary: "", //null, //分类信息
    debit: "", //借方科目
    debitAmount: null, //借方金额
    credit: "", //贷方科目
    creditAmount: null, //贷方金额
    date: "", //日期
    secondCompName: "",
    thirdCompName: "",
    sendButtonText: "生成报表",
    filePath: [],
    timestamp: "",
    items: [
      { name: "A", value: "Tos(seca sin gargajo)" },
      { name: "B", value: "tos(hay gargajo)" },
      { name: "C", value: "Tos bronca" },
      { name: "D", value: "No tos" }
    ],
    items1: [
      { name: "A", value: "tenderse tiene asma o disnea" },
      { name: "B", value: "sentado tiene asma o disnea" },
      { name: "C", value: "tiene asma o disnea después de caminar" },
      { name: "D", value: "no" }
    ],
    items2: [
      { name: "A", value: "Náuseas y vomito" },
      { name: "B", value: "diarrea" },
      { name: "C", value: "no" }
    ],
    items3: [
      { name: "A", value: "si" },
      { name: "B", value: "no" }
    ],
    items4: [
      { name: "A", value: "si" },
      { name: "B", value: "no" }
    ],
    items5: [
      { name: "A", value: "si" },
      { name: "B", value: "no" }
    ],
    items6: [
      { name: "A", value: "temperatura corporal normal" },
      { name: "B", value: "poca fiebre(37.2-38℃)" },
      { name: "C", value: "alta fiebre(mas de38℃)" }
    ],
    items7: [
      { name: "A", value: "si" },
      { name: "B", value: "no" }
    ],
    items8: [
      { name: "A", value: "si" },
      { name: "B", value: "no" }
    ],
    items9: [
      { name: "A", value: "si" },
      { name: "B", value: "no" }
    ],
    items10: [
      { name: "A", value: "masculino" },
      { name: "B", value: "femenino" }
    ],
    zhouWei: "",
    age: "",
    temp1: "",
    temp2: "",
    temp3: "",
    zhengZhuang: "",
    zhengZhuangDays: "",
    city: "",
    party: "",
    nowCity: "",
    itemValue: "",
    item1Value: "",
    item2Value: "",
    item3Value: "",
    item4Value: "",
    item5Value: "",
    item6Value: "",
    item7Value: "",
    item8Value: "",
    item9Value: "",
    item10Value: "",
    //默认未获取地址
    hasLocation: false,
    info: "",
    longitude: "",
    latitude: ""
  },

  getlocal_dingweui: function(e) {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        console.log("wx location:");
        console.log(that.data.longitude);
        console.log(that.data.latitude);
        var gcj02tobd09 = zhuan_dingwei.wgs84togcj02(
          that.data.longitude,
          that.data.latitude
        );
        console.log(gcj02tobd09);
        that.setData({
          longitude: gcj02tobd09[0],
          latitude: gcj02tobd09[1]
        });
        console.log("-------");
        // that.get_baidu_dingwei();
        that.getAddress();
      }
    });
  },

  getAddress: function() {
    wx.request({
      url: config.addressUrl,
      data: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      method: "post",
      success(res) {
        console.log("------", res);
        // that.clearData();
        if (res.statusCode == 200) {
        } else {
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: "记录失败",
          icon: "none"
        });
        console.log("失败");
      }
    });
  },

  get_baidu_dingwei: function() {
    console.log("-----------");
    var that = this;
    console.log("gcj02tobd09 location:");
    console.log(that.data.longitude);
    console.log(that.data.latitude);

    wx.request({
      url: "https://baoxian.grwlkj.com/home/index/get_user_city",
      method: "get",
      data: {
        longitude: that.data.longitude,
        latitude: that.data.latitude
      },
      success(res) {
        console.log("res", res);
        var info = res.data.data;
        that.setData({
          info: info
        });
      }
    });
  },

  tabChange(e) {
    if (e.detail.source == "touch") {
      var id = e.detail.currentItemId;
      console.log(e.detail.currentItemId);
      this.setActiveTab(id);
    }
  },

  tabclick(e) {
    var id = e.target.id;
    console.log(id);
    this.setActiveTab(id);
  },

  setActiveTab(id) {
    console.log(id);
    console.log(this.data.activeTabId);
    var rect = this.data[id];
    if (rect) {
      this.animation.width(rect.width).translate(rect.left, 0);
      this.setData({
        activeTabId: id,
        indicatorAnim: this.animation.step().export()
      });
    }
  },

  /* 语音识别页面 */
  //记账信息
  vtextAreaBlur: function(e) {
    this.setData({
      currentText: e.detail.value
    });
  },

  //开始与结束录音
  streamRecord: function() {
    manager.start({
      lang: "zh_CN"
    });
    wx.showToast({
      title: "开始录音",
      icon: "none"
    });
    console.log("录音开始");
  },
  streamRecordEnd: function() {
    console.log("录音结束");
    manager.stop();
    wx.showToast({
      title: "录音结束",
      icon: "none"
    });
  },
  upload: function() {
    console.log("上传再次查看", this.data.filePath);
    var url_ =
      "../uploadImage/uploadImage" +
      "?filePath=" +
      JSON.stringify(this.data.filePath);
    wx.navigateTo({
      url: url_
    });
  },
  initRecord: function() {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = res => {
      let text = res.result;
      this.setData({
        currentText: text
      });
    };
    // 识别结束事件
    manager.onStop = res => {
      let text = res.result;
      if (text == "") {
        // 用户没有说话，可以做一下提示处理...
        return;
      }
      this.setData({
        currentText: text
      });
    };
  },
  sendData: function() {
    // this.getlocal_dingweui();
    var that = this;
    wx.showLoading({
      title: "Un momento...",
      mask: true
    });
    /* 得到完整识别内容发给语音服务器处理 */
    wx.request({
      url: config.voiceUrl,
      // url: "http://27.152.156.24:80/api/analysis/analysis",
      data: {
        text: this.data.currentText
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        getApp().globalData.description = res.data.description;
        getApp().globalData.similarity = res.data.similarity;
        console.log("before switch: " + res.data.description);
        wx.navigateTo({
          url: "../zhenDuan/zhenDuan"
        });
        // wx.switchTab({
        //   url: "../zhenDuan/zhenDuan",
        //   success: function(e) {},
        //   fail: function(e) {
        //     console.log(e);
        //   }
        // });
        // wx.showToast({
        //   title: res.data.similarity,
        //   icon: "none"
        // });
        return;
        that.setData({
          summary: res.data.data[0].summary,
          debit: res.data.data[0].debit,
          debitAmount: parseFloat(res.data.data[0].debit_amount),
          credit: res.data.data[0].credit,
          creditAmount: parseFloat(res.data.data[0].credit_amount)
        });
        that.setActiveTab("tabitemForm");
      },
      fail: function(res) {
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: "记录生成失败，请重试",
          icon: "none"
        });
      }
    });
  },

  /* 表单页面 */
  //周围人数
  ageFunction: function(e) {
    this.setData({
      age: e.detail.value
    });
  },
  //周围人数
  zhouWeiFunction: function(e) {
    this.setData({
      zhouWei: e.detail.value
    });
  },
  //症状
  zhengZhuangFunction: function(e) {
    this.setData({
      zhengZhuang: e.detail.value
    });
  },
  //症状天数
  zhengZhuangDaysFunction: function(e) {
    this.setData({
      zhengZhuangDays: e.detail.value
    });
  },
  //去过城市
  cityFunction: function(e) {
    this.setData({
      city: e.detail.value
    });
  },
  //聚会
  partyFunction: function(e) {
    this.setData({
      party: e.detail.value
    });
  },
  //去过城市
  nowCityFunction: function(e) {
    this.setData({
      nowCity: e.detail.value
    });
  },
  radioChange: function(e) {
    this.setData({
      itemValue: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange1: function(e) {
    this.setData({
      item1Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange2: function(e) {
    this.setData({
      item2Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange3: function(e) {
    this.setData({
      item3Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange4: function(e) {
    this.setData({
      item4Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange5: function(e) {
    this.setData({
      item5Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange6: function(e) {
    this.setData({
      item6Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange7: function(e) {
    this.setData({
      item7Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange8: function(e) {
    this.setData({
      item8Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange9: function(e) {
    this.setData({
      item9Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  radioChange10: function(e) {
    this.setData({
      item10Value: e.detail.value
    });
    console.log("radio发生change事件，携带value值为：", e.detail.value);
  },
  //摘要信息输入
  tempFunction1: function(e) {
    var text = e.detail.value;
    //this.data.summary = text;
    this.setData({
      temp1: text
    });
  },
  tempFunction2: function(e) {
    var text = e.detail.value;
    //this.data.summary = text;
    this.setData({
      temp2: text
    });
  },
  tempFunction3: function(e) {
    var text = e.detail.value;
    //this.data.summary = text;
    this.setData({
      temp3: text
    });
  },
  summaryFunction: function(e) {
    var text = e.detail.value;
    //this.data.summary = text;
    this.setData({
      summary: text
    });
  },
  //借方科目
  debitFunction: function(e) {
    this.setData({
      debit: e.detail.value
    });
  },
  //借方金额
  debitAmFunction: function(e) {
    this.setData({
      debitAmount: e.detail.value
    });
  },
  //贷方科目
  creditFunction: function(e) {
    this.setData({
      credit: e.detail.value
    });
  },
  //贷方金额
  creditAmFunction: function(e) {
    this.setData({
      creditAmount: e.detail.value
    });
  },
  thirdCompanyFunction: function(e) {
    this.setData({
      thirdCompName: e.detail.value
    });
    console.log(this.data.thirdCompName);
  },
  secondCompFunction: function(e) {
    this.setData({
      secondCompName: e.detail.value
    });
    console.log(this.data.secondCompName);
  },
  //选择时间
  onDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },

  // 签名记录
  signBill: function() {
    let loginFlag = wx.getStorageSync("loginFlag");
    var that = this;
    //util.getApplyList();
    if (loginFlag) {
      // util.getSignList();
      that.setActiveTab("tabitemSign");
    } else {
      // TODO:弹出登录提示框
      return;
      wx.showToast({
        title: "您还未登录，请先登录",
        icon: "none",
        duration: 2000
      });
    }
  },

  //点击完成,将结果发给服务器
  confirmData: function() {
    // this.getlocal_dingweui();
    if (!this.checkQuestion()) {
      return;
    }
    var that = this;
    //精确到秒，定位为当天12点
    var timestamp = parseInt(new Date().valueOf() / 1000);
    that.setData({
      timestamp: timestamp
    });
    var unixtime = util.formatToDate(that.data.date) / 1000 + 14400;
    console.log("交易方信息");
    console.log(that.data.secondCompName);
    wx.showLoading({
      title: "请稍等..."
    });

    wx.request({
      url: config.insertUrl,
      data: {
        text: this.data.currentText,
        itemValue: that.data.itemValue,
        item1Value: that.data.item1Value,
        item2Value: that.data.item2Value,
        item3Value: that.data.item3Value,
        item4Value: that.data.item4Value,
        item5Value: that.data.item5Value,
        item6Value: that.data.item6Value,
        item7Value: that.data.item7Value,
        item8Value: that.data.item8Value,
        item9Value: that.data.item9Value,
        zhouWei: that.data.zhouWei,
        age: that.data.age,
        temp1: that.data.temp1,
        temp2: that.data.temp2,
        temp3: that.data.temp3,
        zhengZhuang: that.data.zhengZhuang,
        zhengZhuangDays: that.data.zhengZhuangDays,
        city: that.data.city,
        party: that.data.party,
        nowCity: that.data.nowCity,
        timeStamp: timestamp
      },
      method: "post",
      success(res) {
        console.log("------", res);
        // that.clearData();
        if (res.statusCode == 200 && false) {
          var itemId = res.data;
          console.log(that.data.filePath);
          // 上传附件
          if (that.data.filePath.length) {
            that.uploadDIY(
              that.data.filePath,
              0,
              that.data.filePath.length,
              itemId,
              unixtime
            );
          } else {
            wx.hideLoading();
            wx.showToast({
              title: "记录成功",
              icon: "success"
            });
          }
        } else {
          wx.hideLoading();
          getApp().globalData.description = res.data.description;
          getApp().globalData.similarity = res.data.similarity;
          console.log("before switch: " + res.data.description);
          getApp().globalData.chartTitle =
            "posibilidad de definir\n el diagnóstico";
          wx.navigateTo({
            url: "../zhenDuan30/zhenDuan30",
            success: function() {},
            fail: function(e) {
              console.log(e);
            }
          });
          // wx.showToast({
          //   title: res.data.similarity,
          //   icon: "none"
          // });
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: "记录失败",
          icon: "none"
        });
        console.log("失败");
      }
    });
  },
  uploadDIY(filePaths, i, length, itemId, unixtime) {
    if (i == length) {
      wx.hideLoading();
      wx.showToast({
        title: "记录成功",
        icon: "success"
      });
      return;
    }
    var that = this;
    wx.uploadFile({
      url: config.uploadUrl,
      filePath: filePaths[i],
      name: "file",
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        loginFlag: wx.getStorageSync("loginFlag"),
        summary: that.data.summary,
        debit: that.data.debit,
        debitAmount: parseFloat(that.data.debitAmount),
        credit: that.data.credit,
        creditAmount: parseFloat(that.data.creditAmount),
        time: unixtime,
        timeStamp: parseInt(that.data.timestamp),
        secondCompName: that.data.secondCompName,
        thirdCompName: that.data.thirdCompName,
        index: i,
        itemId: itemId
      },
      success: res => {
        console.log(">>>>>>>>", res);
        that.uploadDIY(filePaths, i + 1, length, itemId, unixtime);
        console.log("成功上传");
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: "附件上传失败",
          icon: "none"
        });
      }
    });
  },
  onLoad: function(options) {
    console.log("bill onLoad");
    // 页面加载 options为页面跳转所带来的参数
    this.initRecord();
    // this.getlocal_dingweui();
  },
  initRadio: function() {
    console.log("call initRadio");
    console.log("items:");
    console.log("languageId");
    console.log(getApp().globalData.languageId);
    this.setData({
      // items: language30.items
    });
    for (var i in this.data.items) {
      console.log(this.data.items[i]);
      if (this.data.items[i].checked == "true") {
        this.setData({
          itemValue: this.data.items[i].name
        });
      }
    }
    console.log("items1:");
    for (var i in this.data.items1) {
      console.log(this.data.items1[i]);
      if (this.data.items1[i].checked == "true") {
        this.setData({
          item1Value: this.data.items1[i].name
        });
      }
    }
    console.log("items2:");
    for (var i in this.data.items2) {
      if (this.data.items2[i].checked == "true") {
        this.setData({
          item2Value: this.data.items2[i].name
        });
      }
    }
    for (var i in this.data.items3) {
      if (this.data.items3[i].checked == "true") {
        this.setData({
          item3Value: this.data.items3[i].name
        });
      }
    }
    for (var i in this.data.items4) {
      if (this.data.items4[i].checked == "true") {
        this.setData({
          item4Value: this.data.items4[i].name
        });
      }
    }
    for (var i in this.data.items5) {
      if (this.data.items5[i].checked == "true") {
        this.setData({
          item5Value: this.data.items5[i].name
        });
      }
    }
    for (var i in this.data.items6) {
      if (this.data.items6[i].checked == "true") {
        this.setData({
          item6Value: this.data.items6[i].name
        });
      }
    }
    for (var i in this.data.items7) {
      if (this.data.items7[i].checked == "true") {
        this.setData({
          item7Value: this.data.items7[i].name
        });
      }
    }
    for (var i in this.data.items8) {
      if (this.data.items8[i].checked == "true") {
        this.setData({
          item8Value: this.data.items8[i].name
        });
      }
    }
    for (var i in this.data.items9) {
      if (this.data.items9[i].checked == "true") {
        this.setData({
          item9Value: this.data.items9[i].name
        });
      }
    }
  },

  checkQuestion: function() {
    console.log("call checkQuestion");
    if (this.data.currentText == "") {
      // wx.showToast({
      //   title: "describa sus síntomas en este momento",
      //   icon: "none"
      // });
      // return false;
    }
    if (
      this.data.temp1 == "" ||
      this.data.temp2 == "" ||
      this.data.temp3 == ""
    ) {
      wx.showToast({
        title: "Temperaturas del cuerpo de las últimas 3 veces(℃)",
        icon: "none"
      });
      return false;
    }
    if (this.data.itemValue == "") {
      wx.showToast({
        title: "tos",
        icon: "none"
      });
      return false;
    }
    if (this.data.item1Value == "") {
      wx.showToast({
        title: "asma o disnea",
        icon: "none"
      });
      return false;
    }
    if (this.data.item2Value == "") {
      wx.showToast({
        title: "síntoma del intestinal y estomacal",
        icon: "none"
      });
      return false;
    }
    if (this.data.item3Value == "") {
      wx.showToast({
        title: "hay dolor de garganta",
        icon: "none"
      });
      return false;
    }
    if (this.data.item4Value == "") {
      wx.showToast({
        title: "dolor del cuerpo y debilidades general",
        icon: "none"
      });
      return false;
    }
    if (this.data.item5Value == "") {
      wx.showToast({
        title: "estornuda moqueo",
        icon: "none"
      });
      return false;
    }
    if (this.data.item6Value == "") {
      wx.showToast({
        title: "fiebre y grados",
        icon: "none"
      });
      return false;
    }
    if (this.data.age == "") {
      wx.showToast({
        title: "qué edad tiene",
        icon: "none"
      });
      return false;
    }
    if (this.data.item10Value == "") {
      wx.showToast({
        title: "sexo",
        icon: "none"
      });
      return false;
    }
    if (this.data.item7Value == "") {
      wx.showToast({
        title: "grueso de sarro de Lengua",
        icon: "none"
      });
      return false;
    }
    if (this.data.zhouWei == "") {
      wx.showToast({
        title:
          "hay la gente que al tu aldo tiene la síntoma cómo así y cuánto son",
        icon: "none"
      });
      return false;
    }
    if (this.data.zhengZhuangDays == "") {
      wx.showToast({
        title: "cuántos días duran las síntomas",
        icon: "none"
      });
      return false;
    }
    // if (this.data.city == "") {
    //   wx.showToast({
    //     title: "las ciudades que has estado en las últimas dos semanas",
    //     icon: "none"
    //   });
    //   return false;
    // }
    // if (this.data.party == "") {
    //   wx.showToast({
    //     title: "la reunión que has estado las últimas 5 dias",
    //     icon: "none"
    //   });
    //   return false;
    // }
    // if (this.data.nowCity == "") {
    //   wx.showToast({
    //     title: "dónde está la ciudad ahora",
    //     icon: "none"
    //   });
    //   return false;
    // }
    if (this.data.item8Value == "") {
      wx.showToast({
        title: "has ponerte en contacto con infectados del coronavirus",
        icon: "none"
      });
      return false;
    }
    if (this.data.item9Value == "") {
      wx.showToast({
        title: "has ponerte en contacto con la gente de wuhan",
        icon: "none"
      });
      return false;
    }
    return true;
  },

  onReady: function() {
    this.setData({
      date: util.formatTime(new Date(), "yyyy-MM-dd")
    });
    this.initRadio();
  },

  onShow: function(res) {
    /* 滑动动画相关 */
    var query = wx.createSelectorQuery().in(this),
      _this = this;
    console.log("Bill:", this.data.filePath);
    _this.animation = wx.createAnimation({
      duration: 500, //动画持续时间
      timingFunction: "ease" //动画效果
    });
    query.select("#tabitemForm").boundingClientRect(function(rect) {
      console.log("来自show");
      _this.setData({
        tabitemForm: rect
      });
    });
    query.select("#tabitemVoice").boundingClientRect(function(rect) {
      _this.setData({
        tabitemVoice: rect
      });
    });
    query.exec();
  },

  clearData() {
    this.setData({
      summary: "", //null, //分类信息
      debit: "", //借方科目
      debitAmount: null, //借方金额
      credit: "", //贷方科目
      creditAmount: null, //贷方金额
      secondCompName: "",
      thirdCompName: "",
      sendButtonText: "生成报表",
      filePath: [],
      timestamp: "",
      currentText: ""
    });
    return;
  }
});
