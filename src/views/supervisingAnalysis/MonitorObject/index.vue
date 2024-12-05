<template>
  <div class="wrapper">
    <div class="flexBox">
      <Tags class="mt5" title="监控对象统计分析"></Tags>
      <div class="tabBox">
        <div class="btnBOx">
            <FolderAdd />导出统计报表
        </div>
        <p class="timeText">统计时间：2024-04-28 10:20:42</p>
        <ul class="tab">
          <li @click="tabClick(item.id)" v-for="item in tabData" :key="item.label"
            :class="isTabActive === item.id ? 'tabActive' : ''">{{ item.label }}</li>
        </ul>
      </div>
    </div>
    <div class="selBox">
      <div class="selectBox">
        <p>监控对象类型</p>
        <el-select v-model="value" multiple placeholder="可以多选" style="width: 452px" popper-class="selectMenuOption"
          suffix-icon="CaretBottom">
          <el-option v-for="item in cameraList" :key="item.value" :label="item.label" :value="item.value" style="background: #052243F5;
" />
        </el-select>
      </div>
      <div class="selectBox" style="transform: translateX(-6px);">
        <p>所属街道</p>
        <el-select v-model="value" multiple placeholder="可以多选" style="width: 452px" popper-class="selectMenuOption"
          suffix-icon="CaretBottom">
          <el-option v-for="item in cameraList" :key="item.value" :label="item.label" :value="item.value" style="background: #052243F5;
" />
        </el-select>
      </div>
      <div class="selectBox" style="transform: translateX(-6px);">
        <p>所属村</p>
        <el-select v-model="value" multiple placeholder="可以多选" style="width: 452px" popper-class="selectMenuOption"
          suffix-icon="CaretBottom">
          <el-option v-for="item in cameraList" :key="item.value" :label="item.label" :value="item.value" style="background: #052243F5;
" />
        </el-select>
      </div>
    </div>
    <div class="contentBox">
      <div class="bgBox">
        <Tags3 title="违法情况"></Tags3>
        <WFQK />
      </div>
      <div class="bgBox">
        <Tags3 title="预警情况"></Tags3>
        <YSQK />
      </div>
      <div class="bgBox">
        <Tags3 title="预警数量"></Tags3>
        <YJSL />
      </div>
    </div>
  </div>

</template>

<script setup>
import Tags from '@/components/Tags/index'
import Tags3 from '@/components/Tags3/index'
import WFQK from './WFQK/echarts'
import YSQK from './YJQK/echarts'
import YJSL from './YJSL/echarts'
import { ref } from 'vue'
const isTabActive = ref(1)
const tabData = ref([
  {
    label: '实时',
    id: 1
  },
  {
    label: '昨天',
    id: 2
  },
  {
    label: '7天',
    id: 3
  },
  {
    label: '30天',
    id: 4
  },
  {
    label: '自定义',
    id: 5
  }
])
const value = ref([])
const cameraList = ref([
  {
    label: '摄像头1',
    value: '摄像头1'
  },
  {
    label: '摄像头2',
    value: '摄像头2'
  }

])
const tabClick = (id) => {
  isTabActive.value = id
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  z-index: 10;
  width: 1830px;
  height: 858px;
  background-image: url('/public/image/supervisingAnalysis/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  margin: 19px auto;
  padding: 25px 39px;
  box-sizing: border-box;

  .flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabBox {
      display: flex;
      align-items: center;

      .timeText {
        font-size: 14px;
        color: #fff;
        margin-right: 15px;
      }

      .tab {
        display: flex;
        align-items: center;

        li {
          width: 61px;
          height: 28px;
          background: #07518066;
          line-height: 28px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          border: 1px solid #14567B;
          border-left: none;
          cursor: pointer;
          transition: all .3s;

          &:hover {
            filter: brightness(150%);
          }

          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            border-left: 1px solid #14567B;
          }

          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }

        .tabActive {
          background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 0%, rgba(19, 169, 234, 0.8) 100%);
          border-radius: 4px;
          border: 1px solid #318CDF
        }
      }
      .btnBOx{
                width:  140px;
                height: 28px;
                background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 0%, rgba(19, 169, 234, 0.8) 100%);
                border-radius: 4px;
                border: 1px solid #318CDF;
                line-height: 28px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                border: 1px solid #14567B;
                border-left: none;
                cursor: pointer;
                transition: all .3s;
                margin-right: 20px;
                &:hover {
                    filter: brightness(150%);
                }

                &:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border-left: 1px solid #14567B;
                }

                &:last-child {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
                svg{
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -2px;
                    width: 20px; 
                    height: 20px; 
                    margin-right: 3px
                }
        }
    }
  }

  .contentBox {
    display: flex;
    margin-top: 30px;
    justify-content: space-between;

    .bgBox {
      width: 554px;
      height: 572px;
      background-image: url('/public/image/supervisingAnalysis/bg5.png');
      background-size: cover;
      background-repeat: no-repeat;

    }
  }
}

.selBox {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  .selectBox {
    display: flex;
    align-items: center;

    p {
      font-size: 14px;
      color: #fff;
      margin-right: 15px;
    }
  }
}

::v-deep.el-select {
  .el-select__wrapper {
    min-height: 36px;
    background: url('/public/image/supervisingAnalysis/selBg.png');
    background-size: cover;
    background-repeat: no-repeat;

    box-shadow: none;
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

  .el-select__tags-text {
    line-height: 28px;
  }

  .el-tag {
    background-color: #02244B73;
    border: 1px solid #0B7FE287;
    color: #2DCAEB;
    height: 28px;

    .el-icon {
      color: #2DCAEB;
      width: 16px;
      height: 16px;
      font-size: 16px
    }
  }

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
</style>
