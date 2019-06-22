// pages/query/query.js
Page({
  data: {
    item: {
      disabled_name: false,
      start_date: '2019-06-01',
      end_date: '2019-06-01',
      begin: '2019-06-01',
      end: '2019-06-01',
    }
  },
  onLoad: function () {
    var tampData = this.data.item;
    // ----------------------------
    console.log(tampData);
    tampData.bindDateChange = "bindDateChange";
    this.setData({ item: tampData })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
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
