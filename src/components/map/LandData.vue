<template>
  <div v-show="showPopup" id="popup" class="olPopup">
    <div style="
        position: absolute;
        right: 5px;
        top: 5px;
        text-align: right;
        cursor: pointer;
      ">
      <span @click="hidePopup" class="popupClose">
        <CircleClose style="width: 20px; height: 20px" />
      </span>
    </div>
    <div id="popup-title"></div>
    <div id="popup-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import GeoJSON from 'ol/format/GeoJSON'
import geojsonObject from './data/camera.json'
import geoJsonData from './data/land.json'
import $bus from '@/utils/eventBus.js'
import mapHelper from '@/utils/mapHelper'
const viewer = ref()
const featuresList = ref([])
const showPopup = ref(false)
const loadGeoJsonData = async (geoJsonData, isCameraData = false) => {
  try {
    const dataSource = await Cesium.GeoJsonDataSource.load(geoJsonData, {
      clampToGround: true // 如果你希望点位紧贴地面c
    })
    viewer.value.dataSources.add(dataSource)

    if (isCameraData) {
      // 为摄像头数据设置自定义图标
      dataSource.entities.values.forEach((entity) => {
        entity.billboard = {
          image: './images/webcam.png',
          width: 32,
          height: 32,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        }
      })
    }

    viewer.value.zoomTo(dataSource)
  } catch (error) {
    console.error('Failed to load GeoJSON data:', error)
  }
}

// 加载WMS数据
const loadGeoServerData = () => {
  const wmsLayerProvider = new Cesium.WebMapServiceImageryProvider({
    url: '/geoserver/test/wms',
    layers: 'test:低效用地',
    parameters: {
      SERVICE: 'WMS',
      VERSION: '1.1.1',
      REQUEST: 'GetMap',
      FORMAT: 'image/png',
      TRANSPARENT: true,
      STYLES: '',
      exceptions: 'application/vnd.ogc.se_inimage',
      SRS: 'EPSG:4326'
    }
  })
  // 创建图层实例并设置透明度
  const wmsLayer = new Cesium.ImageryLayer(wmsLayerProvider, {
    alpha: 0.6 // 设置透明度为 0.6
  })
  // 添加图层到 viewer
  viewer.value.imageryLayers.add(wmsLayer)
}

// 假定我们有一个映射typeName到颜色的对象
const typeColors = {
  低效用地: '#67ff68', // 红色
  供而未用t: '#FF0000', // 绿色
  '批而未供（1999-2022）': '#69d8df',
  批而未供: '#2E8B57',
  闲置: '#8A2BE2',
  已供已用: '#FFFF00',
  用而未尽: '#0000FF'
}

// 加载地块信息
const loadMultipleGeoServerWFSData = async (typeNamesArray) => {
  const dataSourceArray = []

  for (const typeName of typeNamesArray) {
    const fillColor = typeColors[typeName] || '#67ff68' // 如果typeName没有指定颜色，则使用默认颜色
    const wfsRelativeUrl = '/geoserver/test/ows'
    const geoJsonResource = new Cesium.Resource({
      url: wfsRelativeUrl,
      queryParameters: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        typeName: `test:${typeName}`, // 使用动态的typeName
        srsName: 'EPSG:4326',
        outputFormat: 'application/json'
      }
    })

    try {
      const dataSource = await Cesium.GeoJsonDataSource.load(geoJsonResource, {
        clampToGround: true,
        stroke: Cesium.Color.BLACK, // 轮廓颜色
        strokeWidth: 3,
        fill: Cesium.Color.fromCssColorString(fillColor).withAlpha(0.7)
      })
      await viewer.value.dataSources.add(dataSource)
      await viewer.value.zoomTo(dataSource)

      dataSourceArray.push(dataSource)
    } catch (error) {
      console.error(error)
    }
  }
  return dataSourceArray // 返回所有数据源的数组
}

// 加载低效用地数据(加载单个)
const loadMultipleGeoServerWFSData2 = async () => {
  const fillColor = '#67ff68'
  const wfsRelativeUrl = '/geoserver/test/ows'

  const geoJsonResource = new Cesium.Resource({
    url: wfsRelativeUrl,
    queryParameters: {
      service: 'WFS',
      version: '1.1.0',
      request: 'GetFeature',
      typeName: 'test:wuhan 2',
      outputFormat: 'application/json',
      maxFeatures: '1050',
      srsName: 'EPSG:3857'
    }
  })

  try {
    const geoJsonData = await geoJsonResource.fetchJson()

    const transformCoordinates = (coord) => {
      const point = proj4('EPSG:3857', 'EPSG:4326', [coord[0], coord[1]])
      if (coord.length > 2 && !isNaN(coord[2]) && isFinite(coord[2])) {
        return [point[0], point[1], coord[2]]
      } else {
        return [point[0], point[1]]
      }
    }

    const transformGeometry = (geometry) => {
      if (geometry.type === 'Point') {
        geometry.coordinates = transformCoordinates(geometry.coordinates)
      } else if (geometry.type === 'LineString' || geometry.type === 'MultiPoint') {
        geometry.coordinates = geometry.coordinates.map(transformCoordinates)
      } else if (geometry.type === 'Polygon' || geometry.type === 'MultiLineString') {
        geometry.coordinates = geometry.coordinates.map(ring => ring.map(transformCoordinates))
      } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates = geometry.coordinates.map(polygon => polygon.map(ring => ring.map(transformCoordinates)))
      }
    }

    // Apply transformation to each feature in the GeoJSON
    geoJsonData.features.forEach(feature => transformGeometry(feature.geometry))

    const dataSource = await Cesium.GeoJsonDataSource.load(geoJsonData, {
      stroke: Cesium.Color.HOTPINK,
      fill: Cesium.Color.fromCssColorString(fillColor).withAlpha(0.5),
      strokeWidth: 3
    })

    viewer.value.dataSources.add(dataSource)
    viewer.value.zoomTo(dataSource)
  } catch (error) {
    console.error(error)
  }
}

// 加载低效用地数据(加载单个)
const loadGeoServerWFSData = async () => {
  let dataSource = null
  const wfsRelativeUrl = '/geoserver/test/ows'
  const geoJsonResource = new Cesium.Resource({
    url: wfsRelativeUrl,
    queryParameters: {
      service: 'WFS',
      version: '1.1.0',
      request: 'GetFeature',
      typeName: 'test:低效用地',
      srsName: 'EPSG:4326',
      outputFormat: 'application/json'
    }
  })
  try {
    dataSource = await Cesium.GeoJsonDataSource.load(geoJsonResource, {
      clampToGround: true,
      stroke: Cesium.Color.BLACK, // 轮廓颜色
      strokeWidth: 3,
      fill: Cesium.Color.fromCssColorString('#67ff68').withAlpha(0.7)
    })

    // 设置每个地块实体的颜色

    for (let i = 0; i < dataSource.entities.values.length; i++) {
      const entity = dataSource.entities.values[i]

      const actualId = entity.properties.OBJECTID.getValue()
      entity.myCustomId = actualId
    }
    await viewer.value.dataSources.add(dataSource)
    await viewer.value.zoomTo(dataSource)
    // 遍历并保存要素数据
    const entities = dataSource.entities.values
    let positions = []
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i]
      if (entity.polygon) {
        const hierarchy = entity.polygon.hierarchy.getValue()
        positions = hierarchy.positions // 这是一个 Cartesian3 数组
      } else if (entity.polyline) {
        // 如果是折线
        const positions = entity.polyline.positions.getValue()
      } else if (entity.position) {
        // 如果是点
        const position = entity.position.getValue()
      }
      const obj = {
        OBJECTID: entity.properties.OBJECTID._value,
        Shape_Leng: entity.properties.Shape_Leng._value,
        bsm: entity.properties.bsm._value,
        dxydlx: entity.properties.dxydlx._value,
        kfcd: entity.properties.kfcd._value,
        qdfs: entity.properties.qdfs._value,
        xzqdm: entity.properties.xzqdm._value,
        tdyt: entity.properties.tdyt._value,
        xzqmc: entity.properties.xzqmc._value,
        zdmj: entity.properties.zdmj._value,
        zdsz: entity.properties.zdsz._value,
        positions: positions[0]
      }
      const feature = {
        properties: obj // 保存实体的属性
      }
      featuresList.value.push(feature)
    }

    await $bus.emit('featuresList', featuresList.value)
  } catch (error) {
    console.log(error)
  }
  return dataSource
}

const locateFeatureByCustomId = async (landItem) => {
  // const [landDataSource] = await Promise.all([loadGeoServerWFSData()]);
  // const entities = landDataSource.entities.values;
  // let targetEntity = null;
  // // 遍历以查找具有匹配 myCustomId 的实体
  // for (let i = 0; i < entities.length; i++) {
  //   const entity = entities[i];
  //   if (entity.properties && entity.myCustomId === objectId) {
  //     targetEntity = entity;
  //     targetEntity.position = data.position;
  //     break;
  //   }
  // }
  // if (targetEntity) {
  //   viewer.value.flyTo(targetEntity);
  // }
  dataSource.value.forEach((item) => {
    const entities = item.entities.values
    // const targetEntity = entities.find(entity => {
    //   const objectIdValue = entity.properties && (landItem.objectIdField === 'OBJECTID' ? entity.properties._OBJECTID : entity.properties.OBJECTID_1);
    //   return objectIdValue && objectIdValue.getValue() === Number(landItem.objectId);
    // });
    const targetEntity = entities.find((entity) => {
      return entity.id === landItem.featureId
    })
    if (targetEntity) {
      const hierarchy = targetEntity.polygon.hierarchy.getValue()
      let positions
      if (hierarchy.positions) {
        const positions = hierarchy.positions

        // 将笛卡尔坐标转换为经纬度坐标和高度
        const cartographic = Cesium.Cartographic.fromCartesian(positions[0])
        const longitude = Cesium.Math.toDegrees(cartographic.longitude)
        const latitude = Cesium.Math.toDegrees(cartographic.latitude)
        // 增加高度以避免太接近地面，单位是米
        const height = cartographic.height + 2000

        console.log(positions[0], '坐标信息')

        // 构建所有属性的对象
        const properties = {}
        targetEntity.properties.propertyNames.forEach((propName) => {
          const prop = targetEntity.properties[propName]
          properties[propName] = prop.getValue()
        })

        showPopupAtPosition(positions[0], properties)
        viewer.value.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            height
          ), // 使用新的高度
          orientation: {
            heading: Cesium.Math.toRadians(0), // 朝向正北
            pitch: Cesium.Math.toRadians(-90), // 从上往下的视角
            roll: 0.0
          },
          duration: 3 // 飞行持续时间为3秒
        })
      }
    }
  })
}

const showPopupAtPosition = async (cartesianPosition, properties) => {
  const screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
    viewer.value.scene,
    cartesianPosition
  )
  showPopup.value = true

  await nextTick() // 等待DOM更新
  if (screenPosition) {
    // 更新popup的位置
    const popupElement = document.getElementById('popup')
    console.log(popupElement, '111')
    popupElement.style.left = `${screenPosition.x}px`
    popupElement.style.bottom = `${viewer.value.canvas.clientHeight - screenPosition.y
      }px`
    // 清空当前popup内容
    const popupContent = document.getElementById('popup-content')
    const popupTitle = document.getElementById('popup-title')
    popupTitle.innerHTML = ''
    popupContent.innerHTML = ''
    // 填充新的内容到popup
    // for (const [key, value] of Object.entries(properties)) {
    //   const element = document.createElement("div");
    //   element.className = "popup-item";
    //   element.innerHTML = `<strong>${key}:</strong> ${value}`;
    //   popupContent.appendChild(element);
    // }
    const element = document.createElement('div')
    const element2 = document.createElement('div')
    element2.innerHTML = `${properties.XMMC}`
    element.className = 'popup-item'
    popupContent.innerHTML = `
    <p><span class="txt_label">土地用途：</span><span class="txt_value">${properties.TDYT}</span></p>
    <p><span class="txt_label">供应方式：</span><span class="txt_value">${properties.GYFS}</span></p>
    <p><span class="txt_label">土地坐落：</span><span class="txt_value">${properties.TDZL}</span></p>
    <p><span class="txt_label">地块面积：</span><span class="txt_value">${properties.DKMJ}</span></p>
    <p><span class="txt_label">行政区划：</span><span class="txt_value">${properties.TOWN}</span></p>
    <p><span class="txt_label">批准文号：</span><span class="txt_value">${properties.PZWH}</span></p>
    `
    popupContent.appendChild(element)
    popupTitle.appendChild(element2)
  }
}

const hidePopup = () => {
  showPopup.value = false
}

const getEntityPosition = (entity) => {
  if (entity.polygon) {
    const hierarchy = entity.polygon.hierarchy.getValue()
    return hierarchy.positions[0]
  }
}

const dataSource = ref([])
onMounted(async () => {
  viewer.value = window.viewer
  // 加载地块数据
  // loadGeoJsonData(geoJsonData)

  // 加载摄像头数据
  // await loadGeoJsonData(geojsonObject, true);
  // loadGeoServerData()
  // await loadGeoServerWFSData();
  // await locateFeatureByCustomId(featuresList.value[0].properties.OBJECTID);

  // 加载多个地块数据
  // const typeNames = ['低效用地', '供而未用t', '批而未供', '批而未供（1999-2022）', '批而未供', '闲置', '已供已用', '用而未尽']
  const typeNames = ['供而未用t']
  loadMultipleGeoServerWFSData(typeNames).then((dataSources) => {
    dataSource.value = dataSources
  })

  // loadMultipleGeoServerWFSData2()
  $bus.on('locateFeatureByCustomId', (data) => {
    // locateFeatureByCustomId(data)
  })
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.value.canvas)
  // 监听左键点击事件
  handler.setInputAction((clickEvent) => {
    // 获取点击位置的对象
    const pickedObject = viewer.value.scene.pick(clickEvent.position)
    if (Cesium.defined(pickedObject)) {
      // 确定点击的对象是否为地块实体
      const entity = pickedObject.id
      if (entity && entity.polygon) {
        const position = getEntityPosition(entity)

        // 构建所有属性的对象
        const properties = {}
        entity.properties.propertyNames.forEach((propName) => {
          const prop = entity.properties[propName]
          properties[propName] = prop.getValue()
        })
        // 显示带有属性信息的popup
        showPopupAtPosition(position, properties)

        console.log(entity.properties)
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  viewer.value.eventManager.addEventListener('CLICK', leftClick, true)
  // viewer.value.entities.values.forEach((entity) => {
  //   console.log("Entity ID:", entity.id);
  //   console.log("Position:", entity.position);
  //   console.log("Properties:", entity.properties);
  //   if (entity.name) {
  //     console.log("Name:", entity.name);
  //   }
  //   if (entity.description) {
  //     console.log("Description:", entity.description);
  //   }
  // });
  // viewer.value.screenSpaceEventHandler.setInputAction(
  //   async function onLeftClick(movement) {
  //     const ray = viewer.value.camera.getPickRay(movement.position);
  //     const cartesian = viewer.value.scene.globe.pick(ray, viewer.value.scene);
  //     if (cartesian) {
  //       const pickedFeaturesPromise =
  //         viewer.value.imageryLayers.pickImageryLayerFeatures(
  //           ray,
  //           viewer.value.scene
  //         );

  //       if (pickedFeaturesPromise) {
  //         pickedFeaturesPromise
  //           .then(function (features) {
  //             if (features && features.length > 0) {
  //               console.log(features[0].data);
  //             } else {
  //               console.log("No features found.");
  //             }
  //           })
  //           .catch(function (error) {
  //             console.error(error);
  //           });
  //       } else {
  //         // 打印未点中任何图层的提示
  //         console.log("No imagery layer found at this location.");
  //       }
  //     }
  //   },
  //   Cesium.ScreenSpaceEventType.LEFT_CLICK
  // );
})

const cameraPosition = {
  lng: 120.2441872462853,
  lat: 29.27853744605763
}

//  let targetPosition = {
//   lng:120.24404897088696,
//   lat:29.278458056932465
//  };
const targetPosition = ref({
  lng: 120.24418300802449,
  lat: 29.278530956591368
})
const cameraOrientation = 0

const leftClick = (e) => {
  const position = viewer.value.scene.pickPosition(e.message.position)
  console.log(position, 'positionposition')
  if (position) {
    const lonLat = mapHelper.worldToLonlat(position)
    console.log(position, lonLat)
    targetPosition.value.lng = lonLat[0]
    targetPosition.value.lat = lonLat[1]
    console.log(targetPosition.value)

    const aa = calculateAzimuth()
  }
}

// 计算方位角
const calculateAzimuth = () => {
  const result = mapHelper.calculateAzimuth(targetPosition.value, cameraPosition, cameraOrientation)
  console.log(result, '当前角度')
}

</script>

<style lang="less" scoped>
.box {
  border: 1px solid red;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.mapStyle {
  position: absolute;
  left: 8px;
  top: 70px;
  max-width: 70px;
  z-index: 1000;
}

.tool-container {
  position: absolute;
  left: 8px;
  right: 0;
  bottom: 80px;
  width: 100px;
  z-index: 1000;

  .tool-item1 {
    margin-bottom: 20px;
  }

  .tool-item {
    width: 30px;
    padding: 8px 4px;
    background-color: rgb(58, 40, 158);
    text-align: center;
    border-radius: 5px;
    cursor: pointer;

    &.active {
      i {
        color: #00eaff;
      }
    }
  }

  i {
    color: #fff;
    font-size: 20px;
  }
}

.toolBar {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 80px;
  width: 350px;
  height: 50px;
  border-radius: 3px;
  z-index: 10000;
  background-color: rgba(52, 27, 190, 0.5);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 上下居中 */
  padding: 0 20px;
}

.toolbar-item {
  /* 其他样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.toolbar-item i,
.toolbar-item span {
  transition: color 0.3s;
}

.toolbar-item.active i,
.toolbar-item.active span {
  color: #00eaff;
}

.mapStyleControl {
  display: block;
  margin: 1px;
  padding: 0;
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: inherit;
  text-align: center;
  height: 1.375em;
  width: 1.375em;
  line-height: 0.4em;
  background-color: rgba(0, 60, 136, 0.5);
  border: none;
  border-radius: 2px;
}

.ol-control-div {
  width: 24px;
  height: 24px;
  border-radius: 2px 2px 0 0;
  font-size: 22px;
}

.hide {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.olPopup {
  position: absolute;
  border-radius: 10px;
  border: 1px solid rgb(5, 155, 255);
  background: rgba(0, 19, 39, 0.726);
  box-shadow: 0px 0px 10px 0px rgb(5, 77, 153);
  color: white;
  bottom: 20px;
  left: 30px;
  min-width: 280px;
  font-size: 15px;
  z-index: 9999;

  #popup-title {
    justify-content: space-around;
    border-bottom: 1px solid #fff;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 700;
    background-color: rgba(5, 77, 153, 0.5);
  }

  #popup-content {
    padding: 20px 10px;
    font-size: 16px;

    /deep/ .popup-item {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }

    /deep/ p {
      margin-bottom: 20px;
    }
  }

  .popupClose {
    cursor: pointer;
    height: 10px;
  }

  .popupClose:hover {
    color: rgba(255, 255, 255, 0.719);
  }
}

.popup-box {
  span {
    border: 1px solid red;
  }
}
</style>
