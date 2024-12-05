<template>
    <div class="banner">
        <p><span class="txt_label">预警信息：</span><span class="txt_value">{{ currowData2.alarmDescribe ?  currowData2.alarmDescribe :'暂无数据' }}</span></p>
        <p><span class="txt_label">预警时间：</span><span class="txt_value">{{ currowData2.alarmTime ?  currowData2.alarmTime :'暂无数据' }}</span></p>
        <p><span class="txt_label">摄像头名称：</span><span class="txt_value">{{ currowData2.deviceName ? currowData2.deviceName :'暂无数据'}}</span></p>
        <p><span class="txt_label">预警类型：</span><span class="txt_value">{{ currowData2.alarmType ? getAlarmTypeName(currowData2.alarmType) :'暂无数据' }}</span></p>
        <p><span class="txt_label">事件状态：</span><span class="txt_value">
            {{ currowData2.handleStatue === 0 ? '未处理' : (currowData2.handleStatue === 1 ?'处理中':'已处理') }}
        </span></p>
        <p style="display:flex;">
            <span class="txt_label">抓图显示：</span>
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in photoUrl" :key="item">
                <el-image :src="item.url" style="height: 100%;object-fit: cover;"></el-image>
              </el-carousel-item>
            </el-carousel>
        </p>
    </div>
</template>

<script setup>
import $bus from '@/utils/eventBus.js'
import { ref, defineProps, toRefs,nextTick , watch, defineEmits, onMounted  } from 'vue'
import { getAlarmType,getAllLandType,alarmConfigAdd,alarmConfigDel,alarmConfigEdit } from '@/api/camera'
import { ElMessage } from 'element-plus'
const photoUrl = ref([]);
const vidoeUrl = ref();
const props = defineProps({
  currRow: {
    type:Object,
    default:()=>{}
  },
})

const {currRow} = toRefs(props)
console.log(currRow,'currRowcurrRow')
const landType = ref();
const alarmType = ref();
const alarmOtherTypes = ref('');
const frequencyType = ref('');
const confidenceLevel = ref('');
const emit = defineEmits(['closeYj'])
const selected = ref([]);
const landTypeOptions = ref([]);
const isEdit = ref(false);
const confidenId = ref();

const handleChange = (value) => {
    const levelOne = new Set();
    const levelTwo = new Set();

    value.forEach((val) => {
        if (val.length === 1) {
            levelOne.add(val[0]);
        } else if (val.length === 2) {
            levelOne.add(val[0]);
            levelTwo.add(val[1]);
        }
    });

    alarmType.value = Array.from(levelOne).join(',');
    alarmOtherTypes.value = Array.from(levelTwo).join(',');

    console.log('一级菜单:', alarmType.value);
    console.log('二级菜单:', alarmOtherTypes.value);
};




const sjjgOptions = ([
    { label: '7天', value: 1 },
    { label: '30天', value: 2 },
    { label: '60天', value: 3 },
    { label: '90天', value: 4 },
    { label: '从不', value: 5 },
])
const typeList = ref([]);

const getAllLandTypeList = async () => {
    let res = await getAllLandType({});
    landTypeOptions.value = res.data;
}

getAllLandTypeList();
const changeSelect = (val) =>{
    landType.value = val;
}

const changeCheckbox = (val) =>{
}
const submit = async () => {
    let params = {
        id:confidenId.value,
        landType:landType.value,
        alarmType:alarmType.value,
        alarmOtherTypes:alarmOtherTypes.value,
        frequencyType:frequencyType.value,
        confidenceLevel:confidenceLevel.value,
    }
    let res = isEdit.value ?  await alarmConfigEdit(params):await alarmConfigAdd(params);
    reset();
    if(res.code === '200'){
        ElMessage.success('操作成功')
    }else{
        ElMessage.warning(res.msg)
    }
    $bus.emit('closeConForm')
}
//重置表单
const reset = () =>{
    landType.value = ref();
    alarmType.value = ref();
    alarmOtherTypes.value = ref('');
    frequencyType.value = ref('');
    confidenceLevel.value = ref('');
}
const close = () => {
    $bus.emit('closeDilaogaa');
}

let currowData2 = ref({});
const editForm = (row)=>{
    currowData.value = row;
}

const getAlarmTypeList = async () => {
  let res = await getAlarmType({});
  typeList.value = res.data;
}
getAlarmTypeList();

const getAlarmTypeName = (val) => {
  const result = typeList.value.find(item => item.alarmType === val);
  console.log(result)
  return result ? result.name : '暂无数据';
};

onMounted(() => {
    $bus.on('currowData',(val)=>{
        currowData2.value = val;
        photoUrl.value = [];
        if(val.alarmImageUrl){
            let str = val.alarmImageUrl.split(',');
            str.forEach(item => {
                let obj = {
                url:''
                }
                obj.url = 'api/ftpFile/download?path='+item;
                photoUrl.value.push(obj);
            });
        }
        if(val.videoUrl){
            let str = val.videoUrl;
            vidoeUrl.value = 'api/ftpFile/play?path='+str;
        }
    })
})


watch(currRow.value, (newValue, oldValue) => {
    console.log(currRow,'currowDatacurrowData')
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

.txt_label{
    display: inline-block;
        width: 110px; /* 根据需要调整宽度 */
        text-align: right; /* 使文字右对齐 */
        padding-right: 10px;
}
::v-deep.banner {
    padding: 20px 30px;

    .el-form-item__label {
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

    .el-textarea__inner {
        background-color: rgba(13, 81, 157, 0.45);
        padding: 10px;
        box-shadow: 0 0 0 1px #0B7FE2 inset;
        color: #fff;
    }

    .el-input__inner {
        width: 290px;
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
            width: 332px;
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
    height: 800px;
    overflow: hidden;
    overflow-y: scroll;
    p{
        margin-bottom: 20px;
        font-size: 18px;
    }
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.el-carousel--horizontal {
    width: 600px;
}
</style>
<style scoped>
/deep/ .el-checkbox__label {
    color: #fff;
}
</style>