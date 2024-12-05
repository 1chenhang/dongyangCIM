<template>
  <div class="list_box">

    <el-input class="el_input" v-model="filterText" @keyup.enter="treeRef.filter(filterText)" :suffix-icon="Search"
      placeholder="请输入摄像头名称" />
      <el-button class="btn1" type="primary" @click="btnClick" v-show="props.isShowBtn">地图选点</el-button>
      <el-button class="btn1" type="primary" @click="btnClick2" v-show="props.isShowBtn">摄像头规划</el-button>
    <div class="tree_wrapper">
      <h2 class="tips">( <span class="online">{{allOnline}}</span> 在线 <span class="error"> {{allError}} </span> 离线 ) </h2>
      <el-tree :data="treeData" style="background: transparent;" :props="defaultProps" node-key="id" show-checkbox
        :current-node-key="currentKey" :filter-node-method="filterNode" @node-click="handleCheckClick" ref="treeRef">
        <template v-slot="{ node, data }">
          <span v-if="data.children">
            <el-icon class="tree_icon">
              <component :is="iconComponent(data.icon)" />
            </el-icon>
            <span>{{ node.label }}</span><span class="cameraStatus"> (<span class="online">{{data.online}}</span> 在线 / <span class="error">{{ data.error }}</span> 离线 )</span>
          </span>
          <div v-else>
            <span style="color: #1890FF;margin-right: 8px" class="iconfont icon-shexiangtou-"></span>
            <span>{{ node.label }}</span> <span :class="['cameraStatus',data.status==='1'?'online':'error']">({{data.status=== '1' ? '在线' : '离线'}})</span>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
  <p class="mapText" v-show="hideText" ref="mapText">点击地图选点</p>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps, onMounted, onUnmounted } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import mapHelper from '@/utils/mapHelper'
import $bus from '@/utils/eventBus.js'
import { getPreviewUrl } from '@/api/camera'
const props = defineProps({
  isShowBtn: {
    type: Boolean,
    default: false
  }
})
const mapText = ref()
const { state } = useStore()
const cameraList = ref([])
const treeRef = ref()
const filterText = ref('')
const defaultCheckedKeys = ref([])
const currentKey = ref(1)
const hideText = ref(false)
cameraList.value = computed(() => state.cameraData)
const treeData = ref([])
const allOnline = ref(0)
const allError = ref(0)
const defaultProps = {
  children: 'children',
  label: 'label'
}
const defaultExpandedKeys = []
onMounted(() => {
  $bus.on('hideText', () => {
    hideText.value = false
  })
})
onUnmounted(() => {
  $bus.off('hideText')
})
const handleCheckClick = async (data, checked, indeterminate) => {
  if (data.type === '摄像头') {
    console.log(data)

    $bus.emit('cameraClick', data)
  }
  if (data.type === '街道') {
    flyToStreet(data.label)
  }
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.label?.includes(value)
}
function iconComponent (iconName) {
  return Icons[iconName]
}
const filterCamera = () => {
  if (cameraList.value.length === 0) return
  allOnline.value = 0
  allError.value = 0
  const map = cameraList.value.reduce((acc, obj) => {
    if (!acc[obj.townName]) {
      acc[obj.townName] = []
    }
    acc[obj.townName].push(obj)
    return acc
  }, {})
  const result = Object.values(map).filter(group => group.length > 0)
  treeData.value = []
  result.forEach((item, index) => {
    let online = 0
    let error = 0
    item.forEach((aItem) => {
      aItem.label = aItem.deviceName
      aItem.type = '摄像头'
      if (aItem.status === '1') {
        online++
        allOnline.value++
      } else {
        error++
        allError.value++
      }
    })
    treeData.value.push({
      id: index,
      label: item[0].townName || '未分类',
      type: '街道',
      children: item,
      icon: 'FolderOpened',
      online: online,
      error: error
    })
  })
  console.log(treeData.value, '--treeData.value')
}
const flyToStreet = (label) => {
  if (label === '未分类') return
  const dataSource = viewer.dataSources.getByName('行政区线')[0]
  const id = 'xzq' + label
  const entity = dataSource.entities.getById(id)
  const lonLat = mapHelper.getEntityLoaLat(entity)
  mapHelper.flyToByCameraInfo([lonLat[0], lonLat[1], 37029.780051075584,
    7.053273801491036,
    -89.9897423507347, 0])
}
const btnClick = () => {
  hideText.value = true
  function handleMouseMove (e) {
    mapText.value.style.left = e.pageX + 'px'
    mapText.value.style.top = e.pageY + 'px'
  }
  document.addEventListener('mousemove', handleMouseMove)
  $bus.emit('handleMouseMove', handleMouseMove)
}
const btnClick2 = () =>{
  hideText.value = true
  function handleMouseMove2 (e) {
    mapText.value.style.left = e.pageX + 'px'
    mapText.value.style.top = e.pageY + 'px'
  }
  document.addEventListener('mousemove', handleMouseMove2)
  $bus.emit('handleMouseMove2', handleMouseMove2)
}
watch(cameraList.value, (newValue) => {
  if (newValue) {
    cameraList.value = newValue
    filterCamera()
  }
}, { deep: true, immediate: true })
watch(filterText, (val) => {
  treeRef.value.filter(val)
})
</script>

<style lang="less" scoped>
.list_box {
  width: 420px;
  margin-top: 20px;

  .el_input {
    border: 0px;
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

::v-deep .el-tree-node:focus>.el-tree-node__content {
  background-color: transparent
}

::v-deep .el-checkbox__inner {
  border: 1px solid #0674C1;
  background-color: #296FBF5C;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #296FBFD6;
  border-color: #0674C1;
}

.tree_wrapper {
  height: 599px;
  margin: 15px 0px 56px 16px;
  box-sizing: border-box;
  overflow-y: scroll;

  .tree_icon {
    margin-right: 3px;
    color: #1890FF;
  }

  /deep/ .el-tree {
    color: #fff;
    font-size: 14px;
  }

  /deep/ .el-tree-node__expand-icon {
    display: none !important;

  }

  // /deep/ .el-tree .el-tree-node.is-current .el-tree-node__content {
  //   background-color: transparent;
  //   /* 选中项目的背景色 */
  //   color: #1890FF;
  //   /* 选中项目的文字颜色 */
  // }

  /deep/ .el-tree .el-tree-node.is-hover .el-tree-node__content {
    background-color: red;
    /* 设置背景色透明或和树节点一样的颜色 */
  }

  // 鼠标经过节点时高亮样式
  /deep/ .el-tree-node__content:hover {
    background-color: #0d519d73;
  }
}

.btn_warpper {
  .btn {
    width: 284px;
    height: 60px;
    background: transparent;
    color: #fff;
    font-size: 16px;
    line-height: 60px;
    text-align: center;
    margin: 0 auto;
  }

  .btn1 {
    display: block;
    background-image: url('../../../../public/image//earlyWarningAnalysis/btn_bg_1.png');
    background-size: 100%;
  }

  .btn2 {
    display: block;
    background-image: url('../../../../public/image//earlyWarningAnalysis/btn_bg_2.png');
    background-size: 100%;
  }
}

div::-webkit-scrollbar {
  width: 4px;
}

div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(145, 75, 75, 0.2);
  opacity: 0.2;
  background: #2a3d5d;
  height: 100px;
}

div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
}
.cameraStatus{
  margin-left: 8px;
}
.online{
  color: #0edd0e;
}
.error{
  color: #c01010;
}
.tips{
  font-size: 14px;
  color: #fff;
}
.mapText{
  color: #fff;
  font-size: 14px;
  position: fixed;
  z-index: 15;
  cursor: none;
  user-select: none;
  pointer-events: none;
}
.btn1{
  background-color: rgba(13, 81, 157, 0.45);
  margin-top: 15px;
}

</style>
