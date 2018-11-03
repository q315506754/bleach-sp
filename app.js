 import cof from "./config"

//app.js
App({
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  onLaunch: function (opts) {
    console.log('App Launch', opts)
    console.log(cof);
  },
  globalData: {
    userInfo: null
  }
})