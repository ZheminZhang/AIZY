// pages/query/query.js
Page({
  data: {
    start_date: '2019-06-01',
    end_date: '2019-06-01',
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
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
})
