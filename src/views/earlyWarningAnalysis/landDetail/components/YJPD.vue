<template>
  <div class="banner">
    <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon :model="analySisData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="镇街信息" prop="code">
            <el-input v-model="analySisData.townName"  auto-complete="off" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="摄像头信息" prop="code">
            <el-input v-model="analySisData.deviceName"  auto-complete="off" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地块信息">
            <el-input v-model="analySisData.dkmc"  auto-complete="off" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="alarmType" label="预警类型">
            <div class="selectBox">
              <el-select v-model="analySisData.alarmType" placeholder="请选择"  popper-class="selectMenuOption"
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
          <el-form-item label="是否为有效预警" prop="radio">
            <el-radio-group v-model="analySisData.isEffective">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="analySisData.isEffective === 1">
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
      <el-row v-if="analySisData.isEffective === 1">
        <el-col :span="24">
          <el-form-item label="处理方式">
            <div class="selectBox">
              <el-select v-model="analySisData.handleType" placeholder="请选择" popper-class="selectMenuOption"
                suffix-icon="CaretBottom">
                <el-option v-for="item in clfsOptions" :key="item.value" :label="item.label" :value="item.value"
                  style="background: #052243F5;" />
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="analySisData.isEffective === 1">
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="analySisData.remark" style="width: 500px;" :rows="3"  type="textarea" auto-complete="off" :readonly="readonlyFlag"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="analySisData.handleStatue === 2">
        <el-col :span="24">
          <el-form-item label="文件">
            <el-button type="primary" @click="lookFile(analySisData.alarmHandle.attachs)">查看文件</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="btnList" v-if="handleStatus !== 2">
        <div @click="submit" class="btn btn1">
          <p>确定</p>
        </div>
        <div @click="emit('closeYj')" class="btn btn2">
          <p>取消</p>
        </div>
      </div>
    </el-form>
  </div>

</template>

<script setup>
import { ElMessage,ElLoading} from 'element-plus'
import { ref, defineProps, toRefs, watch, defineEmits } from 'vue'
import { getAlarmType ,allUser,downloadFile} from '@/api/camera'
import { alarmInfoExcute } from '@/api/chart'
import { exportFileType } from '@/utils/utils'
const props = defineProps({
  // 唯一标识
  analySisData: {
    type: Object,
    default: () => {}
  },
  islook:{
    type: Boolean,
    default: () => false,
  }
})
const loading = ref();
const photoUrl = ref([]);
const handleStatus = ref(0);
const { analySisData,islook } = toRefs(props)
const emit = defineEmits(['closeYj'])
const cldwOptions = ref()
const yjlxOptions = ref([])
const readonlyFlag = ref(false);
const clfsOptions = ref([
  {
    label: '暂无',
    value: 0
  },
  {
    label: '常规',
    value: 1
  },
  {
    label: '快速处理',
    value: 2
  }
])

loading.value = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.4)'
})

const lookFile = async (id) => {
  try {
    let datas = await downloadFile({ id: id });
    console.log(datas, 'datasdatas');

    if (datas) {
      const mimeType = await detectFileType(datas);
      console.log(mimeType, 'mimeTypemimeTypemimeType');

      // 使用检测到的 MIME 类型来创建 Blob
      const blob = new Blob([datas], {
        type: mimeType || 'application/octet-stream'
      });

      const pdfUrl = window.URL.createObjectURL(blob);
      window.open(pdfUrl);
    } else {
      ElMessage.error('下载失败');
    }
  } catch (error) {
    console.error('文件预览错误:', error);
    ElMessage.error('文件预览失败，请重试。');
  }
};

const detectFileType = (binaryData) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const arrayBuffer = fileReader.result;
      const dataView = new DataView(arrayBuffer);
      
      // 检查文件头
      if (dataView.getUint32(0, true) === 0x504B0304) {
        resolve('application/zip'); // ZIP 文件
      } else if (dataView.getUint32(0, true) === 0x504B0708) {
        resolve('application/x-rar-compressed'); // RAR 文件
      } else if (dataView.getUint32(0, true) === 0xD0CF11E0) {
        resolve('application/vnd.openxmlformats-officedocument.wordprocessingml.document'); // DOCX 文件
      } else if (dataView.getUint32(0, true) === 0x504B0506) {
        resolve('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // XLSX 文件
      } else if (dataView.getUint32(0, true) === 0x504B0705) {
        resolve('application/vnd.openxmlformats-officedocument.presentationml.presentation'); // PPTX 文件
      } else if (dataView.getUint8(0) === 0x25 && dataView.getUint8(1) === 0x50 && dataView.getUint8(2) === 0x44 && dataView.getUint8(3) === 0x46) {
        resolve('application/pdf'); // PDF 文件
      } else if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        resolve('image/jpeg'); // JPEG 图片
      } else if (dataView.getUint8(0) === 0x89 && dataView.getUint8(1) === 0x50 && dataView.getUint8(2) === 0x4E && dataView.getUint8(3) === 0x47) {
        resolve('image/png'); // PNG 图片
      } else {
        resolve(null); // 未知文件类型
      }
    };
    
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(binaryData.slice(0, 1024)); // 只读取前1024字节
  });
}
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
  const { data, code } = await alarmInfoExcute(analySisData.value)
  if (code === '200') {
    ElMessage.success('处理成功')
    emit('closeYj')
  }
}
watch(analySisData.value, (newValue, oldValue) => {
  analySisData.value = newValue
  handleStatus.value = newValue.handleStatue;
  analySisData.value.alarmType = Number(analySisData.value.alarmType)
  analySisData.value.isEffective = Number(analySisData.value.isEffective)
  analySisData.value.handleType = Number(analySisData.value.handleType)
  
  if(newValue.alarmHandle){
    //analySisData.value.handleUserId = newValue.alarmHandle.handleUserId
  }
  //console.log(newValue,'newValuenewValue',analySisData.value.handleUserId)
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
