<template>
    <div class="banner">
      <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon :model="analySisData">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row>
                <el-col :span="24">
                  <div v-for="item in waterList">
                    <el-form-item :label="item.name" >
                      <el-radio-group v-model="item.state" class="ml-4">
                        <el-radio label="0" size="large">隐藏</el-radio>
                        <el-radio label="1" size="large">显示</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </el-col>
            </el-row>
        </el-form>
        <div class="btnList">
          <div @click="submit" class="btn btn1">
            <p>确定</p>
          </div>
          <div @click="cancel" class="btn btn2">
            <p>取消</p>
          </div>
        </div>
      </el-form>
    </div>
  
  </template>
  
  <script setup>
  import { ElMessage } from 'element-plus'
  import { ref, defineProps, toRefs, watch, defineEmits } from 'vue'
  import { alarmInfoExcute } from '@/api/chart'
  import $bus from '@/utils/eventBus.js'
  import { watermarkAdd, watermarkEdit,watermarkList } from '@/api/camera'
  import { useRouter } from 'vue-router'
  const Router = useRouter()
  const props = defineProps({
  })
  const { analySisData,islook } = toRefs(props)
  const emit = defineEmits(['closeYj'])
  
  const waterList = ref([]);
  const geiWaterList = async () =>{
    let {data} = await watermarkList({});
    waterList.value = data;
  }
  const submit = async () => {
    let res = await watermarkEdit(waterList.value)
    if(res.code === '200'){
      ElMessage.success('修改成功')
    }
    geiWaterList();
  }

  const cancel = ()=>{
    Router.push({
        path: '/smartEvidence',
        query: { tabs: 1 }
    })  
  }
  geiWaterList();
  </script>
  
  <style lang="less" scoped>
  ::v-deep.banner {
    padding: 20px 30px;
    .el-form-item__label{
      color: #fff;
      margin-top: 4px;
    }
    
    .el-input__suffix .el-input__icon {
      color: #fff;
      /* 图标颜色 */
      font-size: 15px;
      /* 图标大小 */
      padding-right: 16px;
    }
    .el-form-item{
      margin-bottom: 10px;
    }
  
   .el-input__wrapper {
  
      background-color: rgba(13, 81, 157, 0.45);
      padding: 0px;
      box-shadow: 0 0 0 1px #0B7FE2 inset;
    }
    .el-textarea__inner{
      background-color: rgba(13, 81, 157, 0.45);
      padding: 10px;
      box-shadow: 0 0 0 1px #0B7FE2 inset;
      color: #fff;
    }
  
   .el-input__inner {
      width: 250px;
      padding-left: 15px;
      height: 36px;
      font-size: 15px;
      border: 0px;
      color: #fff;
    }
  }
  
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
  
  ::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: #fff;
  }
  
  
  ::v-deep .selectBox {
  
    .el-select {
      .el-select__wrapper {
        width: 250px;
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
  <style lang="less" scoped>
  .banner {
    color: #fff;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-carousel--horizontal{
    width: 600px;
  }
  </style>
  
  <style scoped>
  /* /deep/ .el-card{
  
      background-color: rgba(13, 81, 157, 0.45);
      padding: 0px;
      box-shadow: 0 0 0 1px #0B7FE2 inset;
  } */
  .dateTime_box{
      .time_item{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          i{
              font-size: 25px;
              color: #1890ff;
              line-height: 35px;
              cursor: pointer;
          }
          .icon_delete{
              color: red;
          }
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
  </style>
  