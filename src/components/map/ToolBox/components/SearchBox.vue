<template>
    <div class="searchBox">
        <el-input class="el_input" v-model="searchValue" @keyup.enter="searchChange" :suffix-icon="Search"
        placeholder="请输入地名" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
const searchValue = ref('')
const pointArr = ref([])
let pointSource
onMounted(() => {
  pointSource = new Cesium.GeoJsonDataSource()
  pointSource.name = '地名搜索'
  viewer.dataSources.add(pointSource)
})
onUnmounted(() => {
  if (!viewer) return
  if (pointSource.entities) pointSource.entities.removeAll()
})
const searchChange = () => {
  const tk = '165a0404b0fc9b1d4612f0c947d5df92';
  const query = {
    postStr: JSON.stringify({
      keyWord: searchValue.value,
      queryType: '12',
      start: '0',
      count: '40',
      specify: '156330783' // 156330783 东阳, 156420106 武汉
    }),
    type: 'query',
    tk: tk
  }
  axios({
    method: 'get',
    url: 'http://api.tianditu.gov.cn/v2/search',
    params: query
  })
    .then((res) => {
      if (res.status === 200) {
        pointArr.value = res.data.pois
        getPoint()
        console.log(pointArr)
      }
    })
}
const getPoint = () => {
  if (pointSource.entities) pointSource.entities.removeAll()
  if (pointArr.value.length === 0) return
  pointArr.value.forEach(item => {
    const lon = item.lonlat.split(',')[0]
    const lat = item.lonlat.split(',')[1]
    const entityImg = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(+lon, +lat, 40),
      id: item.hotPointID,
      billboard: {
        scale: 0.5,
        image: './image/components/坐标点.png',
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
        disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
      },
      label: {
        text: item.name,
        font: '24px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 4,
        // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        // 设置文字的偏移量
        pixelOffset: new Cesium.Cartesian2(0, -100),
        // 设置文字的显示位置,LEFT /RIGHT /CENTER
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        // 设置文字的显示位置
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
      }
    })
    pointSource.entities.add(entityImg)
  })
  const entity = pointSource.entities.values[0]
  if (entity) viewer.flyTo(entity)
}
</script>

<style lang="less" scoped>
.searchBox {
    position: absolute;
    top: 30%;
    left: 40%;
    z-index: 11;
    background-color: rgba(13, 81, 157, 0.45);
    box-shadow: 0 0 0 1px #0B7FE2 inset;
    animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
  .el_input {
    border: 0px;
    width: 420px;
  }

  /deep/ .el-input__suffix .el-input__icon {
    color: #fff;
    /* 图标颜色 */
    font-size: 15px;
    /* 图标大小 */
    padding-right: 16px;
  }

  /deep/ .el-input__wrapper {
    background-color: rgba(13, 81, 157, 0.45);
    padding: 0px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
  }

  /deep/ .el-input__inner {
    padding-left: 15px;
    height: 36px;
    font-size: 15px;
    border: 0px;
    color: #fff;
  }

}
@keyframes slide-in-blurred-top {
  0% {
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 0%;
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
}
</style>
