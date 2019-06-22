var temp = {
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
}
export default temp;