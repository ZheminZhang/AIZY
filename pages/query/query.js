// pages/query/query.js
const api = require('../../config/config.js');
Page({
  data: {
    disabled_name: false,
    start_date: '2019-06-01',
    end_date: '2019-06-01',
    begin: '2000-06-01',
    end: '2100-06-01',
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
 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    wx.request({
      url: api.queryUrl,
      //url: 'http://127.0.0.1:80/api/analysis/analysis',
      data: {
        "token": "xx",
        "name": 1,
        "start_date": this.data.start_date,
        "end_date": this.data.end_date,
        "types": JSON.stringify([1,2]),
        'text': '购买书籍100'
      },
      success: function (e) {
        console.log(e);
      },
      fail: function (e) {
        console.log(e);
      }
    })
  },

  bindDateChange: function (e) {
    if(e.target.id == 'start_date'){
      this.setData({
        start_date: e.detail.value
      })
    }
    else if (e.target.id == 'end_date'){
      this.setData({
        end_date: e.detail.value
      })
    }
  },
  click_bill_0:function(e){
    var id = e.currentTarget.dataset.index;
    var it = 'tabOut['+id+'].done';
    if(this.data.tabOut[id].done){
      this.setData({
        [it]: false,
      });
    }
    else{
      this.setData({
        [it]: true,
      });
    }
    console.log(this.data);
  },
  click_cancel0:function(e){
    var id = e.currentTarget.dataset.index;
    var it = 'tabOut[' + id + '].done';
    this.setData({
      [it]: false,
    });
  },
  click_bill_1: function (e) {
    var id = e.currentTarget.dataset.index;
    var it = 'in_tabOut[' + id + '].done';
    if (this.data.in_tabOut[id].done) {
      this.setData({
        [it]: false,
      });
    }
    else {
      this.setData({
        [it]: true,
      });
    }
  },
  click_cancel1: function (e) {
    var id = e.currentTarget.dataset.index;
    var it = 'in_tabOut[' + id + '].done';
    this.setData({
      [it]: false,
    });
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
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
            showModalStatus: false,
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
        }
      );
    }
  }
})
