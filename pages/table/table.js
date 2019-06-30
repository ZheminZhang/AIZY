Page({
  data: {
    incomeData: [
      //{ text:"营业收入",money:0},
      //{ text: "营业成本", money: 0 },
      //{text: "税金及附加", money: 0 },
      //{text: "销售费用", money: 0 },
      //{ text: "管理费用", money: 0 },
      //{ text: "财务费用", money: 1222200000000 },
      //{ text: "资产减值损失", money: 0 },
      { text: "公允价值变动收益", money: 0 },
      {text:"净利润",money:0},
      { text: "净敞口套期收益", money: 0 },
      { text: "投资收益", money: 0 },
      { text: "对联营企业和合营企业的投资收益", money: 0 },
      { text: "资产处置收益", money: 0 },
      { text: "其他收益", money: 0 },
      { text: "营业外收入", money: 0 },
      { text: "营业外支出", money: 0 },
      { text: "利润总额", money: 0 },
      { text: "持续经营净利润", money: 0 },
      { text: "终止经营净利润", money: 0 },
      //{ text: "以后不能重分类进损益的其他综合收益", money: 0 },
      //{ text: "权益法下在被投资单位不能重分类进损益的其他综合收益中享有的份额", money: 0 },
      //{ text: "权益法下在被投资单位以后将重分类进损益的其他综合收益中享有的份额", money: 0 },
      { text: "其他债权投资公允价值变动损益", money: 0 },
      { text: "金融资产重分类进损益的累计利得或损失", money: 0 },
      { text: "现金流量套期损益的有效部分", money: 0 },
      { text: " 外币财务报表折算差额", money: 0 },
      { text: "综合收益总额", money: 0 },
      { text: "基本每股收益", money: 0 },
      { text: "基本每股收益", money: 0 },
    ],
    activeTabId: null,
  },
  onLoad: function () {
    console.log('onLoad')
  },
  onReady:function(){
    var query = wx.createSelectorQuery().in(this),
      _this = this;
    _this.animation = wx.createAnimation({
      duration: 500,  //动画持续时间
      timingFunction: "ease",  //动画效果
    })
    query.select('#tabitemDebit').boundingClientRect(function (rect) {
      _this.setData({
        tabitemDebit: rect
      });
    })
    query.select('#tabitemCash').boundingClientRect(function (rect) {
      _this.setData({
        tabitemCash: rect
      });
    })
    query.select('#tabitemProfit').boundingClientRect(function (rect) {
      _this.setData({
        tabitemProfit: rect
      });
      _this.setActiveTab('tabitemProfit');
    })
    query.exec();
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
})
