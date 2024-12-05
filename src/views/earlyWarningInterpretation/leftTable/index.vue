<template>
  <div class="tabBox">
    <img class="tabTip tabLeft" :src="require('/public/image/earlyWarningInterpretation/tabTip.png')" alt="">
    <img class="tabTip tabRight" :src="require('/public/image/earlyWarningInterpretation/tabTip.png')" alt="">
    <ul class="flexBox">
      <li @click="tabClick(item.value)" v-for="item in tabs" :key="item.label"
        :class="['tabs', isTabActive === item.value ? 'tabActive' : '']">{{ item.label }}
      </li>
    </ul>

  </div>
  <div class="selBox">
    <el-select clearable v-model="value" placeholder="请选择" style="width: 100%" suffix-icon="CaretBottom">
      <el-option v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" style="background: #052243F5;
" />
    </el-select>
    <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期" />
  </div>
  <div class="camera_List">
    <div @click="tableClick(item)" :class="['camera_Item', isTableActive === item.id ? 'tableActive' : '']"
      v-for="item in tableList" :key="item.camera">
      <div class="item_title">

        <span>{{
          item.title }}</span>
      </div>
      <div class="item_content">
        <div class="textBox"><span class="camera_label">街道：</span>
          <div class="camera_value">{{ item.address }}</div>
        </div>
        <div class="textBox"><span class="camera_label">地块名称：</span>
          <div class="camera_value">{{ item.massif }}</div>
        </div>
        <div class="textBox"><span class="camera_label">摄像头：</span>
          <div class="camera_value">{{ item.camera }}</div>
        </div>
        <div class="textBox"><span class="camera_label">时间：</span>
          <div class="camera_value">{{ item.dateTime
            }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { postCalculateAngle } from '@/api/index'
import CircleDiffusion from '@/utils/diffuse.js'
import mapHelper from '@/utils/mapHelper.js'
const isTabActive = ref(2)
const isTableActive = ref()
const value = ref()
const value1 = ref()
let dataSource = null
let circleDiffusion = null

const tabs = ref([
  {
    label: '未判读',
    value: 1
  },
  {
    label: '已判读',
    value: 2
  },
  {
    label: '处理中',
    value: 3
  }
])
onMounted(() => {
  circleDiffusion = new CircleDiffusion(viewer, 'circle')
  dataSource = new Cesium.GeoJsonDataSource()
  AddCamera()
})
onUnmounted(() => {
  if (dataSource.entities) dataSource.entities.removeAll()
  circleDiffusion.clear()
})
const warnOptions = ref([
  {
    label: '摄像头1',
    value: '摄像头1'
  },
  {
    label: '摄像头2',
    value: '摄像头2'
  }

])
const tableList = ref([
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    massif: '东阳市百盛实业发展有限公司',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 1,
    lon: '120.22913052210848',
    lat: '29.28677183302573'
  },
  {
    title: '发现山火',
    address: '江北街道',
    camera: '东阳塘下前基站',
    massif: '东阳市百盛实业发展有限公司',
    dateTime: '2022-03-11 11:04:19',

    status: 2,
    id: 2,
    lon: '120.2353078111537',
    lat: '29.269804964235046'
  },

  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    massif: '东阳市百盛实业发展有限公司',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 3,
    lon: '120.23414219516366',
    lat: '29.278861558341816'
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    massif: '东阳市百盛实业发展有限公司东阳市百盛实业发展有限公司东阳市百盛实业发展有限公司',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 4,
    lon: '120.23662380637965',
    lat: '29.274203804178324'
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    massif: '东阳市百盛实业发展有限公司',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 5,
    lon: '120.2354794011451',
    lat: '29.2695593721365'
  },
  {
    title: '发现吊车',
    address: '江北街道',
    camera: '东阳塘下前基站',
    massif: '东阳市百盛实业发展有限公司',
    dateTime: '2022-03-11 11:04:19',
    status: 1,
    id: 6,
    lon: '120.22009573892775',
    lat: '29.270104222854282'
  }
])
const AddCamera = () => {
  tableList.value.forEach(item => {
    const entityImg = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(+item.lon, +item.lat, 20),
      id: 'camera' + item.id,
      billboard: {
        scale: 1,
        image: './image/components/icon_camera.png',
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置在地球底部
        disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被覆盖
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 26000) // 可视缩放距离范围
        // width: this.getBillboardWidth(),
        // height: 64
      }
    })
    dataSource.entities.add(entityImg)
    mapHelper.openBounce(entityImg, [+item.lon, +item.lat])
    circleDiffusion.add([+item.lon, +item.lat], '#19EBC569', 50, 2000)
  })

  viewer.dataSources.add(dataSource)
}
const tabClick = (value) => {
  isTabActive.value = value
}
const tableClick = (param) => {
  isTableActive.value = param.id
  const entity = dataSource.entities.getById('camera' + param.id)
  viewer.flyTo(entity, { offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(358.29555605133936), Cesium.Math.toRadians(-25.978412915396504), 450) })
}

</script>

<style lang="less" scoped>
.tabBox {
  height: 42px;
  background: linear-gradient(90deg, rgba(3, 119, 255, 0) 0%, rgba(3, 119, 255, 0.24) 49.32%, rgba(3, 119, 255, 0) 100%);
  position: relative;
  margin-top: 17px;

  .tabTip {
    position: absolute;
    top: 4px;

  }

  .tabLeft {
    left: 0;
  }

  .tabRight {
    right: 0;
    transform: scaleX(-1);
  }

  .flexBox {
    display: flex;
    align-items: center;
    justify-content: center;

    .tabs {
      width: 134px;
      font-family: PMZD;
      font-size: 18px;
      letter-spacing: 0.12em;
      color: #FFFFFFCC;
      text-align: center;
      line-height: 42px;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        filter: brightness(130%);
        color: #FFFFFF;
      }
    }

    .tabActive {
      background-image: url('/public/image/earlyWarningInterpretation/tab_选中_bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      color: #FFFFFF;
      box-shadow: 0px 1px 0px 0px #0B1056;
    }
  }

}

::v-deep.selBox {
  margin-top: 20px;

  .el-select {
    margin-bottom: 10px;

    .el-select__wrapper {
      min-height: 36px;
      background: #0D519D73;
      box-shadow: none;
      border: 1px solid #2A8DE8C7;

    }

    .el-select__caret {
      font-size: 16px;
      color: #0B80E3;
    }

    .el-select__placeholder.is-transparent {
      color: #FFFFFF80 !important;
    }

    .el-select__placeholder {
      color: #fff;
    }

  }

  .el-date-editor.el-input__wrapper {
    width: 100%;
    box-sizing: border-box;
    min-height: 36px;
    background: #0D519D73;
    box-shadow: none;
    border: 1px solid #2A8DE8C7;

    .el-range-separator {
      color: #FFFFFF80;
    }

    .el-range-input {
      color: #fff;
    }
  }
}

.camera_List {
  height: 615px;
  overflow-y: auto;
  color: #fff;
  margin-top: 20px;
}

.camera_Item {
  height: 174px;
  margin-bottom: 26px;

  font-size: 13px;
  background-image: url('/public/image/earlyWarningInterpretation/卡片_bg1.png');
  transition: all .3s;
  cursor: pointer;

  &:hover {
    filter: brightness(150%);
  }

  .textBox {
    padding: 8px 15px 5px 40px;
    position: relative;
    display: flex;

    .camera_label {
      font-size: 14px;
      color: #2DCAEB;

    }

    &::before {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2DCAEB3D;
      position: absolute;
      top: 15px;
      left: 20px;
    }

    .camera_value {
      width: 290px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .item_title {
    display: flex;
    padding: 5px 16px;
    font-size: 16px;
    color: #5EFEE1;
  }
}

.tableActive {
  background-image: url('/public/image/earlyWarningInterpretation/卡片_bg2.png');
  filter: brightness(150%);

  .item_title {
    color: #E3CD65;
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
</style>
<style>
.el-popper__arrow {
  display: none;
  /* 隐藏小三角图案 */
}

.el-select-dropdown__list {
  padding: 0;
  border-radius: 4px;
  border: 1px solid #0B7FE2;
}

.el-select-dropdown__item {
  color: #fff;
  border-bottom: 1px solid #0B7CDC3B;
}

.el-popper.is-light {
  border: none;
}

.el-select-dropdown__item:hover {
  color: rgb(213, 215, 230);
  background: linear-gradient(90deg, rgba(11, 132, 244, 0) 0%, rgba(11, 132, 244, 0.42) 52.16%, rgba(11, 132, 244, 0) 100%), #052243F5 !important;
}

.el-picker-panel {
  background: #03213EE5;
  color: #fff;
}

.el-date-table th {
  border-bottom: solid 1px #0A8CEA;
}

.el-date-table td.in-range .el-date-table-cell {
  background-color: transparent;
}

.el-date-table td.in-range .el-date-table-cell:hover {
  background-color: transparent;
}

.el-popper.is-light {
  background-color: transparent;
}

.el-date-range-picker__content.is-left {
  border-right: 1px solid #0A8CEA;
}
</style>
