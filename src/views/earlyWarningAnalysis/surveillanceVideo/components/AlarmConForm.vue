<template>
    <div class="banner">
        <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon
            :model="analySisData">
            <el-row :gutter="12">
                <el-col :span="24">
                    <el-form-item label="不同地块预警" prop="landType">
                        <div class="selectBox">
                            <el-select v-model="landType" @change="changeSelect" placeholder="请选择" clearable style="width:290px">
                                <el-option style="background: #052243F5;color:#fff"  v-for="item in landTypeOptions"  :key="item.landType" :label="item.typeName"
                                    :value="item.landType" />
                            </el-select>
                        </div>

                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="12">
                <el-col :span="24">
                    <el-form-item label="预警类型" prop="yjlx">
                        <div class="selectBox">
                            <el-cascader  v-model="selected"  :show-all-levels="false"  @change="handleChange"
                                :options="typeList" :props="props" clearable />
                        </div>
                        <span style="color:rgb(124, 124, 124);font-size: 13px; margin-left: 10px;">(预警类型一级菜单只能选一个)</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="预警间隔" prop="frequencyType">
                        <div class="selectBox">
                            <el-select v-model="frequencyType" placeholder="报警时间间隔" style="width:290px" clearable>
                                <el-option style="background: #052243F5;color:#fff"  v-for="dict in sjjgOptions" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </div>

                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="模型参数调整" prop="confidenceLevel">
                        <el-slider @mousedown.stop v-model="confidenceLevel"></el-slider>
                        <div style="line-height: 15px;">
                            <p>可信度越高，误报可能性越低，漏报可能性越高</p>
                            <p> 可信度越低，误报可能性越高， 洞报可能性越低</p>
                            <p> 本模型建议可信度区间60%~95%</p>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="btnList">
                <div @click="submit" class="btn btn1">
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
import $bus from '@/utils/eventBus.js'
import { ref, defineProps, toRefs,nextTick , watch, defineEmits, onMounted  } from 'vue'
import { getAlarmType,getAllLandType,alarmConfigAdd,alarmConfigDel,alarmConfigEdit } from '@/api/camera'
import { ElMessage } from 'element-plus'

const props = ref({
    value: 'id',
    label: 'name',
    children: 'children',
    multiple: true,
    checkStrictly: true,
    emitPath: true,
});

const props2 = defineProps({
  currRow: {
    type:Object,
    default:()=>{}
  },
  isEdit2:{
    type:Boolean,
    default:()=> false
  }
})

const {currRow,isEdit2} = toRefs(props2)

const isEdit = ref(false);

watch(isEdit2, (newValue, oldValue) => {
   isEdit.value = newValue;
}, { deep: true, immediate: true })


const landType = ref();
const alarmType = ref();
const alarmOtherTypes = ref('');
const frequencyType = ref('');
const confidenceLevel = ref(0);
const emit = defineEmits(['closeYj'])
const selected = ref([]);
const landTypeOptions = ref([]);
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
    { label: '始终', value: 1 },
    { label: '7天', value: 2 },
    { label: '30天', value: 3 },
    { label: '60天', value: 4 },
    { label: '90天', value: 5 },
    { label: '从不', value: 6 },
])
const typeList = ref([]);
//获取预警类型
const getAlarmTypeList = async () => {
    let arr = [];
    let res = await getAlarmType({});
    arr = res.data;
    typeList.value = arr.map(item => ({
        id: item.alarmType,
        name: item.name,
        children: item.alarmOtherTypes ? item.alarmOtherTypes.map(child => ({
            id: child.alarmOtherType,
            name: child.name
        })) : []
    }));
}

const getAllLandTypeList = async () => {
    let res = await getAllLandType({});
    landTypeOptions.value = res.data;
}
getAlarmTypeList();
getAllLandTypeList();
const changeSelect = (val) =>{
    landType.value = val;
}

const submit = async () => {
    let params = {
        id:isEdit.value ? confidenId.value :null,
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
    landType.value = '';
    alarmType.value = '';
    alarmOtherTypes.value = '';
    frequencyType.value = '';
    confidenceLevel.value = 0;
    selected.value = [];
}
const close = () => {
    reset();
    $bus.emit('closeDilaogaa');
}
const editForm = (row)=>{
    landType.value = row.landType;
    frequencyType.value = row.frequencyType;
    confidenceLevel.value = row.confidenceLevel;
    confidenId.value = row.id;
    alarmType.value = row.alarmType;
    alarmOtherTypes.value = row.alarmOtherTypes;
    let arr1 = row.alarmOtherTypes ? row.alarmOtherTypes.split(',').map(Number):[];
    let resultArr= [];
    arr1.forEach(item=>{
        resultArr.push([row.alarmType,item])
    })
    selected.value = resultArr
}
onMounted(() => {
    $bus.on('alarmConfigData',editForm)
    $bus.on('closeAlarmConfigDialog',()=>{
        reset();
    })
})
</script>

<style lang="less" scoped>
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