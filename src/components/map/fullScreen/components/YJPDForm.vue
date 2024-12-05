<template>
  <div class="banner">
    <el-form ref="phoneDataRef" class="login-form" :inline="true" status-icon :model="form" label-width="80px">
          <el-row>
              <el-col :span="24">
                  <el-form-item label="类型设置">
                      <el-radio-group v-model="radio1">
                          <el-radio label="0">全自动取证</el-radio>
                          <el-radio label="1">重点取证</el-radio>
                      </el-radio-group>
                  </el-form-item>
              </el-col>
              <el-col :span="24" v-if="radio1 === '1'">
                  <el-form-item label="摄像头">
                    <div class="selectBox">
                      <el-select v-model="deviceIds" :disabled="isEdit" @change="changeSelect" multiple filterable clearable style="width:300px">
                        <el-option style="background: #052243F5;color:#fff" v-for="dict in cameraList" :key="dict.id"
                          :label="dict.deviceName" :value="dict.id" />
                      </el-select>
                    </div>
                  </el-form-item>
              </el-col>
              <el-col :span="24" v-if="radio1 === '1'">
                  <el-form-item label="巡检周期" porop="checkList">
                      <el-card class="box-card">
                        <div class="check_box">
                          <el-checkbox style="margin-right: 30px;" v-model="checked2" @change="handleCheckChange2">全部</el-checkbox>
                            <el-checkbox-group v-model="checkList" @change="handleCheckChange">
                              <el-checkbox label="星期日"></el-checkbox>
                              <el-checkbox label="星期一"></el-checkbox>
                              <el-checkbox label="星期二"></el-checkbox>
                              <el-checkbox label="星期三"></el-checkbox>
                              <el-checkbox label="星期四"></el-checkbox>
                              <el-checkbox label="星期五"></el-checkbox>
                              <el-checkbox label="星期六"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                          <div class="dateTime_box">
                              <div class="time_item" v-for="(item,index) in times" :kex="index">
                                  <div class="txt_label">时间段{{ index+1 }}</div>
                                  <el-time-picker
                                    style="width: 100px;"
                                      is-range
                                      v-model="item.value"
                                      value-format="HH:mm:ss"
                                      class="custom-time-picker"
                                      range-separator="至"
                                      placeholder="选择时间范围">
                                  </el-time-picker>
                                  <CirclePlus style="width: 2em; height: 2em; cursor: pointer; margin-right: 8px;color:#fff" @click="addItem" />
                                  <Remove style="width: 2em; height: 2em; cursor: pointer; margin-right: 8px;color:#fff" @click="deleteItem(index)" />
                                  <i class="el-icon-circle-plus-outline icon_add" @click="addItem"></i>
                                  <i class="el-icon-remove-outline icon_delete" @click="deleteItem(index)"></i>
                              </div>
                          </div>
                      </el-card>
                  </el-form-item>
                  
              </el-col>
          </el-row>
      <div class="btnList">
        <div @click="submitForm" class="btn btn1">
          <p>确定</p>
        </div>
        <div @click="close" class="btn btn2">
          <p>取消</p>
        </div>
      </div>
    </el-form>
  </div>

</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, defineProps, toRefs, watch, defineEmits,onUnmounted,onMounted} from 'vue'
import { forensicConfiglistPage,forensicConfigAdd,forensicConfigDel,forensicConfigEdit } from '@/api/camera'
import $bus from '@/utils/eventBus.js'
import { useStore } from 'vuex'
const { state } = useStore()
const cameraList = ref([])
const props = defineProps({
  currRow: {
    type:Object,
    default:()=>{}
  },
})

const deviceIds = ref([]);
const checked2 = ref(false);
const allLabels = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const times = ref([{ value: [] }]) // 初始化为5个表单项
const emit = defineEmits(['closeYj'])
const radio1 = ref('1')
const checkList = ref([]);



const handleCheckChange2 = (val) =>{
  if(val){
    handleCheckChange(allLabels);
  }else{
   handleCheckChange();
  }
}

const {currRow} = toRefs(props)

const changeSelect = (val) =>{
}
const handleCheckChange = (value) => {
  if(checked2.value && value.length === allLabels.length){
    checkList.value = [...allLabels];
  }else if(!checked2.value && !value){
    checkList.value = [];
  }else{
    checked2.value = false;
    checkList.value = value;
  }
};
const close = () => {
  resetForm();
  $bus.emit('closeYjpdFormDialog');
}

const resetForm = () =>{
  isEdit.value = false;
  deviceIds.value = [];
  checkList.value = [];
  times.value = [{ value: [] }];
}
const addItem = () => {
    times.value.push({ value: [] });
}
const deleteItem = (index) => {
  if (times.value.length > 1) {
    times.value.splice(index, 1);
  }
}
const submitForm = async () => {
  let newArr = times.value.map(item => {
    return {
      startTime: item.value[0],
      endTime: item.value[1]
    };
});

let arr = [];
checkList.value.forEach(item=>{
  if(item === '星期一'){
    arr.push(1)
  }else if(item === '星期二'){
    arr.push(2)
  }else if(item === '星期三'){
    arr.push(3)
  }else if(item === '星期四'){
    arr.push(4)
  }else if(item === '星期五'){
    arr.push(5)
  }else if(item === '星期六'){
    arr.push(6)
  }else if(item === '星期日'){
    arr.push(7)
  }
})

  let params = {
    id:forensicConfigId.value ? forensicConfigId.value :undefined,
    weeks:arr.join(','),
    deviceIds:deviceIds.value,
    times:newArr
  }
  let {code} = isEdit.value ? await forensicConfigEdit(params):await forensicConfigAdd(params);
  
  if(code === '200'){
    ElMessage.success('操作成功');
  }else{
    ElMessage.success('操作失败');
  }
  close()
}

const forensicConfigId = ref(undefined);
const isEdit = ref(false);
onMounted(()=>{
  cameraList.value = state.cameraData;
  $bus.on('currowData',(val)=>{
    forensicConfigId.value = val.id;
    deviceIds.value = [val.deviceId];
    checkList.value = getValue1(val.weeks); 
    times.value = getValue2(val.times);
    isEdit.value = true;
  })
  $bus.on('closeDialogResetForm',(val)=>{
    resetForm();
  })
})
const getValue1 = (val) =>{
  let arr = [];
  val.split(',').forEach(item=>{
    if(item === '1'){
      arr.push('星期一')
    }else if(item === '2'){
      arr.push('星期二')
    }else if(item === '3'){
      arr.push('星期三')
    }else if(item === '4'){
      arr.push('星期四')
    }else if(item === '5'){
      arr.push('星期五')
    }else if(item === '6'){
      arr.push('星期六')
    }else if(item === '7'){
      arr.push('星期日')
    }
  })
  return arr
}
const getValue2 = (val) =>{
  let arr = [];
  let obj= {
    value:[],
  };
  val.forEach(item=>{
    obj.value[0] = item.startTime;
    obj.value[1] = item.endTime;
    arr.push(obj);
  })
  return arr
}
onUnmounted(() => {
  $bus.off('closeYjpdDialog')
})
</script>

<style lang="less" scoped>
::v-deep.banner {
  padding: 20px 30px;
  .el-form-item__label{
    color: #fff;
  }
  .check_box{
    display: flex;
  }
}
.time_item{
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-top: 20px;
  .txt_label{
    margin-right: 15px;
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

<style scoped>
/deep/ .el-card{
  background-color: rgba(13, 81, 157, 0.45);
  box-shadow: 0 0 0 1px #0B7FE2 inset;
  border: 0px;
}
/deep/ .el-date-editor{
  margin-right: 10px;
  background-color: rgba(13, 81, 157, 0.45);
  box-shadow: 0 0 0 1px #0B7FE2 inset;
  color: red;
}

/deep/ .el-radio__label{
  color: #fff;
}

/deep/ .el-range-separator{
  color: #fff;
}
/deep/ .el-range-input{
  color: #fff;
}

/deep/ .txt_label{
  color: #fff;
}

/deep/ .el-checkbox__label{
  color: #fff;
}

</style>

<style scoped>
.login-form /deep/ .el-date-editor .el-range__icon svg{
    color: #fff;
}
.login-form /deep/ .el-icon{
  padding-left: 10px;
}
</style>
  