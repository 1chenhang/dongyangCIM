<template>
  <div class="container">
    <Statistion v-if="tabs === 1" />
    <VideoManagement v-if="tabs === 2" />
    <PhotoManagement v-if="tabs === 3" />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, onBeforeUnmount, onMounted,toRefs } from 'vue'
import { useStore } from 'vuex'
import $bus from '@/utils/eventBus.js'
import { alarmConfigEdit, alarmConfigList, alarmConfigDel, getAlarmType } from '@/api/camera'
import { alarmListPage } from '@/api/chart'
import BaseDialog1 from '@/components/BaseDialog1'
import { ElMessage, ElMessageBox } from 'element-plus'
import htmlDocx from 'html-docx-js/dist/html-docx'
import Statistion from './statistics/index.vue'
import VideoManagement from './videoManagement/index.vue'
import PhotoManagement from './photoManagement/index.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const {query} = toRefs(route)
const tabs = ref(1);
watch(query, async (newValue, oldValue) => {
    if(newValue.tabs){
      tabs.value = Number(newValue.tabs);
    }
}, { deep: true ,immediate:true});

</script>

<style lang="less" scoped>
.container {
  
  height: 100%;
}

.tableWrapper {
  height: 500px;
  box-sizing: border-box;
}

.pagination {
  margin: 20px;
  height: 100px;
}

::v-deep.el-table {
  .el-table__cell {
    padding: 5px;
  }
}

.el-table {
  height: 156px;
  color: #fff;
}

::v-deep.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #0E509B73 !important;
}

::v-deep .el-table__body {
  border-collapse: separate !important;
  border-spacing: 0 2px !important;
  table-layout: auto !important;
}

::v-deep .el-table,
.el-table__expanded-cell {
  background-color: #1c252d;
}

::v-deep .el-table__row {
  height: 36px;
  /* 你想要的行高 */
  background: #0E509B73 !important;
}

::v-deep .el-table--enable-row-transition,
.el-table .cell {
  background-color: #1c252d;
}

::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #1c252d;
}

::v-deep.el-table tr {
  background: #04264E85;
}

::v-deep.el-table td.el-table__cell,
::v-deep.el-table th.el-table__cell.is-leaf {
  border: none;
}

::v-deep.el-table th.el-table__cell {
  background-color: transparent;
}

::v-deep .el-table__inner-wrapper::before {
  z-index: 0;
  height: 0 !important;
}


.custom-pagination {
  margin: 0 5px;
  border-radius: 3px;
  color: #fff;
}

.custom-pagination /deep/ .el-select__wrapper {
  background-color: rgba(144, 141, 141, 0.1);
  border: 0px;
}

.custom-pagination /deep/ .el-select__placeholder {
  color: #fff;
}

.custom-pagination /deep/ .el-input__wrapper {
  background-color: rgba(144, 141, 141, 0.1);
  color: #fff;
}

.custom-pagination /deep/ el-input__inner {
  color: #fff;
}

/deep/.el-pagination {
  --el-pagination-bg-color: rgba(144, 141, 141, 0.1) !important;
  --el-pagination-button-disabled-bg-color: rgba(144, 141, 141, 0.1) !important;
  --el-pagination-hover-color: #FFF !important;
  --el-pagination-text-color: #999 !important;
  --el-pagination-button-color: #999 !important;
}

::v-deep .el-pagination__total {
  color: #fff;
  font-size: 14px;
}

::v-deep .el-pager li {
  border: 1px solid #0674C1;
  margin-right: 8px;
  border-radius: 5px;
}

::v-deep .el-pagination__jump {
  color: #fff;
}

::v-deep.warpper {
  padding: 20px 30px;

  .el-form-item__label {
    color: #fff;
    line-height: 35px !important;
  }

  .el-input__suffix .el-input__icon {
    color: #fff;
    /* 图标颜色 */
    font-size: 15px;
    /* 图标大小 */
    padding-right: 16px;
  }

  .el-input__wrapper {

    background-color: rgba(13, 81, 157, 0.45);
    padding: 0px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
  }

  .el-textarea__inner {
    background-color: rgba(13, 81, 157, 0.45);
    padding: 10px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
    color: #fff;
  }

  .el-input__inner {
    padding-left: 15px;
    height: 36px;
    font-size: 15px;
    border: 0px;
    color: #fff;
  }
}

.btnList {
  display: flex;
  justify-content: center;

  .btn {
    width: 80px;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    line-height: 32px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      filter: brightness(130%);
    }
  }

  .btn1 {
    margin-right: 22px;
    background: linear-gradient(180deg, rgba(1, 79, 51, 0.8) 25%, rgba(21, 242, 189, 0.8) 100%);
    border: 2px solid #31DFB5;
    box-shadow: 0px 4px 14.6px 0px #25EAC680;

    p {
      background: linear-gradient(180deg, #FFFFFF 27.27%, #4DC7BF 100%);
      // text-shadow: 0px 2px 0px #00000080;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .btn2 {
    background: linear-gradient(180deg, rgba(1, 51, 79, 0.8) 25%, rgba(21, 136, 242, 0.8) 100%);

    border: 2px solid #318CDF;
    box-shadow: 0px 4px 14.6px 0px #258BEA80;

    p {
      background: linear-gradient(180deg, #FFFFFF 27.27%, #4D9BC7 100%);

      // text-shadow: 0px 2px 0px #00000080;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

::v-deep .selectBox {

  .el-select {
    .el-select__wrapper {
      min-height: 35px;
      background: url('/public/image/platformOverview/selectBg.png');
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: none;
    }

    .el-select-dropdown__item.selected {
      // background-color: #83e818!important; // 选中
    }

    .el-select-dropdown__item.hover {
      background-color: #498f6c !important; // hover
    }

    :deep .el-dropdown-menu__item:not(.is-disabled) {
      // color: #182F23!important; // disabled
    }

    .el-select-dropdown__item {
      color: #4FC78A !important; // 下拉项颜色
    }

    :deep .el-popper {
      background-color: #121f1b !important; // 展开下拉背景
      border: 1px solid #498f6c !important; // 展开下拉边框
    }

    :deep .el-popper .el-popper__arrow::before {
      border-top: 1px solid #498f6c !important; // 箭头按钮边框
      background-color: #121f1b !important; // 箭头按钮背景色
    }

    .el-select__caret {
      font-size: 16px;
      color: #0B80E3;
    }

    .el-select__placeholder {
      color: #fff;
    }
  }

  p {
    font-size: 14px;
    color: #fff;
  }

  .el-date-editor {
    color: #fff;
  }

  .el-date-editor .el-range__icon {
    margin-left: 10px;
    color: #fff;
  }

  .el-range-editor--small .el-range-input {
    color: #fff;
  }
}
</style>
