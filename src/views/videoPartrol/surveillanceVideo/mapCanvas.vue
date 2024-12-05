<template>
    <div id="cesiumContainer3"></div>
  </template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import mapHelper from '@/utils/mapHelper'
import $bus from '@/utils/eventBus.js'
let viewer3
onMounted(async () => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNzllMzc4OC04NzJlLTQ5YWUtYTI2ZS0zMGJkNzY1NjY2MjgiLCJpZCI6MTU1OTQ2LCJpYXQiOjE2OTAxNjI1MzR9.EpxAH6g1sB54cvU90aPHXcJDGDHVAlhoQ1_NJD4AL5M';
  viewer3 = new Cesium.Viewer('cesiumContainer3', {
    infoBox: false,
    mageryProvider: false, // 首先要禁用默认的影像服务提供商
    baseLayerPicker: false, // 不显示底图选择控件
    geocoder: false, // 不显示查询控件
    homeButton: false, // 不显示Home按钮
    sceneModePicker: false, // 不显示场景模式选择控件
    timeline: false, // 不显示时间轴
    navigationHelpButton: false, // 不显示帮助按钮
    animation: false, // 不显示动画控件
    fullscreenButton: false, // 不显示全屏按钮
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        preserveDrawingBuffer: true,
        alpha: true
      }
    }
  })
  viewer3.imageryLayers.get(0).show = false
  viewer3._cesiumWidget._creditContainer.style.display = 'none'
  viewer3.scene.screenSpaceCameraController.enableDoubleClickZoom = false
  viewer3.scene.globe.depthTestAgainstTerrain = true
  //   viewer3.scene.debugShowFramesPerSecond = true // 显示帧率

  viewer3.scene.skyAtmosphere.show = false
  viewer3.scene.backgroundColor = Cesium.Color.TRANSPARENT
  viewer3.scene.globe.baseColor = Cesium.Color.TRANSPARENT
  viewer3.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG]
  viewer3.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH]

  viewer3.scene.skyBox.show = false // 去掉天空盒子

  // 地球半透明表面
  viewer3.scene.globe.translucency.enabled = true
  // 禁用地下着色
  viewer3.scene.globe.undergroundColor = undefined
  // 地球上地面大气
  viewer3.scene.globe.showGroundAtmosphere = false
  // 设置地球的颜色
  // 隐藏太阳
  viewer3.scene.globe.enableLighting = false
  viewer3.shadows = false
  viewer3.scene.sun.destroy()// 还可以viewer3.scene.sun.destroy();
  // 月亮
  viewer3.scene.moon.show = false
  // 大气
  viewer3.scene.skyAtmosphere.show = false
  // 雾
  viewer3.scene.fog.enable = false

  const getFlyAnimation = () => {
    // 线上
    // const lon = 120.27031535282909
    // const lat = 29.3578136178452
    // const alt = 7813.0080677558435
    // const heading = 196.45181976378657
    // const pitch = -36.603353251204446
    // const roll = 0
    // 武汉本地
    const lon = 114.30412525860815
    const lat = 30.56632280215591
    const alt = 119.13496641327043
    const heading = 118.02696379628658
    const pitch = -80.9790666882754
    const roll = 0
    mapHelper.flyToByCameraInfo([lon, lat, alt, heading, pitch, roll], null, viewer3)

    // 设置相机的方位，只需要设置经度和纬度
    // const center = Cesium.Cartesian3.fromDegrees(114.30412525860815, 30.56632280215591)
    // // 设置水平旋转视口方向的角度
    // const heading = Cesium.Math.toRadians(196.45181976378657)
    // // 设置垂直旋转视口方向的角度
    // const pitch = Cesium.Math.toRadians(-36.603353251204446)
    // // 设置距离目标点的距离
    // const range = 7813.0080677558435
    // // 第一个是目标位置信息，第二个是视口方向信息
    // viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range))
  }

  getFlyAnimation()

  // 天地图
  const addTdTmapMap = () => {
    const tk = '6494f057-b0b0-4ca4-a7c1-b8e306922406';
    const imageryLayerCollection = viewer3.imageryLayers
    const tdtUrl = config.tdtMap[0].url
    const baseLayer = mapHelper.createBaseMapProvider(
              `${tdtUrl}?request=GetTile&token=${tk}&service=wmts&REQUEST=GetTile&VERSION=1.0.0&LAYER=vmap&STYLE=default&TILEMATRIXSET=esritilematirx&TILEMATRIX={mz}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpgpng`
    )
    const imageLayer = imageryLayerCollection.addImageryProvider(baseLayer)
    imageLayer.alpha = 0
  }
  // 加载地块
  const addXZQPolygon = () => {
    const diKuaiArr = [
      {
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
        label: '供而未用',
        url: './dikuai/test供而未用t.json'
      }

    ]
    diKuaiArr.forEach((item, index) => {
      const roadpolygon = Cesium.GeoJsonDataSource.load(
        item.url,
        { clampToGround: true }
      )
      roadpolygon
        .then(dataSource => {
          viewer3.dataSources.add(dataSource).then(t => {
            t.show = true
          })
          const entities = dataSource.entities.values
          for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            entity.polygon.material = Cesium.Color.fromCssColorString('red')
            entity.polygon.fill = false
            entity.polygon.outline = true
            entity.polygon.outlineColor = Cesium.Color.fromCssColorString('red')
          }
          dataSource.name = item.label
        })
    })
  }
  const addWuHanRoad = () => {
    const query = [
      {
        coord: [
          {
            x: -2262372.7972836364,
            y: 5009475.838910293,
            z: 3224496.802620326
          },
          {
            x: -2262418.492852176,
            y: 5009467.088259813,
            z: 3224478.459643346
          },
          {
            x: -2262412.6179077146,
            y: 5009481.811809591,
            z: 3224459.833042279
          },
          {
            x: -2262369.853983217,
            y: 5009487.635413933,
            z: 3224480.649824603
          },
          {
            x: -2262372.7972836364,
            y: 5009475.838910293,
            z: 3224496.802620326
          }
        ],
        id: 1,
        name: '大酒店'
      },
      {
        coord: [
          {
            x: -2262336.96475389,
            y: 5009471.692151921,
            z: 3224528.173944647
          },
          {
            x: -2262331.9593492514,
            y: 5009483.1019902,
            z: 3224514.055072556
          },
          {
            x: -2262327.5302041583,
            y: 5009484.853865259,
            z: 3224514.43834502
          },
          {
            x: -2262332.699268017,
            y: 5009472.821954266,
            z: 3224529.403126277
          },
          {
            x: -2262332.699268017,
            y: 5009472.821954266,
            z: 3224529.403126278
          },
          {
            x: -2262334.894932123,
            y: 5009472.164410742,
            z: 3224528.887647394
          },
          {
            x: -2262336.96475389,
            y: 5009471.692151921,
            z: 3224528.173944647
          }
        ],
        id: 2,
        name: '农业银行'
      }
    ]

    query.forEach(item => {
      const entityImg = new Cesium.Entity({
        polygon: {
          hierarchy: item.coord,
          outline: true,
          fill: false,
          outlineColor: Cesium.Color.fromCssColorString('red'),
          material: Cesium.Color.fromCssColorString('red')
        },
        id: 'testLand' + item.id
      })
      viewer3.entities.add(entityImg)
    })
  }
  //   addXZQPolygon()
  addWuHanRoad()
  addTdTmapMap()
})

onBeforeUnmount(() => {
  let gl = viewer3.scene.context._originalGLContext
  gl.canvas.width = 1
  gl.canvas.height = 1
  viewer3.destroy() // 销毁viewer3实例
  gl.getExtension('WEBGL_lose_context').loseContext()
  gl = null
  const cesiumContainer3 = document.getElementById('cesiumContainer3')
  if (cesiumContainer3) cesiumContainer3.remove()
})
</script>

  <style lang="less" scoped>
  #cesiumContainer3 {
    width: 400px;
    height: 325px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0); /* 背景透明 */
    // pointer-events: none;
  }
  </style>
