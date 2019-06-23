// pages/record-expend/record-expend.js
var util = require('../../utils/util.js')

Page({
  data: {
    navbar: ['支出', '收入'],
    currentTab: 0,
    money: 0.00,  //金额
    //id: 0,        //分类序号
    remarksText: "",//备注
    date: "",       //日期
    todayDate: "",
    //支出相关数据
    tabOut: [
      { 'id': 0, 'text': '餐饮', 'icon': "../../images/down-circle.png" },
      { 'id': 1, 'text': '娱乐', 'icon': "../../images/down-circle.png" },
      { 'id': 2, 'text': '转账', 'icon': "../../images/down-circle.png" },
      { 'id': 3, 'text': '购物', 'icon': "../../images/down-circle.png" },
      { 'id': 4, 'text': '电影', 'icon': "../../images/down-circle.png" },
      { 'id': 5, 'text': '出行', 'icon': "../../images/down-circle.png" },
      { 'id': 6, 'text': '理发', 'icon': "../../images/down-circle.png" },
      { 'id': 7, 'text': '红包', 'icon': "../../images/down-circle.png" }
    ],
    searchParam: [],
    selectName: "餐饮",//选择的消费方式
    selectImg: "../../images/down-circle.png",

    //收入相关数据
    in_tabOut: [
      { 'id': 0, 'text': '基金', 'icon': "../../images/down-circle.png" },
      { 'id': 1, 'text': '股票', 'icon': "../../images/down-circle.png" },
    ],
    in_searchParam: [],
    in_selectName: "基金",//选择的收入方式
    in_selectImg: "../../images/down-circle.png",


    showModalStatus: false  //是否显示分类弹窗
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  digitFunction: function (e) {
    this.setData({
      money: e.detail.value
    })
  },

  //选择时间
  onDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },

  //完成支出或者收入记录,将结果存入storage
  confirmData: function () {
    var that = this;
    if (parseFloat(that.data.money) <= 0) {
      wx.showToast({
        title: '请输入金额',
        icon:'none',
        duration: 1500
      });
      return;
    }

    //支出记录
    if (that.data.currentTab == 0) {
      let value = [];
      try {
        value = wx.getStorageSync('Bill_Out')
      } catch (e) {
      }
      if (value == "") {
        value = [];
      }
      let json =
      {
        date: that.data.date,
        money: that.data.money,
        remarks: that.data.remarksText,
        spendWay: that.data.selectName,
      };
      value.push(json);
      try {
        wx.setStorageSync('Bill_Out', value)
      } catch (e) {
      }
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
      });
    }
    //收入记录
    else if (that.data.currentTab == 1) {
      let value = [];
      try {
        value = wx.getStorageSync('Bill_In')
      } catch (e) {
      }
      if (value == "") {
        value = [];
      }
      let json =
      {
        date: that.data.date,
        money: that.data.money,
        remarks: that.data.remarksText,
        incomeWay: that.data.in_selectName,
      };
      value.push(json);
      try {
        wx.setStorageSync('Bill_In', value)
      } catch (e) {
      }
      wx.showToast({
        title: '记账成功',
        icon: 'success',
        duration: 500,
        //记账成功则调用该函数
        success: function () {
          // setTimeout(function () {
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 500)
        }
      });
    }
  },

  //支付分类列表中，类别按钮触发事件
  click_list: function (e) {
    console.log(e.currentTarget.dataset.index);
    var id = e.currentTarget.dataset.index;
    this.setData({
      selectName: this.data.tabOut[id].text,
      selectImg: this.data.tabOut[id].icon,
      showModalStatus: false
    })
  },
  //收入分类列表中，类别按钮触发事件
  in_click_list: function (e) {
    console.log(e.currentTarget.dataset.index);
    var id = e.currentTarget.dataset.index;
    this.setData({
      in_selectName: this.data.in_tabOut[id].text,
      in_selectImg: this.data.in_tabOut[id].icon,
      showModalStatus: false
    })
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 100,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 100)
    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },



  onLoad: function (options) {
    // 页面加载 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面初次渲染完成
    this.setData({
      date: util.formatTime(new Date(), "yyyy-MM-dd"),
      todayDate: util.formatTime(new Date(), "yyyy-MM-dd"),
    });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面卸载
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

