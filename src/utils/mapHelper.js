import * as proj4 from 'proj4'
const mapHelper = {}
let entityRadar, entityFlowInit
function _td (radians) {
  const v =
    typeof radians === 'undefined' ? undefined : Cesium.Math.toDegrees(radians)
  return v
}

// 加载天地图政务服务网地址
mapHelper.createBaseMapProvider = (url) => {
  const imageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: url,
    customTags: {
      mz: function (imageProvider, x, y, level) {
        return level + 1
      }
    },
    minimumLevel: 6,
    maximumLevel: 19,
    matrixSet: 'EPSG:4326', // 投影坐标系设置矩阵
    rectangle: Cesium.Rectangle.fromDegrees(
      118.022522,
      27.045433,
      123.156157,
      31.18256
    ),
    tilingScheme: new Cesium.GeographicTilingScheme()
  })
  return imageryProvider
}

/**
 * 获取当前相机信息
 * @method getCurrentCameraInfo
 * @for mapHelper
 */
mapHelper.getCurrentCameraInfo = function (camera) {
  const pos = camera.positionCartographic
  return [
    _td(pos.longitude),
    _td(pos.latitude),
    pos.height,
    _td(camera.heading),
    _td(camera.pitch),
    _td(camera.roll)
  ]
}

// 经纬度转世界坐标
mapHelper.lonlatToWorld = function (lon, lat, height) {
  return Cesium.Cartesian3.fromDegrees(lon, lat, height)
}

// 世界坐标转经纬度
mapHelper.worldToLonlat = function (cartesian3, _viewer = viewer) {
  const ellipsoid = _viewer.scene.globe.ellipsoid
  const cartographic = ellipsoid.cartesianToCartographic(cartesian3)
  const lat = Cesium.Math.toDegrees(cartographic.latitude)
  const lng = Cesium.Math.toDegrees(cartographic.longitude)
  const ele = cartographic.height
  return [lng, lat, ele]
}

// 将cgcs2000坐标转换成wgs84坐标
mapHelper.proToLonLat = function (x, y) {
  const source = new proj4.default.Proj('SR-ORG:1984')
  const dest = new proj4.default.Proj('EPSG:4326')
  const pos = proj4.default.transform(source, dest, [x, y])
  return [pos.x, pos.y]
}

// 将cgcs2000坐标转换成wgs84坐标
mapHelper.proToLonLat1 = function (x, y) {
  const source = new proj4.default.Proj('EPSG:3857')
  const dest = new proj4.default.Proj('EPSG:4326')
  const pos = proj4.default.transform(source, dest, [x, y])
  return [pos.x, pos.y]
}

// 获取实体Entity的经纬度
mapHelper.getEntityLoaLat = function (entity) {
  let longitude, latitude
  const position = entity.position.getValue(Cesium.JulianDate.now())
  if (position && Cesium.defined(position)) {
    const cartographicPosition = Cesium.Cartographic.fromCartesian(position)
    longitude = Cesium.Math.toDegrees(cartographicPosition.longitude)
    latitude = Cesium.Math.toDegrees(cartographicPosition.latitude)
  }
  return [longitude, latitude]
}

/**
 * 定位
 * @method flyToByCameraInfo
 * @for mapHelper
 * @param {Array} cameraInfo 参数 [lon, latitude, height, heading, pitch, roll]
 */
mapHelper.flyToByCameraInfo = (cameraInfo, completeCallback, _viewer = viewer) => {
  _viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      cameraInfo[0], // 经度
      cameraInfo[1], // 纬度
      cameraInfo[2] // 距离地面高度
    ),
    orientation: {
      heading: Cesium.Math.toRadians(cameraInfo[3]), // 水平方向(东南西北)
      pitch: Cesium.Math.toRadians(cameraInfo[4]), // 垂直方向
      roll: Cesium.Math.toRadians(cameraInfo[5]) //
    },
    duration: 4,
    complete: completeCallback
  })
}

/**
 * 定位
 * @method flyToByLonLat
 * @for mapHelper
 * @param  positon 参数 lon,lat,alt
 */
mapHelper.flyToByLonLat = function (lon, lat, alt) {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, alt)
  })
}

/**
 * 精准定位实体 (修改倾斜角度后的纬度)
 * @method getOffsetLat
 * @for mapHelper
 * @param  参数 lat(纬度) alt(高度) pitch(方位角度)
 */
mapHelper.getOffsetLat = (options) => {
  const ONE_LAT_TO_METERS = 111 * 1000 // 1纬度对应的距离 111km
  // 如果是90或者0度，不发生偏移
  if (Math.abs(options.pitch % 90) === 0) {
    return options.lat
  }
  // tan用的是弧度，这里要将角度转为弧度
  const latOffsetMeters = options.alt / Math.tan((options.pitch * Math.PI) / 180)
  const lat = Number((latOffsetMeters / ONE_LAT_TO_METERS).toFixed(12))
  return options.lat + lat
}

mapHelper.flyToDongYangCenter = (_viewer = viewer, completeCallback) => {
  _viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      120.27070608173307, // 经度
      28.690289465825668, // 纬度
      80876.22942935432 // 距离地面高度
    ),
    orientation: {
      heading: Cesium.Math.toRadians(7.973339967645401), // 水平方向(东南西北)
      pitch: Cesium.Math.toRadians(-53.375383485907435), // 垂直方向
      roll: Cesium.Math.toRadians(0) //
    },
    duration: 4,
    complete: completeCallback
  })
}
// 雷达扫描
mapHelper.addRadarScan = function (point, name, radius = 100.0, radarcolor = '#4BffD8') {
  entityRadar = null
  entityRadar = viewer.entities.add({
    // position: Cesium.Cartesian3.fromDegrees(120.66825934125808, 30.510568768970927),
    position: Cesium.Cartesian3.fromDegrees(point[0], point[1]),
    name: '雷达扫描',
    ellipse: {
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      material: new Cesium.RadarScanMaterialProperty({
        color: Cesium.Color.fromCssColorString(radarcolor).withAlpha(0.3),
        speed: 20.0
      }),
      height: 5.0,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      outline: true,
      outlineColor: Cesium.Color.fromCssColorString(radarcolor)
    },
    label: {
      scale: 1,
      font: 'bolder 24px sans-serif',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      text: name, // 图标名称
      fillColor: Cesium.Color.fromCssColorString('#ffffff'),
      pixelOffset: new Cesium.Cartesian2(0, -30),
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000.0)
    }
  })
  return entityRadar
}
// 移除雷达扫描
mapHelper.clearRadarScan = function () {
  if (entityRadar) {
    viewer.entities.remove(entityRadar)
    entityRadar = null
  }
}

// 抛物飞线效果
// parabolaFlowInit(this.viewer, 3);

/**
* @description: 抛物飞线效果初始化
* @param {*} _viewer
* @param {*} _num :每条线上的飞线数量
* @return {*}
*/
mapHelper.parabolaFlowInit = function (_viewer, _num, _center, _positions) {
  entityFlowInit = new Cesium.GeoJsonDataSource()
  _positions.forEach(item => {
    const _siglePositions = parabola(_center, item, 100)
    // 创建飞线
    for (let i = 0; i < _num; i++) {
      entityFlowInit.entities.add({
        polyline: {
          positions: _siglePositions,
          width: 2.2,
          material: new Cesium.LineFlowMaterialProperty({
            color: new Cesium.Color(1.0, 1.0, 0.0, 0.8),
            speed: 5 * Math.random(),
            percent: 0.1,
            gradient: 0.01
          })
        }
      })
    }
    // 创建轨迹线
    entityFlowInit.entities.add({
      polyline: {
        positions: _siglePositions,
        material: new Cesium.Color(1.0, 1.0, 0.0, 0.2)
      }
    })
  })
  _viewer.dataSources.add(entityFlowInit)
  /**
   * @description: 抛物线构造函数（参考开源代码）
   * @param {*}
   * @return {*}
   */
  function parabola (
    startPosition,
    endPosition,
    height = 0,
    count = 50
  ) {
    // 方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
    const result = []
    height = Math.max(+height, 100)
    count = Math.max(+count, 50)
    const diffLon = Math.abs(startPosition[0] - endPosition[0])
    const diffLat = Math.abs(startPosition[1] - endPosition[1])
    const L = Math.max(diffLon, diffLat)
    let dlt = L / count
    if (diffLon > diffLat) {
      // base on lon
      const delLat = (endPosition[1] - startPosition[1]) / count
      if (startPosition[0] - endPosition[0] > 0) {
        dlt = -dlt
      }
      for (let i = 0; i < count; i++) {
        const h =
          height -
          (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
          Math.pow(L, 2)
        const lon = startPosition[0] + dlt * i
        const lat = startPosition[1] + delLat * i
        const point = new Cesium.Cartesian3.fromDegrees(lon, lat, h)
        result.push(point)
      }
    } else {
      // base on lat
      const delLon = (endPosition[0] - startPosition[0]) / count
      if (startPosition[1] - endPosition[1] > 0) {
        dlt = -dlt
      }
      for (let i = 0; i < count; i++) {
        const h =
          height -
          (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
          Math.pow(L, 2)
        const lon = startPosition[0] + delLon * i
        const lat = startPosition[1] + dlt * i
        const point = new Cesium.Cartesian3.fromDegrees(lon, lat, h)
        result.push(point)
      }
    }
    return result
  }
}
// 移除飞线
mapHelper.clearFlowInit = function () {
  if (entityFlowInit) {
    viewer.dataSources.remove(entityFlowInit)
    entityFlowInit = null
  }
}

// 隐藏全部地块
mapHelper.clearAllLand = function (_viewer) {
  if (!_viewer) return
  const diKuaiArr = config.diKuaiArr
  diKuaiArr.forEach(item => {
    const dataSource = _viewer.dataSources.getByName(item.label)
    dataSource[0].entities.values.forEach(item => {
      item.show = false
    })
  })
}

/**
 * 上下跳动特效
 * @method addParticle
 * @for mapHelper
 * @param  entity  参数   layer
 * @param  positon 参数 [lon,lat]
 */
mapHelper.openBounce = (entity, position) => {
  // 跳动最大高度
  const maxHeight = 10
  // 跳动速率
  const step = 0.1
  // 过程高度
  let height = 0
  // 跳动反转标记
  let statusForBounce = true

  entity._defaultPosition = entity._position
  // 弹跳回调
  entity._position = new Cesium.CallbackProperty(function (time, result) {
    if (statusForBounce) {
      height = height - step
      if (height <= 0) {
        statusForBounce = false
      }
    } else {
      height = height + step
      if (height >= maxHeight) {
        statusForBounce = true
      }
    }
    return Cesium.Cartesian3.fromDegrees(...position, height)
  }, false)
}
export default mapHelper

/**
 * 计算方位角
 * @param  targetPosition  参数 目标坐标
 * @param  cameraPosition  参数 摄像头坐标
 * @param  cameraOrientation  参数 摄像头默认角度
*/
mapHelper.calculateAzimuth = (targetPosition, cameraPosition, cameraOrientation) => {
  const deltaLat = targetPosition.lat - cameraPosition.lat
  const deltaLng = targetPosition.lng - cameraPosition.lng
  let azimuth = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI) // 方位角
  // 转换为摄像头的局部朝向
  azimuth -= cameraOrientation
  if (azimuth < 0) {
    azimuth += 360
  }
  return azimuth
}

// 计算仰角
mapHelper.calculateElevation = (targetPosition, cameraPosition) => {
  const distance = mapHelper.calculateDistance(cameraPosition, targetPosition)
  const altDiff = targetPosition.alt - cameraPosition.alt
  const elevation = Math.atan2(altDiff, distance) * 180 / Math.PI
  return elevation
}

// 计算两个经纬度点距离
mapHelper.calculateDistance = (position1, position2) => {
  const lat1 = position1.lat * Math.PI / 180
  const lat2 = position2.lat * Math.PI / 180
  const deltaLat = (position2.lat - position1.lat) * Math.PI / 180
  const deltaLng = (position2.lng - position1.lng) * Math.PI / 180
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = 6371e3 * c
  return distance
}

// 呼吸效果
mapHelper.addBreathingEffect = (entity) => {
  const startTime = Date.now()
  // 使用 CallbackProperty 动态设置材质
  entity.polygon.material = new Cesium.ColorMaterialProperty(
    new Cesium.CallbackProperty(function () {
      const elapsed = (Date.now() - startTime) / 1000 // 以秒为单位的时间
      const alpha = (Math.sin(elapsed * 2) + 1) / 2 // 0 到 1 之间的值
      const color = Cesium.Color.RED.withAlpha(alpha)
      return color
    }, false)
  )

  // 使用 CallbackProperty 动态设置高度缩放
  entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function () {
    const elapsed = (Date.now() - startTime) / 1000 // 以秒为单位的时间
    const scale = (Math.sin(elapsed * 2) + 1) * 50 // 0 到 100 之间的值
    return scale
  }, false)
}
