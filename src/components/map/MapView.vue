<template>
  <div id="cesiumContainer"></div>
  <Loader :showLoader="state.isshowloading" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { modifyMap } from '@/utils/colorMap'
import RoadThroughLine from '@/utils/roadThrough.js'
// import SkyBoxOnGround from '@/utils/skybox_nearground'
import EventManager from '@/utils/CesiumHandler/EventManager'
import Loader from '@/components/Loader.vue'
import { computeCentroid } from '@/utils/utils'
import mapHelper from '@/utils/mapHelper'
import { useStore } from 'vuex'
import $bus from '@/utils/eventBus.js'
const { state, commit } = useStore()
const loadingTimer = ref(null)
const flyTimer = ref(null)
let viewer, building, building2, waterPrimitive, roadSource, XZQPolylineSource, defaultSources
onMounted(async () => {
  initViewer()
  // 暗色地图
  // modifyMap(viewer, {
  //   invertColor: true, // 反色?
  //   filterRGB: [60, 145, 172]// 滤镜值
  // })
  $bus.on('showMapLayer', (param) => {
    if (param.label === '地图注记' || !param.show) return
    viewer.imageryLayers.removeAll()
    // viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources = defaultSources.slice()
    // viewer.entities.removeAll()
    // viewer.imageryLayers.removeAll()
    // viewer.dataSources.removeAll()
    // viewer.scene.primitives.removeAll()
    // viewer.destroy() // 销毁Viewer实例
    // initViewer()
    if (param.label === '影像地图') {
      NginxTdtMap('影像')
    } else {
      // 暗色地图
      NginxTdtMap()
      // modifyMap(viewer, {
      //   invertColor: true, // 反色?
      //   filterRGB: [60, 145, 172]// 滤镜值
      // })
    }
  })
  $bus.on('showBuilding', (param) => {
    switch (param.label) {
      case '白膜': {
        building.show = param.show
        building2.show = param.show
        break
      }
      case '东阳江': {
        waterPrimitive.show = param.show
        break
      }
      case '道路': {
        roadSource.show = param.show
        break
      }
      case '行政区': {
        XZQPolylineSource.show = param.show
        break
      }
      default:
        break
    }
  })
})
// 初始化Cesium
const initViewer = async () => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNzllMzc4OC04NzJlLTQ5YWUtYTI2ZS0zMGJkNzY1NjY2MjgiLCJpZCI6MTU1OTQ2LCJpYXQiOjE2OTAxNjI1MzR9.EpxAH6g1sB54cvU90aPHXcJDGDHVAlhoQ1_NJD4AL5M'
  viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    mageryProvider: false, // 首先要禁用默认的影像服务提供商
    // baseLayerPicker: false, // 不显示底图选择控件
    baseLayerPicker: false, // 不显示底图选择控件
    geocoder: false, // 不显示查询控件
    homeButton: false, // 不显示Home按钮
    sceneModePicker: false, // 不显示场景模式选择控件
    timeline: false, // 不显示时间轴
    navigationHelpButton: false, // 不显示帮助按钮
    animation: false, // 不显示动画控件
    fullscreenButton: false, // 不显示全屏按钮
    contextOptions: {
      webgl: {
        preserveDrawingBuffer: true
      }
      // requestWebgl1: true
    }
  })
  viewer.imageryLayers.get(0).show = false
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  )
  viewer.eventManager = new EventManager(viewer)
  viewer._cesiumWidget._creditContainer.style.display = 'none'
  viewer.scene.screenSpaceCameraController.enableDoubleClickZoom = false
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.debugShowFramesPerSecond = true
  viewer.scene.globe.baseColor = Cesium.Color.fromBytes(60, 145, 172, 0) // 修改地图蓝色背景
  // viewer.scene.globe.baseColor = new Cesium.Color(0, 40 / 255, 102 / 255)
  viewer.eventManager.addEventListener('CLICK', leftClick, false)
  viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG]
  viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH]
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 151655 // 最大缩放高度（米）
  defaultSources = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources.slice()
  window.viewer = viewer
  roadSource = new Cesium.GeoJsonDataSource()
  XZQPolylineSource = new Cesium.GeoJsonDataSource()
  // addWuHanMap()
  // addWuHanRoad()
  // addTdTmapMap()
  NginxTdtMap()
  getFlyAnimation()
  addXZQ()
  addXZQPolygon()
  // onStartEntity()
  // await load3Dtiles(config.whiteModel)
  // await initWater()
  // await initEvent()
  console.log(process.env.NODE_ENV, '--process.env.NODE_ENV ')
  if (process.env.NODE_ENV === 'development') return // 本地环境不加载白膜
  commit('isshowloading', true)
  loadingTimer.value = setTimeout(() => {
    commit('isshowloading', false)
  }, 8000)
  onStartEntity()
  await load3Dtiles(config.whiteModel)
  await initWater()
  await initEvent()
}

// Cesium 点击事件
const leftClick = (e) => {
  const position = viewer.scene.pickPosition(e.message.position)
  if (position) {
    const lonLat = mapHelper.worldToLonlat(position)
    console.log(lonLat, '--lonLat')
    console.log(
      '--cameraInfo',
      mapHelper.getCurrentCameraInfo(viewer.camera)
    )
  }
}
const getFlyAnimation = () => {
  // const origin = Cesium.Cartesian3.fromDegrees(114.317048, 30.570564, 1000)
  // viewer.camera.flyTo({
  //   destination: origin
  // })
  // return

  const Position1 = Cesium.Cartesian3.fromDegrees(
    120.36872944108877,
    29.024394123255817,
    316972.42644944874
  )
  const Position2 = Cesium.Cartesian3.fromDegrees(
    120.27070608173307,
    28.690289465825668,
    80876.22942935432
  )

  const Position3 = Cesium.Cartesian3.fromDegrees(
    120.23748002834792,
    29.26538320172093,
    516.2681485911023
  )
  if (process.env.NODE_ENV === 'development') {
    viewer.camera.setView({
      destination: Position2,
      orientation: {
        heading: Cesium.Math.toRadians(7.973339967645401),
        pitch: Cesium.Math.toRadians(-53.375383485907435),
        roll: Cesium.Math.toRadians(0)
      }
    })
  } else {
    flyTimer.value = setTimeout(() => {
      viewer.camera.flyTo({
        destination: Position1,
        orientation: {
          heading: Cesium.Math.toRadians(194.44648077420322), // 水平方向(东南西北)
          pitch: Cesium.Math.toRadians(-85.88781668720468), // 垂直方向
          roll: Cesium.Math.toRadians(0.019328548644907108) //
        },
        duration: 2,
        complete: function () {
          viewer.camera.flyTo({
            destination: Position2,
            orientation: {
              heading: Cesium.Math.toRadians(7.973339967645401),
              pitch: Cesium.Math.toRadians(-53.375383485907435),
              roll: Cesium.Math.toRadians(0)
            },
            duration: 4,
            complete: function () {
              viewer.camera.flyTo({
                destination: Position3,
                orientation: {
                  heading: Cesium.Math.toRadians(20.72978326571022), // 水平方向(东南西北)
                  pitch: Cesium.Math.toRadians(-10.771752637054783), // 垂直方向
                  roll: Cesium.Math.toRadians(0) //
                },
                duration: 4,
                complete: function () {
                }
              })
            }
          })
        }
      })
    }, 8000)
  }
}
// 行政区线地图加载
const addXZQ = () => {
  const roadLine1 = Cesium.GeoJsonDataSource.load(
    './东阳市乡镇边界.json',
    { clampToGround: true }
  )
  roadLine1
    .then(dataSource => {
      const line1 = dataSource.entities.values
      for (let i = 0; i < line1.length; i++) {
        const line = line1[i]
        const positions = line.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
        const centerLonLat = computeCentroid(positions)
        const xzqLineEntity = new Cesium.Entity({
          polyline: {
            positions: positions,
            width: 5,
            clampToGround: true,
            material: new Cesium.PolylineGlowMaterialProperty({
              // 设置Glow材质
              glowPower: 0.1,
              color: Cesium.Color.fromCssColorString('#1039ff')
            })
          }
        })
        XZQPolylineSource.entities.add(xzqLineEntity)
        const xzqLabelEntity = new Cesium.Entity({
          position: Cesium.Cartesian3.fromDegrees(centerLonLat[0], centerLonLat[1], 40),
          id: 'xzq' + line.name,
          label: {
            text: line.name,
            font: '24px sans-serif',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 4,
            // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // 设置文字的偏移量
            pixelOffset: new Cesium.Cartesian2(0, -20),
            // 设置文字的显示位置,LEFT /RIGHT /CENTER
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            // 设置文字的显示位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 250000) // 可视缩放距离范围
          }
        })
        XZQPolylineSource.entities.add(xzqLabelEntity)
      }
      XZQPolylineSource.name = '行政区线'
      viewer.dataSources.add(XZQPolylineSource)
    })
}
// 天地图
const addTdTmapMap = (type) => {
  const treeData = state.treeData
  const tk = '6494f057-b0b0-4ca4-a7c1-b8e306922406'
  const imageryLayerCollection = viewer.imageryLayers
  const tdtMapData = config.tdtMap
  treeData.forEach(item => {
    if (item.label === '底图') {
      tdtMapData.forEach((cItem, cIndex) => {
        const baseLayer = mapHelper.createBaseMapProvider(
            `${cItem.url}?request=GetTile&token=${tk}&service=wmts&REQUEST=GetTile&VERSION=1.0.0&LAYER=vmap&STYLE=default&TILEMATRIXSET=esritilematirx&TILEMATRIX={mz}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpgpng`
        )
        const imageLayer = imageryLayerCollection.addImageryProvider(baseLayer)
        // mapSource.push({ layer: imageLayer, label: cItem.text })
        let defaultShow
        if (type === '影像') {
          defaultShow = cItem.text === '影像地图' || cItem.text === '影像注记'
        } else {
          defaultShow = cItem.text === '科技版地图' || cItem.text === '地图注记'
        }
        imageLayer.show = defaultShow
        if (item.children.length === 2) return
        item.children.push({
          label: cItem.text,
          id: 'map' + cIndex,
          type: '底图',
          defaultShow: defaultShow
        })
      })
    }
  })
  commit('treeData', treeData)
}
const addWuHanMap = () => {
  const mapUrl = config.wuhanMap
  mapUrl.forEach(item => {
    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: item.url + `/wmts?tk=${'165a0404b0fc9b1d4612f0c947d5df92'}`,
      layer: item.layer,
      style: 'default',
      maximumLevel: 18,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible'
    }))
  })

  const TDT_CIA_W =
      'http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
      '&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
      '&style=default.jpg&tk=' +
      '165a0404b0fc9b1d4612f0c947d5df92'

  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      // 影像注记
      url: TDT_CIA_W,
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      layer: 'cia_w',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible'
    })
  )
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
        outline: false,
        outlineColor: Cesium.Color.BLACK,
        material: Cesium.Color.fromCssColorString('red')
      },
      id: 'testLand' + item.id
    })
    viewer.entities.add(entityImg)
  })
}
// 加载天空盒
const getViewerSkyBox = () => {
  // const groundSkyBox = new SkyBoxOnGround({
  //   sources: {
  //     positiveX: './image/skyBox/px.png',
  //     negativeX: './image/skyBox/nx.png',
  //     positiveY: './image/skyBox/pz.png',
  //     negativeY: './image/skyBox/nz.png',
  //     positiveZ: './image/skyBox/py.png',
  //     negativeZ: './image/skyBox/ny.png'
  //   }
  // })

  // const groundSkyBox = new SkyBoxOnGround({
  //   sources: {
  //     positiveX: './image/skybox2/Right.jpg',
  //     negativeX: './image/skybox2/Left.jpg',
  //     positiveY: './image/skybox2/Front.jpg',
  //     negativeY: './image/skybox2/Back.jpg',
  //     positiveZ: './image/skybox2/Up.jpg',
  //     negativeZ: './image/skybox2/Down.jpg'
  //   }
  // }) // 修改天空盒
  // groundSkyBox.setSkyBox(viewer)
}
// 计算四至范围

function updateBoundingRectangle () {
  const clickedPositions = [
    { longitude: 120.84192712046605, latitude: 28.940064466465905 },
    { longitude: 120.04725534130846, latitude: 28.92531800202937 },
    { longitude: 120.04560520805262, latitude: 29.519901368982158 },
    { longitude: 120.74383198629035, latitude: 29.51501502909911 }
  ]
  if (clickedPositions.length > 0) {
    let west = Number.POSITIVE_INFINITY
    let east = Number.NEGATIVE_INFINITY
    let south = Number.POSITIVE_INFINITY
    let north = Number.NEGATIVE_INFINITY

    clickedPositions.forEach(function (position) {
      if (position.longitude < west) {
        west = position.longitude
      }
      if (position.longitude > east) {
        east = position.longitude
      }
      if (position.latitude < south) {
        south = position.latitude
      }
      if (position.latitude > north) {
        north = position.latitude
      }
    })

    console.log('Bounding Rectangle: West = ' + west + ', East = ' + east + ', South = ' + south + ', North = ' + north)
  }
}
// updateBoundingRectangle()
// 加载本地离线地图
const NginxTdtMap = (type) => {
  // 定义矩形的四至范围（西、南、东、北边界的经纬度）
  // const west = Cesium.Math.toRadians(119.356) // 西
  // const south = Cesium.Math.toRadians(29.052) // 南
  // const east = Cesium.Math.toRadians(120.078) // 东
  // const north = Cesium.Math.toRadians(29.370) // 北

  // // 创建矩形
  // const rectangle = new Cesium.Rectangle(west, south, east, north)

  // 在Cesium地图上添加矩形实体，并设置颜色为黄色
  // viewer.entities.add({
  //   rectangle: {
  //     coordinates: rectangle,
  //     material: Cesium.Color.YELLOW.withAlpha(0.5), // 设置颜色为黄色，透明度为0.5
  //     outline: true, // 显示边界线
  //     outlineColor: Cesium.Color.BLACK // 边界线颜色为黑色
  //   }
  // })
  const TMap = config.nginxTMap
  const treeData = state.treeData
  treeData.forEach(treeItem => {
    if (treeItem.label === '底图') {
      TMap.forEach((mapItem) => {
        const MapModel = new Cesium.UrlTemplateImageryProvider({
          url: mapItem.url,
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          fileExtension: 'png',
          minimumLevel: 1,
          maximumLevel: 18
        })
        const imageLayer = viewer.imageryLayers.addImageryProvider(MapModel)
        let defaultShow
        if (type === '影像') {
          defaultShow = mapItem.text === '影像地图' || mapItem.text === '地图注记'
        } else {
          defaultShow = mapItem.text === '科技版地图' || mapItem.text === '地图注记'
          imageLayer.contrast = -1.5
          imageLayer.alpha = 0.2
        }
        imageLayer.show = defaultShow
        if (treeItem.children.length === 2) return
        treeItem.children.push({
          label: mapItem.text,
          id: 'map' + mapItem,
          type: '底图',
          defaultShow: defaultShow
        })
      })
    }
  })
}
// 道路流光线
const onStartEntity = () => {
  const jsonUrl = config.RoadUrl
  const material = new RoadThroughLine(
    3000,
    './image/components/spriteline.png'
  )
  // 道路闪烁线
  roadSource.load(jsonUrl).then(function (dataSource) {
    const entities = dataSource.entities.values
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i]
      entity.polyline.width = 1.7
      entity.polyline.material = material
    }
  })
  // roadSource.show = false
  viewer.dataSources.add(roadSource)
}
// 加载白膜
const load3Dtiles = async (tilesetUrl) => {
  // 白膜建筑
  building = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl, {
    customShader: new Cesium.CustomShader({
      uniforms: {
        u_envTexture: {
          value: new Cesium.TextureUniform({
            url: './image/components/pic.jpg'
          }),
          type: Cesium.UniformType.SAMPLER_2D
        },
        u_build1: {
          type: Cesium.UniformType.SAMPLER_2D,
          value: new Cesium.TextureUniform({
            url: './image/components/color2.png'
          })
        },
        u_lerp: {
          type: Cesium.UniformType.FLOAT,
          value: -100
        },
        u_lightPosition: {
          type: Cesium.UniformType.VEC3,
          value: Cesium.Cartesian3.fromDegrees(
            113.27956833332897,
            23.09121843059473,
            1
          )
        },
        u_lightColor: {
          type: Cesium.UniformType.VEC3,
          value: Cesium.Color.fromCssColorString('#6900ff')
        },
        u_lightPosition2: {
          type: Cesium.UniformType.VEC3,
          value: Cesium.Cartesian3.fromDegrees(
            113.35446694395083,
            23.13402304623628,
            1
          )
        },
        u_lightColor2: {
          type: Cesium.UniformType.VEC3,
          value: Cesium.Color.fromCssColorString('#FF4500')
        },
        u_lightRadius: {
          type: Cesium.UniformType.FLOAT,
          value: 2000
        },
        u_play: {
          type: Cesium.UniformType.BOOL,
          value: true
        },
        u_lerp2: {
          type: Cesium.UniformType.FLOAT,
          value: 0
        },
        u_color: {
          type: Cesium.UniformType.VEC4,
          value: Cesium.Color.fromCssColorString('#62809b')
        }
      },
      mode: Cesium.CustomShaderMode.REPLACE_MATERIAL,
      lightingModel: Cesium.LightingModel.UNLIT,
      fragmentShaderText: `
                    #define sat( a ) clamp( a, 0.0, 1.0 )
                    float noise_fun(vec2 co) {   
                        return fract(sin(dot(co.xy ,vec2(12.45678, 93.970204))) * 4321.12345) * 20.;
                    }
                    float getDistanceDecay( float lightDistance, float distance,float decay) {
                        if ( distance > 0.0 && decay > 0.0 ) {
                            return pow( sat( - lightDistance / distance + 1.0 ), decay );
                        }
                        return 1.0;
                    }
                    vec3 addPointLight(vec3 lightPosition, vec3 lightColor, vec3 positionWC , vec3 normal){
                        float distance = u_lightRadius;
                        float decay = 1.0;
                        float lightDistance = length( lightPosition - positionWC );
                        lightColor *= getDistanceDecay( lightDistance, distance, decay );
                        return lightColor;
                    }
                    void fragmentMain(FragmentInput fsInput,inout czm_modelMaterial material) {
                        vec3 positionMC = fsInput.attributes.positionMC;
                        vec3 positionEC = fsInput.attributes.positionEC;
                        vec3 normalEC = fsInput.attributes.normalEC;
                        vec3 posToCamera = normalize(-positionEC); 
                        vec2 uv = fsInput.attributes.texCoord_0;
                        float diffuseCoefficient = max(0.0, dot(normalEC, vec3(0.2)) * 1.0);
                        vec4 glColor1 = vec4(0.);
                        vec4 glColor2 = vec4(0.);
                        {
                            float heightInterval = 50.0;
                            float lineWidth = 10.0;
                            float modResult = mod(positionMC.z, heightInterval);
                            vec3 finalColor = vec3(0.3);
                            vec4 textureColor3 = texture(u_build1,vec2(fract(uv.s),float(uv.t * 5.0) - (czm_frameNumber/60.)));
                            if (modResult < lineWidth / 2.0) {
                                finalColor = textureColor3.rgb * 2.5;
                            }
                            glColor1.rgb = mix(u_color.rgb * 1.5, finalColor,clamp(positionMC.z / 20., 0.0, 1.0));
                            glColor1.rgb *= min(diffuseCoefficient + 0.2, 1.0);
                            glColor1.a = 1.0;
                        }
                        {
                            vec3 coord = normalize(vec3(czm_inverseViewRotation * reflect(posToCamera, normalEC)));
                            vec4 darkRefColor = texture(u_envTexture, vec2(coord.x, (coord.z - coord.y) / 2.0));
                            glColor2.rgb = mix(mix(vec3(.2), vec3(.1,.2,.6),clamp(positionMC.z / 400., 0.0, 1.0)) , darkRefColor.rgb ,0.2);
                            glColor2.rgb *= min(diffuseCoefficient + 0.1, 1.0);

                            // 基础点光源高亮指定范围
                            glColor2.rgb += addPointLight(
                                u_lightPosition ,
                                u_lightColor,
                                (czm_model * vec4(positionMC,1.0)).xyz ,
                                normalEC);
                            glColor2.rgb += addPointLight(
                                u_lightPosition2 ,
                                u_lightColor2,
                                (czm_model * vec4(positionMC,1.0)).xyz ,
                                normalEC);

                            // cesiumlab 光圈特效
                            float _baseHeight = 0.0;
                            float _heightRange = 20.0;
                            float _glowRange = 300.0;
                            float czm_height = positionMC.z - _baseHeight;
                            float czm_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                            float czm_a12 = czm_height / _heightRange + sin(czm_a11) * 0.1;
                            float times = czm_frameNumber / 60.0;
                            glColor2.rgb *= vec3(czm_a12);// 渐变
                            float time = fract(czm_frameNumber / 360.0);
                            time = abs(time - 0.5) * 2.0;
                            float czm_h = clamp(czm_height / _glowRange, 0.0, 1.0);
                            float czm_diff = step(0.005, abs(czm_h - time));
                            glColor2.rgb += glColor2.rgb * (1.0 - czm_diff);
                            glColor2.a = 1.0;
                        }
        
                        float noise = noise_fun(vec2(positionMC.x, positionMC.y));
                        bool condition1 = positionMC.z > (u_lerp + noise);
                        bool condition2 = u_play && u_lerp < 0. && u_lerp2 < positionEC.x && positionEC.x < u_lerp2 + 350.;
                        bool condition3 = u_play && u_lerp > 800. && u_lerp2 < positionEC.x && positionEC.x < u_lerp2 + 350.;

                        material.diffuse = mix(glColor2.rgb, glColor1.rgb, float(condition1 || condition2 || condition3));
                        material.alpha = mix(glColor2.a, glColor1.a, float(condition1 || condition2 || condition3));
                       
                    }
                         `
    })
  })
  viewer.scene.primitives.add(building)
  building2 = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl, {
    debugWireframe: true,
    enableDebugWireframe: true,
    customShader: new Cesium.CustomShader({
      mode: Cesium.CustomShaderMode.REPLACE_MATERIAL,
      lightingModel: Cesium.LightingModel.UNLIT,
      uniforms: {
        u_lerp: {
          type: Cesium.UniformType.FLOAT,
          value: 0
        },
        u_color: {
          type: Cesium.UniformType.VEC4,
          value: Cesium.Color.fromCssColorString('#fff')
        },
        u_play: {
          type: Cesium.UniformType.BOOL,
          value: true
        }
      },
      fragmentShaderText: `
                float noise_fun(vec2 co) {   
                    return fract(sin(dot(co.xy ,vec2(12.45678, 93.970204))) * 4321.12345) * 20.;
                }
                void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                    vec3 positionMC = fsInput.attributes.positionMC;
                    vec3 positionEC = fsInput.attributes.positionEC;
                    if(u_play && u_lerp <positionEC.x && positionEC.x < u_lerp + 350.) {
                        material.diffuse = u_color.rgb;
                        material.alpha = 1.;
                    }else {
                        discard;
                    }
                }
                `
    })
  })
  viewer.scene.primitives.add(building2)
  // building.show = false
  // building2.show = false
}
// 加载东阳江
const initWater = async () => {
  const RiverUrl = config.RiverUrl
  const waterPlane = []
  const waterData = await Cesium.Resource.fetchJson({ url: RiverUrl })
  waterData.features.map((feature) =>
    feature.geometry.coordinates[0].map(coordinate =>
      waterPlane.push(Cesium.Cartesian3.fromDegrees(...coordinate))
    )
  )
  const polygon = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(waterPlane)
  })
  const instance = new Cesium.GeometryInstance({
    geometry: polygon
  })
  waterPrimitive = new Cesium.GroundPrimitive({
    geometryInstances: instance,
    appearance: new Cesium.MaterialAppearance({
      material: new Cesium.Material({
        fabric: {
          uniforms: {
            baseWaterColor: Cesium.Color.fromCssColorString('#003cff'),
            blendColor: new Cesium.Color(0, 1, 0.699, 1),
            refMap: './image/components/color.png',
            normalMap: './image/components/waterNormals.jpg',
            frequency: 800,
            animationSpeed: 0.005,
            amplitude: 5,
            specularIntensity: 1,
            fadeFactor: 3
          },
          source: `
                        // Thanks for the contribution Jonas
                        // http://29a.ch/2012/7/19/webgl-terrain-rendering-water-fog
                        
                        uniform sampler2D refMap;
                        uniform sampler2D normalMap;
                        uniform vec4 baseWaterColor;
                        uniform vec4 blendColor;
                        uniform float frequency;
                        uniform float animationSpeed;
                        uniform float amplitude;
                        uniform float specularIntensity;
                        uniform float fadeFactor;
                        
                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                            czm_material material = czm_getDefaultMaterial(materialInput);
                        
                            float time = czm_frameNumber * animationSpeed;
                        
                            // fade is a function of the distance from the fragment and the frequency of the waves
                            float fade = max(1.0, (length(materialInput.positionToEyeEC) / 10000000000.0) * frequency * fadeFactor);
                        
                            float specularMapValue = 1.0;
                        
                            // note: not using directional motion at this time, just set the angle to 0.0;
                            vec4 noise = czm_getWaterNoise(normalMap, materialInput.st * frequency, time, 0.0);
                            vec3 normalTangentSpace = noise.xyz * vec3(1.0, 1.0, (1.0 / amplitude));
                        
                            // fade out the normal perturbation as we move further from the water surface
                            normalTangentSpace.xy /= fade;
                        
                            // attempt to fade out the normal perturbation as we approach non water areas (low specular map value)
                            normalTangentSpace = mix(vec3(0.0, 0.0, 50.0), normalTangentSpace, specularMapValue);
                        
                            normalTangentSpace = normalize(normalTangentSpace);
                        
                            // get ratios for alignment of the new normal vector with a vector perpendicular to the tangent plane
                            float tsPerturbationRatio = clamp(dot(normalTangentSpace, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
                        
                            // fade out water effect as specular map value decreases
                            material.alpha = mix(blendColor.a, baseWaterColor.a, specularMapValue) * specularMapValue;
                        
                            // base color is a blend of the water and non-water color based on the value from the specular map
                            // may need a uniform blend factor to better control this
                            material.diffuse = mix(blendColor.rgb, baseWaterColor.rgb, specularMapValue);
                        
                            // diffuse highlights are based on how perturbed the normal is
                            material.diffuse += (0.1 * tsPerturbationRatio);
                        
                            material.diffuse = material.diffuse;

                            vec2 reflectCoord = gl_FragCoord.xy / czm_viewport.zw; 
                            vec2 reflectionTexcoord = vec2(1.0 - reflectCoord.x, reflectCoord.y);
                            material.diffuse += blendColor.rgb * 0.4;
                            material.diffuse *= 0.5;
                            material.diffuse *= texture(refMap, reflectionTexcoord + normalTangentSpace.xz * 5.0).rgb;

                            material.normal = normalize(materialInput.tangentToEyeMatrix * normalTangentSpace);
                        
                            material.specular = specularIntensity;
                            material.shininess = 10.0;
                        
                            return material;
                        }
                        `
        }
      }),
      translucent: false
    }),
    asynchronous: false
  })
  // waterPrimitive.show = false
  viewer.scene.primitives.add(waterPrimitive)
}
const initEvent = async () => {
  let step = 20
  const step2 = 1
  const _date = viewer.clock.currentTime
  const _startTime = Cesium.JulianDate.addSeconds(_date, 10, new Cesium.JulianDate())
  const _stopTime = Cesium.JulianDate.addSeconds(_date, 60, new Cesium.JulianDate())
  const _time1 = Cesium.JulianDate.addSeconds(_date, 1 * 10, new Cesium.JulianDate())
  const _time2 = Cesium.JulianDate.addSeconds(_date, (2 * 10), new Cesium.JulianDate())
  const _time3 = Cesium.JulianDate.addSeconds(_date, (3 * 10), new Cesium.JulianDate())
  const _time4 = Cesium.JulianDate.addSeconds(_date, (4 * 10), new Cesium.JulianDate())
  const _time5 = Cesium.JulianDate.addSeconds(_date, (5 * 10), new Cesium.JulianDate())
  const _time6 = Cesium.JulianDate.addSeconds(_date, (6 * 10), new Cesium.JulianDate())
  const _property = new Cesium.SampledProperty(Cesium.Color)
  _property.addSample(_time1, Cesium.Color.fromCssColorString('#62809b'))
  _property.addSample(_time2, Cesium.Color.fromCssColorString('#87CEFA'))
  _property.addSample(_time3, Cesium.Color.fromCssColorString('#003cff'))
  _property.addSample(_time4, Cesium.Color.fromCssColorString('#F08080'))
  _property.addSample(_time5, Cesium.Color.fromCssColorString('#FFA500'))
  _property.addSample(_time6, Cesium.Color.fromCssColorString('#FF4500'))
  viewer.clock.startTime = _startTime
  viewer.clock.stopTime = _stopTime
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
  viewer.scene.postUpdate.addEventListener((scene, time) => {
    // 动态线框扫描
    if (building2.customShader.uniforms.u_lerp.value < -5000) {
      step = 20
    } else if (building2.customShader.uniforms.u_lerp.value > 5000) {
      step = -20
    }
    building.customShader.uniforms.u_lerp2.value += step
    building2.customShader.uniforms.u_lerp.value += step
    // 切换外观
    // if (isPlay) {
    //   if (building.customShader.uniforms.u_lerp.value < -300) {
    //     step2 = 1
    //   } else if (building.customShader.uniforms.u_lerp.value > 1000) {
    //     step2 = -1
    //   }
    // }
    building.customShader.uniforms.u_lerp.value += step2
    // 颜色主题
    _property.getValue(time) && (
      (building.customShader.uniforms.u_color.value = _property.getValue(time)),
      (building2.customShader.uniforms.u_color.value = _property.getValue(time)),
      waterPrimitive && (waterPrimitive.appearance.material.uniforms.baseWaterColor = _property.getValue(time))
    )
  })

  // const gui = new dat.GUI()
  // gui.add({ play: false }, 'play').name('自动切换').onChange(function (value) {
  //   isPlay = value
  // })
  // gui.add({ lerp: -100 }, 'lerp', -100, 800, 1).name('外观过渡').onChange(function (value) {
  //   building.customShader.uniforms.u_lerp.value = value
  // })
  // gui.add({ play: true }, 'play').name('线框扫描').onChange(function (value) {
  //   building.customShader.uniforms.u_play.value = value
  //   building2.customShader.uniforms.u_play.value = value
  // })
}
// 加载地块
const addXZQPolygon = () => {
  const treeData = state.treeData
  treeData.forEach(value => {
    if (value.label === '地块') {
      config.diKuaiArr.forEach((item, index) => {
        const roadpolygon = Cesium.GeoJsonDataSource.load(
          item.url,
          { clampToGround: true }
        )
        roadpolygon
          .then(dataSource => {
            viewer.dataSources.add(dataSource).then(t => {
              t.show = true
            })
            const entities = dataSource.entities.values
            for (let i = 0; i < entities.length; i++) {
              const entity = entities[i]
              entity.polygon.material = Cesium.Color.fromCssColorString(
                '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
              )
              entity.show = false
              entity.polygon.outline = false
              entity.polygon.outlineColor = Cesium.Color.BLACK
              // entity.polygon.height = 10.0;
              // entity.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
              // entity.polygon.extrudedHeight = 0.0;
              // entity.polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
            }
            dataSource.name = item.label
          })
        if (value.children.length >= 6) return
        value.children.push({
          label: item.label,
          id: 'land' + item.label,
          type: '地块',
          defaultShow: false
        })
      })
    }
  })
  commit('treeData', treeData)
}

const clearViewer = () => {
  if (Cesium.defined(viewer)) {
    viewer.entities.removeAll()
    viewer.imageryLayers.removeAll()
    viewer.dataSources.removeAll()
    viewer.scene.primitives.removeAll()
    viewer.destroy() // 销毁Viewer实例
    // 获取webgl上下文
    let gl = viewer.scene.context._originalGLContext
    gl.canvas.width = 1
    gl.canvas.height = 1
    viewer.destroy() // 销毁Viewer实例
    gl.getExtension('WEBGL_lose_context').loseContext()
    gl = null
    window.viewer = null
    const cesiumContainer = document.getElementById('cesiumContainer')
    if (cesiumContainer) {
      cesiumContainer.remove() // 移除与地图相关的DOM元素
    }
    console.log('cesium销毁')

    // 清理其他JavaScript对象和事件监听器
    // ...
  }
}
onBeforeUnmount(() => {
  // const cesiumContainer = document.getElementById('cesiumContainer')
  // if (cesiumContainer) cesiumContainer.remove()
  clearTimeout(loadingTimer.value)
  clearTimeout(flyTimer.value)
  $bus.off('showBuilding')
  $bus.off('showMapLayer')
})
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  color: rgb(219, 247, 255)0%, 93%);
}
</style>
