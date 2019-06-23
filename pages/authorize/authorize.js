// pages/authorize/authorize.js
Page({
  data: {
    disabled_name: true,
    id:-1,
    start_date: '2019-06-01',
    end_date: '2019-06-01',
    begin: '2000-06-01',
    end: '2100-06-01',
  },
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
  // -------------------------------
  // 加载url中的参数
  // -------------------------------
  onLoad: function (options) {
    //var that = this
    var id_ = JSON.parse(options.id);
    console.log(id_);
    this.setData({
      id: id_,
    })
  }
})