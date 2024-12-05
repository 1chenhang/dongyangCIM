import Polygon from 'ol/geom/Polygon';
import Feature from 'ol/Feature';
import { fromLonLat, toLonLat,transform } from 'ol/proj';

var mapCommon = {};

// 创建面
mapCommon.creatPolygonByFeatures = function(polygonFeatures,mapObj,obj){
    mapObj = mapObj || window.map
    let styles = {
        fillColor:'rgba(255, 255, 255, 0.5)'
    }
    if (obj) {
        if (obj['fillColor']) styles.fillColor = obj['fillColor']
    }
    
    let styleGeoJson = new ol.style.Style({
        stroke: new ol.style.Stroke({ //边界样式
            width: 1,
            color: '#319FD3'
        }),
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: styles.fillColor
        }),
        text: new ol.style.Text({ //文本样式
          text:'',
          font: '26',
          fill: new  ol.style.Fill({
              color: '#ff0033'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
    })
    let currdrawLayer =  new ol.source.Vector({
        features: polygonFeatures
      })
    let vectorPolygons = new ol.layer.Vector({
      source: currdrawLayer,
      style:styleGeoJson
    })
    mapObj.addLayer(vectorPolygons)
    return vectorPolygons
}
// 高亮面
mapCommon.lightPolygon = function(polygonFeatures,mapObj){
    mapObj = mapObj || window.map
    let styleGeoJson = new ol.style.Style({
        stroke: new ol.style.Stroke({ //边界样式
            width: 1,
            color: '#ff0033'
        }),
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 0, 0, 0.5)'
        }),
        text: new ol.style.Text({ //文本样式
          text:'',
          font: '26',
          fill: new  ol.style.Fill({
              color: '#ff0033'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
    })
    let currdrawLayer =  new ol.source.Vector({
        features: polygonFeatures
      })
    let vectorPolygons = new ol.layer.Vector({
      source: currdrawLayer,
      style:styleGeoJson
    })
    mapObj.addLayer(vectorPolygons)
    return vectorPolygons
},

// 定位
mapCommon.flyToByGeometry = function(geometry,mapObj){
    mapObj = mapObj || window.map
    if (geometry && geometry.coordinates) {
        let point = []; 
        if (geometry.type == 'Polygon') {
          point = geometry.coordinates[0][0]
          mapObj.getView().setCenter(point)
          mapObj.getView().setZoom(13)
        }else if (geometry.type == 'Point') {
          point = geometry.coordinates
          mapObj.getView().setCenter(point)
          mapObj.getView().setZoom(15)
        }
    }
},

// 创建一个从扇形底部向上延伸的扇形
mapCommon.startExtendAnimation= function(center, initialRadius, startAngle, endAngle, vectorSource) {
    let currentRadius = 0;
    const increaseStep = initialRadius / 100;
  
    // 清除过去的动画
    function clearAnimation() {
      currentRadius = 0;
      vectorSource.clear(true);
    }
  
    function animateExtend() {
      currentRadius += increaseStep;
      if (currentRadius > initialRadius) {
        clearAnimation();
      }
      const extendPolygon = mapCommon.createSector(center, startAngle, endAngle, currentRadius);
      const extendFeature = new Feature(extendPolygon);
  
      vectorSource.clear(true);
      vectorSource.addFeature(extendFeature);
  
      requestAnimationFrame(animateExtend);
    }
  
    animateExtend(); // 启动动画
}

// 动态创建扇形特征
mapCommon.createSector = function(lonLatCenter, startAngle, endAngle, radius) {
    //将经纬度中心点转换为投影坐标系
    const center = fromLonLat(lonLatCenter);
    const points = [center]; // 初始化点数组，并添加中心点

    for (let i = startAngle; i <= endAngle; i++) {
      const radians = (Math.PI / 180) * i;
      const x = center[0] + radius * Math.cos(radians);
      const y = center[1] + radius * Math.sin(radians);
      points.push([x, y]);
    }

    points.push(center); // 添加中心点闭合扇形特征
    // 将投影坐标系下的点转换会经纬度坐标系
    // 创建一个多边形几何对象
    const polygonCoordinates = points.map(point => toLonLat(point));
    return new Polygon([polygonCoordinates]);
}

//更新扇形区域
mapCommon.updateSector = function(event,centerCoordinates,extendSource) {
  // 获取点击的地图坐标
  const clickCoordinates = event.coordinate;
  // 将中心经纬度坐标转换为地图的投影坐标系
  const centerProj = fromLonLat(centerCoordinates);
  const clickProj = fromLonLat(clickCoordinates); 
  // 计算从中心点到点击点的距离，将其用作新半径
  const dx = clickProj[0] - centerProj[0];
  const dy = clickProj[1] - centerProj[1];
  const newRadius = Math.sqrt(dx * dx + dy * dy);
  // 计算点击点的角度
  const clickAngle = Math.atan2(dy, dx);
  // 创建扇形的起始和结束角度
  let startAngle = clickAngle - Math.PI / 8;
  let endAngle = clickAngle + Math.PI / 8;

  // 修正角度值，确保它们在 0 到 2π 之间
  startAngle = (startAngle + 2 * Math.PI) % (2 * Math.PI);
  endAngle = (endAngle + 2 * Math.PI) % (2 * Math.PI);

  // 如果结束角度小于开始角度，则加上 2π
  if (endAngle < startAngle) {
    endAngle += 2 * Math.PI;
  }

  // 将角度从弧度转换成度
  startAngle = startAngle * 180 / Math.PI;
  endAngle = endAngle * 180 / Math.PI;

  // 创建一个新的扇形区域
  let newSector = mapCommon.createSector(centerCoordinates, startAngle, endAngle, newRadius);
  // 如果需要，启动一个动态扩展动画。此动画可能会根据新半径进行调整。
  mapCommon.startExtendAnimation(centerCoordinates, newRadius, startAngle, endAngle, extendSource);
  
  return newSector;
}


export default mapCommon;