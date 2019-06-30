Page({
  data: {
    incomeData: [
        {text:'一、营业收入',money:'none'},
        { text: "营业收入", money: 0 },
        { text: "营业成本", money: 0 },
        { text: "税金及附加", money: 0 },
        { text: "销售费用", money: 0 },
        { text: "管理费用", money: 0 },
        { text: "财务费用", money: 0 },
        { text: "资产减值损失", money: 0 },
        { text: "公允价值变动收益", money: 0 },
        { text: "净利润", money: 0 },
        { text: "净敞口套期收益", money: 0 },
        { text: "投资收益", money: 0 },
        { text: "对联营企业和合营企业的投资收益", money: 0 },
        { text: "资产处置收益", money: 0 },
        { text: "其他收益", money: 0 },
        {text: '二、营业利润',money:'none'},
        { text: "营业外收入", money: 0 },
        { text: "营业外支出", money: 0 },
        {text: '三、利润总额',money:'none'},
        {text: "利润总额", money: 0 },
        { text: "所得税费用", money: 0 },
        {text: '净利润', money:'none'},
        { text: "持续经营净利润", money: 0 },
        { text: "终止经营净利润", money: 0 },
        {text: '五、其他综合收益的税后净额', money:'none'},
        { text: "以后不能重分类进损益的其他综合收益", money: 0 },
        { text: "权益法下在被投资单位不能重分类进损益的其他综合收益中享有的份额", money: 0 },
        { text: "权益法下在被投资单位以后将重分类进损益的其他综合收益中享有的份额", money: 0 },
        { text: "其他债权投资公允价值变动损益", money: 0 },
        { text: "金融资产重分类进损益的累计利得或损失", money: 0 },
        { text: "现金流量套期损益的有效部分", money: 0 },
        { text: " 外币财务报表折算差额", money: 0 },
        { text: '六、综合收益总额', money:'none'},
        { text: "综合收益总额", money: 0 },
        { text: '七、每股收益：', money:'none'},
        { text: "基本每股收益", money: 0 },
        { text: "基本每股收益", money: 0 }],
    cashData:[
      {text:'一、经营活动产生的现金流量：',
      data:[
        { text:'销售商品、提供劳务收到的现金',money:0},
        { text: '收到的税费返还', money: 0 },
        { text: '收到其他与经营活动有关的现金', money: 0 },
        { text: '经营活动现金流入小计', money: 0 },
        { text: '购买商品、接受劳务支付的现金', money: 0 },
        { text: '支付给职工以及为职工支付的现金', money: 0 },
        { text: '支付的各项税费', money: 0 },
        { text: '支付其他与经营活动有关的现金', money: 0 },
        { text: '经营活动现金流出小计', money: 0 },
        { text: '经营活动产生的现金流量净额', money: 0 },
      ]
      }, { text:'二、投资活动产生的现金流量净额：',
      data:[
        { text:'收回投资收到的现金',money:0},
        { text: '取得投资收益收到的现金', money: 0 },
        { text: '处置固定资产、无形资产和其他长期资产收回的现金净额', money: 0 },
        { text: '处置子公司及其他营业单位收到的现金净额', money: 0 },
        { text: '收到其他与投资活动有关的现金', money: 0 },
        { text: '投资活动现金流入小计', money: 0 },
        { text: '构建固定资产、无形资产和其他长期资产支付的现金', money: 0 },
        { text: '投资支付的现金', money: 0 },
        { text: '取得子公司及其他营业单位支付的现金净额', money: 0 },
        { text: '支付其他与投资活动有关的现金', money: 0 },
        { text: '投资活动现金流出小计', money: 0 },
        { text: '投资活动产生的现金流量净额', money: 0 },
      ]},
      { text:'三、筹资活动产生的现金流量',data:[
        { text:'吸收投资收到的现金',money:0},
        { text: '取得借款收到的现金', money: 0 },
        { text: '收到其他与筹资活动有关的现金', money: 0 },
        { text: '筹资活动现金流入小计', money: 0 },
        { text: '偿还债务支付的现金', money: 0 },
        { text: '分配股利、利润或偿付利息支付的现金', money: 0 },
        { text: '支付其他与筹资活动有关的现金', money: 0 },
        { text: '筹资活动现金流出小计', money: 0 }, 
        { text: '筹资活动产生的现金流量净额', money: 0 },
      ]},
      { text: '四、汇率变动对现金及现金等价物的影响', data:[]},
      { text: '五、现金及现金等价物净增加额', data: [{ text:'期初现金及现金等价物余额',money:'0'}]},
      { text:'六、期末现金及现金等价物余额',data:[]},
    ],
    activeTabId: null,
  },
  onLoad: function () {
    console.log('加载数据');
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
