// pages/apply_list_1/apply_list.js
Page({
  data: {
    tabitemConsume: {},
    tabitemRecharge: {},
    activeTabId: null,
    currentTab: 0,
    grantorAutho: {},
    grantorUnautho: {},
    grantorUnauthoRefuse: {},

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  tabChange(e) {
    if (e.detail.source == "touch") {
      this.setActiveTab(e.detail.currentItemId);
    }
  },

  tabclick(e) {
    this.setActiveTab(e.target.id);
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

  /* 下拉刷新，自动监听 */
  onPullDownRefresh: function () {
    // Do something when pull down.
  },

  onReady: function () {
    /* 滑动动画相关 */
    var query = wx.createSelectorQuery().in(this),
      _this = this;
    _this.animation = wx.createAnimation({
      duration: 500,  //动画持续时间
      timingFunction: "ease",  //动画效果
    })
    query.select('#tabitemConsume').boundingClientRect(function (rect) {
      _this.setData({
        tabitemConsume: rect
      });
    })
    query.select('#tabitemRecharge').boundingClientRect(function (rect) {
      _this.setData({
        tabitemRecharge: rect
      });
      _this.setActiveTab('tabitemRecharge');
    })
    query.exec();

  },

  /* 加载页面 */
  onLoad: function () {
    this.setData({
      grantorUnautho: wx.getStorageSync('grantorUnautho'),
      grantorAutho: wx.getStorageSync('grantorAutho'),
      grantorUnauthoRefuse: wx.getStorageSync('grantorUnauthoRefuse')
    })
    console.log(grantorUnauthoRefuse);
  },
  msToDate: function (msec) {
    let datetime = new Date(msec * 1000);
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
  toDetail: function (e) {
    let index = e.currentTarget.id;
    let url_ = '../authorize/authorize?' + 'tp=' + e.target.dataset["tp"]
    if (e.target.dataset["tp"] == '1') {
      url_ = url_ +
        "&companyName=" + this.data.grantorUnautho[index].user +
        "&id=" + this.data.grantorUnautho[index].id +
        "&authStartTime=" + this.msToDate(this.data.grantorUnautho[index].authStartTime).withoutTime +
        "&authEndTime=" + this.msToDate(this.data.grantorUnautho[index].authEndTime).withoutTime +
        "&recordStartTime=" + this.msToDate(this.data.grantorUnautho[index].recordStartTime).withoutTime +
        "&recordEndTime=" + this.msToDate(this.data.grantorUnautho[index].recordEndTime).withoutTime +
        "&type=" + this.data.grantorUnautho[index].type + "&recordId=" + this.data.grantorUnautho[index].recordId;
    }
    else if (e.target.dataset["tp"] == '2') {
      url_ = url_ +
        "&companyName=" + this.data.grantorAutho[index].user +
        "&id=" + this.data.grantorAutho[index].id +
        "&authStartTime=" + this.msToDate(this.data.grantorAutho[index].authStartTime).withoutTime +
        "&authEndTime=" + this.msToDate(this.data.grantorAutho[index].authEndTime).withoutTime +
        "&recordStartTime=" + this.msToDate(this.data.grantorAutho[index].recordStartTime).withoutTime +
        "&recordEndTime=" + this.msToDate(this.data.grantorAutho[index].recordEndTime).withoutTime +
        "&type=" + this.data.grantorAutho[index].type + "&recordId=" + this.data.grantorAutho[index].recordId;
    }
    else if (e.target.dataset["tp"] == '3') {
      url_ = url_ +
        "&companyName=" + this.data.grantorUnauthoRefuse[index].user +
        "&id=" + this.data.grantorUnauthoRefuse[index].id +
        "&authStartTime=" + this.msToDate(this.data.grantorUnauthoRefuse[index].authStartTime).withoutTime +
        "&authEndTime=" + this.msToDate(this.data.grantorUnauthoRefuse[index].authEndTime).withoutTime +
        "&recordStartTime=" + this.msToDate(this.data.grantorUnauthoRefuse[index].recordStartTime).withoutTime +
        "&recordEndTime=" + this.msToDate(this.data.grantorUnauthoRefuse[index].recordEndTime).withoutTime +
        "&type=" + this.data.grantorUnauthoRefuse[index].type + "&recordId=" + this.data.grantorUnauthoRefuse[index].recordId;
    }
   
    console.log("这里开始");
    console.log(this.data.grantorUnautho);
    wx.navigateTo({
      url: url_,
      fail: function (e) {
        console.log(e)
      }
    })
  },
})