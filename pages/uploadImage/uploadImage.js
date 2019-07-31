const sourceType = [
  ['camera'],
  ['album'],
  ['camera', 'album']
]
const sizeType = [
  ['compressed'],
  ['original'],
  ['compressed', 'original']
]

Page({
  //设置分享
  // onShareAppMessage() {
  //   return {
  //     title: '图片',
  //     path: 'page/API/pages/image/image'
  //   }
  // },

  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  onLoad: function(options) {
    var imageList = [];
    console.log(options.filePath);
    if (options.filePath) {
      imageList[0] = options.filePath;
      this.setData({
        imageList: imageList
      })
    }
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  upload: function() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      filePath: this.data.imageList[0],
      activeTabId: 'tabitemForm',
      isClick: true,
    })
    prevPage.setActiveTab('tabitemForm');
    console.log("-------####");
    wx.navigateBack({
      delta: 1,
    })
  }
})