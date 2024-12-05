<template>
  <div class="banner">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in massifDate" :key="item.id" :label="item.label" :value="item.id" />
    </el-checkbox-group>
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
const massifDate = ref([
  {
    label: 'A地块',
    id: 1
  },
  {
    label: 'A地块',
    id: 2
  },
  {
    label: 'A地块',
    id: 3
  },
  {
    label: 'A地块',
    id: 4
  },
  {
    label: 'A地块',
    id: 5
  },
  {
    label: 'A地块',
    id: 6
  },
  {
    label: 'A地块',
    id: 7
  },
  {
    label: 'A地块',
    id: 8
  }, {
    label: 'A地块',
    id: 9
  }

])
const checkList = ref([1, 4])
</script>

<style lang="less" scoped>
::v-deep.banner {
  padding: 20px 30px;

  .el-checkbox {
    color: #fff;

    .el-checkbox__inner {
      border: 1px solid #0674C1;
      background-color: #296FBF33;
    }
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    border: 1px solid #3BA4ED !important;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #fff;
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
</style>
