<template>
    <div class="container_box">
        <div class="camera_Item">
            <div class="item_title">
                <div class="img"><img src="../../../../public/image/earlyWarningAnalysis/dk.png" alt=""></div>
                <div class="title_bgc">
                    地块名称：{{objParms ? objParms.dkmc :'暂无数据'}}
                </div>
            </div>
            <div class="item_content">
                <div class="row">
                    <p><span class="camera_label">乡镇街道：</span><span class="camera_value">{{objParms ? objParms.xzq :'暂无数据'}}</span></p>
                    <p><span class="camera_label">供应方式：</span><span class="camera_value">{{objParms ? objParms.gyfs :'暂无数据'}}</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">土地坐落：</span><span class="camera_value">{{objParms ? objParms.tdzl :'暂无数据'}}</span></p>
                    <p><span class="camera_label">签订日期：</span><span class="camera_value">{{objParms ? objParms.qdrq :'暂无数据'}}</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">规划用途：</span><span class="camera_value">{{objParms ? objParms.tdyt :'暂无数据'}}</span></p>
                    <p><span class="camera_label">地块面积：</span><span class="camera_value">{{ objParms ? objParms.dkmj :'暂无数据' }}</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">所属村庄：</span><span class="camera_value">{{objParms ? objParms.village :'暂无数据'}}</span></p>
                    <p><span class="camera_label">发现时间：</span><span class="camera_value">{{ objParms ? objParms.createTime :'暂无数据' }}</span></p>
                </div>
                <div class="row">
                    <p><span class="camera_label">备注信息：</span><span class="camera_value">{{objParms ? objParms.bz :'暂无数据'}}</span></p>

                    <p><span class="camera_label">所在区域：</span><span class="camera_value">{{ objParms ? objParms.sskfq :'暂无数据' }}</span></p>
                </div>
            </div>
        </div>
        <div class="flexBox">
            <div v-if="handleStatus===0" @click="earlyWaringDialog = true" class="btn_box">预警判读</div>
            <div v-if="handleStatus===1" @click="massifDialog = true" class="btn_box">处理结果</div>
            <div v-if="handleStatus===2" @click="showDialogDetail" class="btn_box">预警详情</div>
        </div>
        <BaseDialog1 v-if="earlyWaringDialog" @closeDialog="earlyWaringDialog = false" :styles="earlyWaringStyles"
            :title="'预警详情'">
            <template v-slot:content>
                <YJPD :analySisData="analySisData" @closeYj="closeYj" :islook="islook" />
            </template>
        </BaseDialog1>
        <BaseDialog1 v-if="massifDialog" @closeDialog="massifDialog = false" :styles="earlyWaringStyles"
            :title="'处理结果'">
            <template v-slot:content>
                <CLJG :analySisData="analySisData"  @closeYj2="closeYj2" />
            </template>
        </BaseDialog1>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted,toRefs,watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import $bus from '@/utils/eventBus.js'
import { alarmListPage, getOneByFeatureId } from '@/api/chart'
import YJPD from './components/YJPD.vue'
import CLJG from './components/CLJG.vue'
import BaseDialog1 from '@/components/BaseDialog1'
import { useRoute } from 'vue-router'
const route = useRoute()
const earlyWaringStyles = ref({
  width: '800px',
  top: '12%',
  right: '35%'
})
const islook = ref(false)
const handleStatus = ref(0)
const earlyWaringDialog = ref(false)
const massifDialog = ref(false)
const analySisData = ref({})
const objParms = ref({})
const { query } = toRefs(route)




watch(query, (newValue, oldValue) => {
    if(!newValue.featureId) return;
    analySisData.value = newValue;
    objParms.value = {}
    getOneByFeatureId({ featureId: newValue.featureId }).then(res => {
      objParms.value = res.data
    })
    console.log(newValue,'newValuenewValue')
    
    if(newValue.handleStatue === '0'){
        earlyWaringDialog.value = true;
    }else{
        massifDialog.value = true;
    }
    nextTick(()=>{
        $bus.emit('analySisData', analySisData.value)
    })
}, { deep: true ,immediate:true});

onMounted(() => {
  $bus.on('earlyHandleStatue', (e) => {
    handleStatus.value = e
  })
  $bus.on('analySisData', (e) => {
    analySisData.value = e
    objParms.value = {}
    getOneByFeatureId({ featureId: e.featureId }).then(res => {
      objParms.value = res.data
      console.log(objParms.value,'objParms.valueobjParms.value')
    })
  })
}) 

onUnmounted(() => {
  $bus.off('earlyHandleStatue')
  $bus.off('analySisData')
})
const closeYj2 = () => {
  massifDialog.value = false
  $bus.emit('getEarlyList')
}
const closeYj = () => {
  earlyWaringDialog.value = false
  $bus.emit('getEarlyList')
}

const showDialogDetail = () => {
  earlyWaringDialog.value = true
  islook.value = true
}
</script>

<style lang="less" scoped>
.container_box {
    height: 52.1%;
    overflow-y: auto;
    color: #fff;
    margin-top: 20px;
    padding: 0px 10px;
}

.item_content {
    display: flex;
    height: 200px;
    overflow-y: auto;
    flex-direction: column;
    align-items: flex-start;
    background-color: #04264E85;
    font-size: 12px;
}

.row {
    display: flex;
    height: 40px;
    justify-content: flex-start;
}

.row:nth-child(even) {
    width: 100%;
    background-color: #0E509B73;
}

p {
    margin-right: 2em;
}

.camera_Item {
    margin-bottom: 5px;
    border-radius: 3px;
    font-size: 15px;

    p {
        height: 40px;
        padding: 5px 15px;
    }

    .item_title {
        padding: 10px 15px;
        display: flex;

        .title_bgc {
            width: 344px;
            height: 28px;
            background-image: url('../../../../public/image/earlyWarningAnalysis/Rectangle 19932.png');
            margin-left: 13px;
        }
    }

    .camera_label {
        color: #dadada;
    }

    .camera_value {
        font-weight: 700;
    }
}

div::-webkit-scrollbar {
    width: 4px;
}

div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    background: #6DE8F2;
    height: 100px;
}

div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
}

.flexBox {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    .btn_box {
        width: 160px;
        height: 43px;
        background-image: url('/public/image/earlyWarningAnalysis/wfcz.png');
        margin: 0 auto;
        line-height: 43px;
        text-align: center;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            filter: brightness(150%);   }
    }

}
</style>
