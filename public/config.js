const hostname = window.location.hostname
const config = {
  tdtUrl: 'https://t{s}.tianditu.gov.cn/', // 服务域名
  whiteModel: './dongyangBuilding/tileset.json', // 白膜,
  RoadUrl: './dongyangRoad.json', // 道路
  RiverUrl: './dongyangRiver.json', // 东阳江
  tdtMap: [{
    url: 'https://ditu.zjzwfw.gov.cn:443/services/wmts/imgmap/default/oss',
    text: '影像地图'
  },
  {
    url: 'https://ditu.zjzwfw.gov.cn:443/mapserver/vmap/WMTS/1.0/zjvmap/tdt_biaozhunyangshi_2017',
    text: '科技版地图'
  },
  {
    url: 'https://ditu.zjzwfw.gov.cn:443/services/wmts/imgmap_lab/default/oss',
    text: '地图注记'
  }
    // {
    //   url: 'https://ditu.zjzwfw.gov.cn:443/mapserver/label/WMTS/1.0/zjvmap/tdt_biaozhunyangshi_2017',
    //   text: '标准版注记'
    // },
    // {
    //   url: 'https://ditu.zjzwfw.gov.cn:443/mapserver/vmap/WMTS/1.0/zjvmap/tdt_qingxinyangshi_2017',
    //   text: '清新版地图'
    // },
    // {
    //   url: 'https://ditu.zjzwfw.gov.cn:443/mapserver/label/WMTS/1.0/zjvmap/tdt_qingxinyangshi_2017',
    //   text: '清新版注记'
    // },
    // {
    //   url: 'https://ditu.zjzwfw.gov.cn:443/mapserver/vmap/WMTS/1.0/zjvmap/tdt_kejiganyangshi_2017',
    //   text: '科技版地图'
    // },
    // {
    //   url: 'https://ditu.zjzwfw.gov.cn:443/mapserver/label/WMTS/1.0/zjvmap/tdt_kejiganyangshi_2017',
    //   text: '科技版注记'
    // },
    // {
    //   url: 'https://ditu.zjzwfw.gov.cn:443/services/wmts/yangpijuan/default/oss',
    //   text: '羊皮卷版地图'
    // }
  ],
  nginxTMap: [{
    url: `http://${hostname}:9006/{z}/{y}/{x}.png`,
    text: '影像地图'
  },
  {
    url: `http://${hostname}:9008/{z}/{y}/{x}.png`,
    text: '科技版地图'
  },
  {
    url: `http://${hostname}:9007/{z}/{y}/{x}.png`,
    text: '地图注记'
  }
  ],
  diKuaiArr: [{
    label: '批而未供',
    url: './dikuai/批而未供.json'
  },
  {
    label: '批而未供（1999-2022）',
    url: './dikuai/批而未供1999-2022.json'
  }, {
    label: '闲置',
    url: './dikuai/闲置.json'
  }, {
    label: '已供已用',
    url: './dikuai/已供已用.json'
  },
  {
    label: '低效用地',
    url: './dikuai/test低效用地.json'
  },
  {
    label: '供而未用t',
    url: './dikuai/test供而未用t.json'
  }
  ],
  wuhanMap: [{
    url: 'http://t{s}.tianditu.gov.cn/img_w',
    layer: 'img_w'
  }
  ]
}
export default config
