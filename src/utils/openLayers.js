import { ref, onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
// import OSM from 'ol/source/OSM'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { get as getProjection } from 'ol/proj.js'
import { getWidth, getTopLeft } from 'ol/extent.js'
import { Polygon, LinearRing } from 'ol/geom'
export default function useOpenLayers () {
  const map = ref(null)
  onMounted(() => {
    map.value = new Map({
      target: 'map',
      layers: [
        // new TileLayer({
        //   source: new OSM()
        // })
      ],
      view: new View({
        projection: 'EPSG:4326', // 使用这个坐标系
        center: [104.704968, 31.540962], // 西南科技大学
        zoom: 15

      })
    })

    const projection = getProjection('EPSG:3857')
    const projectionExtent = projection.getExtent()
    const size = getWidth(projectionExtent) / 256
    const resolutions = new Array(18)
    const matrixIds = new Array(18)
    for (let z = 1; z < 19; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = size / Math.pow(2, z)
      matrixIds[z] = z
    }
    const taindiLayer = new TileLayer({
      // opacity: 0.7,
      source: new WMTS({
        url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=be50c7492442ecf4e61ca7bd578d6b8b',
        layer: 'img', // 注意每个图层这里不同
        matrixSet: 'w',
        format: 'tiles',
        style: 'default',
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        wrapX: true
      })
    })
    map.value.addLayer(taindiLayer)
  })
  return {
    map
  }
}

/**
* APIMethod:OpenLayers绘制扇形的接口扩展
* @param origin 圆心
* @param radius 半径
* @param sides 边数 建议100 少了有棱角，多了增加计算量
* @param r 弧度
* @param angel 旋转角度
*/

export const createRegularPolygonCurve = (origin, radius, sides, r, angel) => {
  const rotation = 360 - r
  let angle = Math.PI * ((1 / sides) - (1 / 2))
  if (rotation) {
    angle += (rotation / 180) * Math.PI
  }
  let rotatedAngle, x, y
  const points = []
  for (let i = 0; i < sides; ++i) {
    const an = i * ((360 - rotation) / 360)
    rotatedAngle = angle + (an * 2 * Math.PI / sides)
    x = origin[0] + (radius * Math.cos(rotatedAngle))
    y = origin[1] + (radius * Math.sin(rotatedAngle))
    points.push([x, y])
  }
  if (rotation !== 0) {
    points.push(origin)
  }
  const ring = new LinearRing(points)
  ring.rotate(angel / 57.3, origin)
  const list = ring.getCoordinates()
  const polygon = new Polygon([list])
  return {
    polygon: polygon,
    linearRing: ring
  }
}

export const setRadius = (origin, radius, sides, r, angel, linearRing, polygon) => {
  const rotation = 360 - r
  let angle = Math.PI * ((1 / sides) - (1 / 2))
  if (rotation) {
    angle += (rotation / 180) * Math.PI
  }
  let rotatedAngle, x, y
  const points = []
  for (let i = 0; i < sides; ++i) {
    const an = i * ((360 - rotation) / 360)
    rotatedAngle = angle + (an * 2 * Math.PI / sides)
    x = origin[0] + (radius * Math.cos(rotatedAngle))
    y = origin[1] + (radius * Math.sin(rotatedAngle))
    points.push([x, y])
  }
  if (rotation !== 0) {
    points.push(origin)
  }
  linearRing.setCoordinates(points)
  linearRing.rotate(angel / 57.3, origin)
  const list = linearRing.getCoordinates()
  polygon.setCoordinates([list])
}
