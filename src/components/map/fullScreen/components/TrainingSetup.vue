<template>
    <div class="banner">
      <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon :model="analySisData">
        <el-row>
          <el-col :span="24">
            <el-form-item label="开始训练时间" prop="trainingStartTime">
                <el-time-picker v-model="analySisData.trainingStartTime" format="HH:mm:ss"
    value-format="HH:mm:ss" placeholder="请选择时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
            <el-form-item prop="trainingEpochs" label="训练轮数">
              <div class="selectBox">
                <el-select v-model="analySisData.trainingEpochs" placeholder="请选择" popper-class="selectMenuOption"
                  suffix-icon="CaretBottom">
                  <el-option v-for="item in xllsOptions" :key="item.alarmType" :label="item.label" :value="item.value"
                    style="background: #052243F5;" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
            <el-form-item prop="trainingFrequency" label="训练频率">
              <div class="selectBox">
                <el-select v-model="analySisData.trainingFrequency" placeholder="请选择" popper-class="selectMenuOption"
                  suffix-icon="CaretBottom">
                  <el-option v-for="item in alarmTypeOptions" :key="item.value" :label="item.label" :value="item.value"
                    style="background: #052243F5;" />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="自动应用训练模型" >
                    <el-radio-group v-model="analySisData.isAutoApplyModel" class="ml-4">
                        <el-radio :label="true" size="large">是</el-radio>
                        <el-radio :label="false" size="large">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="训练模型" >
                  <el-radio-group v-model="analySisData.modelType" class="ml-4">
                      <el-radio :label="1" size="large">火灾烟雾</el-radio>
                      <el-radio :label="2" size="large">工程车辆</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="btnList">
          <div @click="submit" class="btn btn1">
            <p>保存</p>
          </div>
          <div @click="close" class="btn btn2">
            <p>取消</p>
          </div>
        </div>
      </el-form>
    </div>
  
  </template>
  
  <script setup>
  import { ElMessage,ElLoading } from 'element-plus'
  import { ref, defineProps, toRefs, watch, defineEmits,onMounted,nextTick } from 'vue'
  import $bus from '@/utils/eventBus.js'
  import { alarmListPage,alarmHandleResult } from '@/api/chart'
  import { getLandInfoByCamera, allUser,autoTrainAdd } from '@/api/camera'
  
  

  const close = () => {
      $bus.emit('closeYj2');
  }
  const analySisData = ref({
    trainingStartTime:'',
    trainingEpochs:null,
    isAutoApplyModel:true,
    trainingFrequency:null,
    modelType:1,
  });

  const alarmTypeOptions = ref([
    {label:'3天',value:3},
    {label:'7天',value:7},
    {label:'15天',value:15},
  ])
  const xllsOptions = ref([
    {label:'1轮',value:1},
    {label:'2轮',value:2},
    {label:'3轮',value:3},
    {label:'4轮',value:4},
    {label:'5轮',value:5},
    {label:'6轮',value:6},
    {label:'7轮',value:7},
    {label:'8轮',value:8},
    {label:'9轮',value:9},
    {label:'10轮',value:10},
    {label:'11轮',value:11},
    {label:'12轮',value:12},
    {label:'13轮',value:13},
    {label:'14轮',value:14},
    {label:'15轮',value:15},
    {label:'16轮',value:16},
    {label:'17轮',value:17},
    {label:'18轮',value:18},
    {label:'19轮',value:19},
    {label:'20轮',value:20},
  ])

  
  
  const resetForm = () =>{
    $bus.emit('automaticResult');
    analySisData.value = {
      trainingStartTime:'',
      trainingEpochs:null,
      isAutoApplyModel:true,
      trainingFrequency:null,
      modelType:1,
    };
  }
  
  const submit = async () => {
    const { data, code } = await autoTrainAdd(analySisData.value)
    if (code === '200') {
        ElMessage.success('训练中')
    }
    resetForm();
  }
  const attachs = ref();
  onMounted(() => {
      $bus.on('urlId', (e) => {
        attachs.value = e;
      })
      $bus.on('analySisData', (e) => {
          analySisData.value = e;
      })
  })
  </script>
  
  <style lang="less" scoped>
  ::v-deep.banner {
    padding: 20px 30px;
    overflow: hidden;
    overflow-y: scroll;
    .el-form-item__label{
      color: #fff;
    }
    .el-input__suffix .el-input__icon {
      color: #fff;
      /* 图标颜色 */
      font-size: 15px;
      /* 图标大小 */
      padding-right: 16px;
    }
  
   .el-input__wrapper {
      width: 250px;
      box-sizing: border-box;
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
    .el-input__prefix-inner{
      padding-left: 10px;
    }
  
   .el-input__inner {
      width: 250px;
      height: 36px;
      font-size: 15px;
      border: 10px;
      color: #fff;
      padding: 10px;
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

/deep/ .el-checkbox__label{
  color: #fff;
}

.login-form /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #fff;
}
.login-form /deep/ .el-input__prefix{
    color: #fff;
}
</style>
  