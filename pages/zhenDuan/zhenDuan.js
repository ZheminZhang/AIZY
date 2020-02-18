// pages/query/query.js
const api = require("../../config/config.js");
var util = require("../../utils/util.js");

import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

var chart = null;

function initChart(canvas, width, height) {
  console.log("call initChart");
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [
      {
        name: "业务指标",
        type: "gauge",
        detail: {
          formatter: "{value}%"
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 30,
            shadowBlur: 0,
            color: [
              [0.3, "#67e0e3"],
              [0.5, "#37a2da"],
              [0.7, "#FF8800"],
              [1, "#fd666d"]
            ]
          }
        },
        data: [
          {
            value: (Number(getApp().globalData.similarity) * 100).toFixed(0),
            name: "确诊几率"
          }
        ]
      }
    ]
  };

  chart.setOption(option, true);

  return chart;
}

Page({
  data: {
    companyName: "",
    recordStartTime: "",
    recordEndTime: "",
    begin: "2000-06-01",
    end: "2100-06-01",
    name: "",
    description: "",
    similarity: "",
    ec: {
      onInit: initChart
    }
  },

  onShareAppMessage: function(res) {
    return {
      title: "新型冠状病毒自测小程序",
      path: "/pages/login/login",
      success: function() {},
      fail: function() {}
    };
  },

  inputComName: function(e) {
    var _this = this;
    _this.setData({
      companyName: e.detail.value
    });
  },
  formSubmit: function(e) {
    let loginFlag = wx.getStorageSync("loginFlag");
    if (!loginFlag) {
      return;
      wx.showToast({
        title: "您还未登录，请先登录",
        icon: "none"
      });
      return;
    }
    console.log("form发生了submit事件，携带数据为：", e);
    var that = this;

    //转为unix时间
    // var authST = util.formatToDate(this.data.authStartTime) / 1000 + 14400;
    // var authET = util.formatToDate(this.data.authEndTime) / 1000 + 14400;
    var recordST = util.formatToDate(this.data.recordStartTime) / 1000 + 14400;
    var recordET = util.formatToDate(this.data.recordEndTime) / 1000 + 14400;

    if (recordST > recordET) {
      wx.showToast({
        title: "时间错误",
        icon: "none"
      });
      return;
    }
    var date = new Date();
    var dateTemp = util.formatToDate(date) / 1000 + 14400;
    var type = e.target.dataset["type"];
    wx.request({
      url: api.queryUrl,
      //url: 'http://127.0.0.1:80',
      data: {
        companyName: this.data.companyName,
        loginFlag: wx.getStorageSync("loginFlag"),
        // "authStartTime": authST,
        // "authEndTime": authET,
        startTime: recordST,
        endTime: recordET,
        timeStamp: dateTemp, // TODO: 发起请求的时间，unix时间戳
        attachment: 0
      },
      method: "POST",
      success: function(e) {
        console.log(e);
        wx.hideLoading();
        if (e.statusCode == 200 && type == "form") {
          wx.setStorageSync("table", e.data);
          wx.navigateTo({
            url: "../table/table"
          });
        } else if (e.statusCode == 200 && type == "bill") {
          if (e.data.flowAccount.length == 0) {
            wx.showToast({
              title: "所选时间无流水账记录",
              icon: "none"
            });
          } else {
            wx.setStorageSync("cashFlow", e.data);
            wx.navigateTo({
              url:
                "../BillInfo/Billinfo" +
                "?recordStartTime=" +
                recordST +
                "&recordEndTime=" +
                recordET +
                "&date=" +
                dateTemp
            });
          }
        } else {
          wx.showToast({
            title: e.data,
            icon: "none"
          });
        }
      },
      fail: function(e) {
        wx.hideLoading();
        wx.showToast({
          title: "查询失败",
          icon: "none"
        });
      }
    });
  },

  bindDateChange: function(e) {
    if (e.target.id == "recordStartTime") {
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
      recordStartTime: util.formatTime(new Date(), "yyyy-MM-dd"),
      recordEndTime: util.formatTime(new Date(), "yyyy-MM-dd")
    });
  },
  onLoad: function() {
    console.log("zhenDuan onLoad");
    var description = getApp().globalData.description;
    var similarity = getApp().globalData.similarity;
    console.log("description:" + description);
    console.log("similarity:" + similarity);
    this.setData({
      description: description,
      similarity: similarity
    });
    console.log("toFix2: " + (Number(this.data.similarity) * 100).toFixed(0));
    if (chart != null) {
      chart.setOption({
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: {
              formatter: "{value}%"
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0.3, "#67e0e3"],
                  [0.5, "#37a2da"],
                  [0.7, "#FF8800"],
                  [1, "#fd666d"]
                ]
              }
            },
            data: [
              {
                value: (Number(this.data.similarity) * 100).toFixed(0),
                name: "确诊几率"
              }
            ]
          }
        ]
      });
    }
  },

  onShow: function(e) {
    console.log("zhenDuan onShow");
    this.onLoad();
  }
});
