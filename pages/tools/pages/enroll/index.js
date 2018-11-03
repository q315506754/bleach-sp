import cof from "../../../../config"

const treasure = [
  { jifen:100 ,award:5}
  ,{ jifen:300, award: 10 }
  , { jifen: 500, award: 10 }
  , { jifen: 800, award: 10 }
  , { jifen: 1200, award: 10 }
  , { jifen: 1500, award: 15 }
  , { jifen: 1800, award: 15 }
  , { jifen: 2300, award: 15 }
  , { jifen: 2800, award: 15 }
]

const levlup = [
   { reach: 180, star: 4,hole:0 }
  , { reach: 330, star: 5, hole: 0 }
  , { reach: 530, star: 6, hole: 0 }
  , { reach: 830, star: 7, hole: 0 }
]

function cacuArray(costPerTime,fragPerHun) {
  let ret = [];

  let jifenFactor=10;
  let fragFactor = fragPerHun / 100.0;

  let times = 0;
  let fragCount=0;
  let bonus = 0;

  let teaIdx = 0;
  let levlupIdx = 0;
  const maxTeaIdx = treasure.length;
  const maxLevlupIdx = levlup.length;
  while (times < 10000000 && (teaIdx < maxTeaIdx || levlupIdx < maxLevlupIdx)){
    times++;

    var jifen = times * jifenFactor;
    var frag = parseInt(times * fragFactor) + bonus;
    var costHun = times * costPerTime;

    while (teaIdx < maxTeaIdx && jifen >= treasure[teaIdx].jifen ){
      bonus += treasure[teaIdx].award;
      frag += treasure[teaIdx].award;
      ret.push({
        event: treasure[teaIdx].jifen + "积分宝箱+" + treasure[teaIdx].award,
        frag: frag,
        cost: costHun,
        times
      });

      teaIdx++;
    }

    while (levlupIdx < maxLevlupIdx && frag >= levlup[levlupIdx].reach) {
      ret.push({
        event: "达到" + levlup[levlupIdx].star + "星",
        frag: frag,
        cost: costHun,
        times
      });

      levlupIdx++;
    }

  }

  return ret;
}

Page({
  onLoad() {
    console.log('enroll...')

    this.setData(wx.getStorageSync('enroll') || {})

    //clear
    // this.setData({
    //   listData: []
    // });
  },
  data: {
    eachPrice: 270,
    fragNum: 80,
    listData:[]
  },
  bindKeyInput(e) {
    console.log(e)

    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  onShareAppMessage() {
    return {
      title: cof.title,
      path: '/pages/tools/index'
    }
  },
  calc(){
    if (isNaN(this.data.eachPrice) || isNaN(this.data.fragNum) ){
      wx.showToast({
        title: '请输入数字',
        icon: 'none',
        duration: 1000,
      })
      return;
    } 
    if (this.data.eachPrice < 0 || this.data.fragNum<0) {
      wx.showToast({
        title: '这我可算不出来',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    // this.data.listData =[];
    wx.showToast({
      title: '计算中...',
      icon: 'loading',
      duration: 100,
    })
    
    console.log(this.data)
    
    var arr  = cacuArray(this.data.eachPrice, this.data.fragNum)
    console.log(arr);
    

    var $this = this;

    $this.setData({
      listData: []
    });

    wx.setStorageSync('enroll', this.data);
    
    setTimeout(function(){
      $this.setData({
        listData: arr
      });
    },300);

    

    // this.data.listData.
    // this.data.listData = arr;
  }
});