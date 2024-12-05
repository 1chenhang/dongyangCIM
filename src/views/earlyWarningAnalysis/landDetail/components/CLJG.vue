<template>
  <div class="banner">
    <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon :model="analySisData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="预警时间" prop="alarmTime">
            <el-date-picker
                v-model="analySisData.alarmTime"
                type="datetime"
                placeholder="请选择预警时间"
              />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="镇街信息" prop="townName">
            <el-input v-model="analySisData.townName"  auto-complete="off" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="摄像头信息" prop="deviceName">
            <el-input v-model="analySisData.deviceName"  auto-complete="off" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地块信息" prop="dkmc">
            <el-input v-model="analySisData.dkmc"  auto-complete="off" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="alarmType" label="预警类型">
            <div class="selectBox">
              <el-select v-model="analySisData.alarmType" placeholder="请选择" popper-class="selectMenuOption"
                suffix-icon="CaretBottom">
                <el-option v-for="item in yjlxOptions" :key="item.alarmType" :label="item.name" :value="item.alarmType"
                  style="background: #052243F5;" />
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="处理单位">
            <div class="selectBox">
              <el-select v-model="analySisData.handleUserId" @change="changeSelect" placeholder="请选择" popper-class="selectMenuOption"
                suffix-icon="CaretBottom">
                <el-option v-for="item in cldwOptions" :key="item.value" :label="item.nickname" :value="item.id"
                  style="background: #052243F5;" />
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="抓图显示">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in photoUrl" :key="item">
                <el-image :src="item.url" style="height: 407px;object-fit: cover;"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="处理结果">
            <div class="selectBox">
              <el-input v-model="handleResult" style="width: 500px;" :rows="3"  type="textarea" auto-complete="off" ></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上传处理附件">
            <upload />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btnList">
        <div @click="submit" class="btn btn1">
          <p>确定</p>
        </div>
        <div @click="emit('closeYj2')" class="btn btn2">
          <p>取消</p>
        </div>
      </div>
    </el-form>
  </div>

</template>

<script setup>
import { ElMessage,ElLoading } from 'element-plus'
import upload from '@/components/uploadFile/index'
import { ref, defineProps, toRefs, watch, defineEmits,onMounted,nextTick } from 'vue'
import $bus from '@/utils/eventBus.js'
import { alarmListPage,alarmHandleResult } from '@/api/chart'
import { getLandInfoByCamera, allUser,getAlarmType } from '@/api/camera'
const props = defineProps({
  // 唯一标识
  analySisData: {
    type: Object,
    default: () => {}
  }
})

const { analySisData } = toRefs(props)
const emit = defineEmits(['closeYj2'])
const photoUrl = ref([]);
const loading = ref();

const cldwOptions = ref([])

const yjlxOptions = ref()

const changeSelect = (val) =>{
  console.log(val,'选中的值')
}

loading.value = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.4)'
})
//获取预警类型
const getAlarmTypeList = async () => {  
    let res = await getAlarmType({});
    yjlxOptions.value = res.data;
    loading.value.close()
}

const getAllUser = async () =>{
  let res = await allUser({});
  cldwOptions.value = res.data;
}
getAllUser();
getAlarmTypeList();

const submit = async () => {
  analySisData.handleOrgName = '东阳总管理员'
  if(!attachs.value){
    ElMessage.warning('请上传处理附件')
  }
  let params = {
    alarmId:analySisData.value.id,
    attachs:attachs.value,
    handleResult:handleResult.value,
  }
  const { data, code } = await alarmHandleResult(params)
  if (code === '200') {
    ElMessage.success('处理成功')
    emit('closeYj2')
  }
}
const attachs = ref();
const handleResult = ref();
onMounted(() => {
    $bus.on('urlId', (e) => {
      attachs.value = e;
    })
    $bus.on('analySisData', (e) => {
        analySisData.value = e;
    })
})

watch(analySisData.value, (newValue, oldValue) => {
  analySisData.value = newValue;
  analySisData.value.alarmType = Number(analySisData.value.alarmType)
  console.log(newValue,'newValuenewValue')
  if(newValue.alarmHandle){
    analySisData.value.handleUserId = newValue.alarmHandle.handleUserId 
  }
  photoUrl.value = [];
  if(newValue.alarmImageUrl){
      let str = newValue.alarmImageUrl.split(',');
      str.forEach(item => {
        let obj = {
          url:''
        }
        obj.url = 'api/ftpFile/download?path='+item;
        photoUrl.value.push(obj);
      });
  }
}, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
::v-deep.banner {
  padding: 20px 30px;
  height: 650px;
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
