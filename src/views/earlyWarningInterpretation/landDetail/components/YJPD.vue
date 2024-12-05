<template>
  <div class="banner">
    <div class="selectBox">
      <p>预警种类：</p>
      <el-select v-model="value" placeholder="请选择" style="width: 202px" popper-class="selectMenuOption"
        suffix-icon="CaretBottom">
        <el-option v-for="item in cameraList" :key="item.value" :label="item.label" :value="item.value" style="background: #052243F5;
" />
      </el-select>
    </div>
    <div class="selectBox">
      <p>处置单位：</p>
      <el-select v-model="value" placeholder="请选择" style="width: 202px" popper-class="selectMenuOption"
        suffix-icon="CaretBottom">
        <el-option v-for="item in cameraList" :key="item.value" :label="item.label" :value="item.value" style="background: #052243F5;
" />
      </el-select>
    </div>
    <el-radio-group v-model="radio1">
      <el-radio :value="1">有效预警</el-radio>
      <el-radio :value="2">无效预警</el-radio>
    </el-radio-group>
    <div class="btnList">
      <div class="btn btn1">
        <p>确定</p>
      </div>
      <div class="btn btn2">
        <p>取消</p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const value = ref()
const radio1 = ref(1)

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

</script>

<style lang="less" scoped>
::v-deep.banner {
  padding: 20px 30px;

  .el-radio {
    color: #fff;

    .el-radio__inner {
      border: 1px solid #0B80E3;
      width: 14px;
      height: 14px;
      background-color: transparent;

      &:after {
        width: 5px;
        height: 5px;

        background-color: #0B80E3;
      }
    }

  }

  .btnList {
    display: flex;
    justify-content: center;
    margin-top: 18px;

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
}

::v-deep .el-radio__input.is-checked+.el-radio__label {
  color: #fff;
}

::v-deep .selectBox {
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  .el-select {
    .el-select__wrapper {
      min-height: 35px;
      background: url('/public/image/platformOverview/selectBg.png');
      background-size: cover;
      background-repeat: no-repeat;

      box-shadow: none;
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
