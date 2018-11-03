import cof from "../../config"

Page({
  onLoad() {
    console.log('aaaa')
  },
  onShareAppMessage() {
    return {
      title: cof.title,
      path: 'pages/tools/index'
    }
  },
  
});