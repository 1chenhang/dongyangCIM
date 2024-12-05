<template>
  <div class="PDFBox">
    <el-form ref="phoneDataRef" label-width="auto" class="login-form" :inline="true" status-icon :model="analySisData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="取证时间">
            <el-input readonly v-model="nowTime" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="取证类型">
            <el-input readonly v-model="analySisData.typeOf" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="街道">
            <el-input readonly v-model="analySisData.deviceAddress" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="摄像头名称">
            <el-input readonly v-model="analySisData.deviceName" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地块名称">
            <el-input readonly v-model="analySisData.dkmc" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地块类型">
            <el-input readonly v-model="analySisData.dkType" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预警类型">
            <ESelect v-model:value="analySisData.warnTypeId" :optionList="warnTypeList" label="name" id="alarmType"
              @selectChange="warnTypeChange"></ESelect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预警种类">
            <ESelect v-model:value="analySisData.warnSortId" :optionList="warnSortList" label="name" id="alarmOtherType"
              @selectChange="warnSortChange" :disabled="sortDisabled"></ESelect>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="摄像头经纬度">
            <el-input readonly v-model="analySisData.lonLat" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="摄像头姿态">
            <el-input readonly v-model="analySisData.pose" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="imgSrc">
        <el-col :span="24">
          <el-form-item label="图片取证">
            <el-image :preview-src-list="[imgSrc]" :src="imgSrc"></el-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="videoSrc">
        <el-col :span="24">
          <el-form-item label="视频取证">
            <video width="628" :src="videoSrc" class="video" controls>
            </video>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-button type="primary" @click="exportToWord"> 导出</el-button>
</template>

<script setup>
import htmlDocx from 'html-docx-js/dist/html-docx'
import ESelect from '@/components/Select'
import $bus from '@/utils/eventBus.js'
import { ref, onMounted, onBeforeUnmount, watch, inject } from 'vue'
import { timeline, downloadMP4 } from '@/utils/utils'
import { useStore } from 'vuex'
const videoSrc = ref('')
const imgSrc = ref('')
const analySisData = ref({})
const nowTime = ref('')
const sortDisabled = ref(true)
const { state } = useStore()
const { warnTypeList } = state
const warnSortList = ref([])
console.log(warnTypeList, '--warnTypeList')
const cameraFullScreenObj = inject('cameraFullScreenObj')
const warnTypeChange = (e) => {
  sortDisabled.value = false
  analySisData.value.warnSortId = ''
  warnTypeList.forEach(item => {
    if (item.alarmType === e) {
      analySisData.value.warnType = item.name
      warnSortList.value = item.alarmOtherTypes
    }
  })
}
const warnSortChange = (e) => {
  warnSortList.value.forEach(item => {
    if (item.alarmOtherType === e) analySisData.value.warnSort = item.name
  })
}
const exportToWord = () => {
  const htmlContent = `
          <!DOCTYPE HTML>
          <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta http-equiv="Content-Style-Type" content="text/css">
                <meta name="generator" content="Aspose.Words for .NET 15.1.0.0">
                <title></title>
            </head>
            <body>
             <section class="_135editor" data-role="paragraph">
	<p>
		<!--[if !mso]><style>v\:* {behavior:url(#default#VML);}
o\:* {behavior:url(#default#VML);}
x\:* {behavior:url(#default#VML);}
.shape {behavior:url(#default#VML);}</style><![endif]-->
	</p><style><!--.font0
	{color:#000000;
	font-size:11.0pt;
	font-family:Arial;
	font-weight:400;
	font-style:normal;
	text-decoration:none;}
.font1
	{color:#000000;
	font-size:14.0pt;
	font-family:SimSun;
	font-weight:400;
	font-style:normal;
	text-decoration:none;}
.font2
	{color:#000000;
	font-size:14.0pt;
	font-family:SimSun;
	font-weight:400;
	font-style:normal;
	text-decoration:none;}
br
	{mso-data-placement:same-cell;}
td
	{padding-top:1px;
	padding-left:1px;
	padding-right:1px;
	mso-ignore:padding;
	color:#000000;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Arial;
	mso-generic-font-family:auto;
	mso-font-charset:204;
	mso-number-format:General;
	border:none;
	mso-background-source:auto;
	mso-pattern:auto;
	text-align:general;
	vertical-align:bottom;
	white-space:nowrap;
	mso-rotate:0;
	mso-protection:locked visible;}
.et1
	{mso-generic-font-family:auto;
	mso-font-charset:204;
	text-align:left;
	vertical-align:top;
	white-space:normal;}
.et2
	{font-size:14.0pt;
	font-family:SimSun;
	mso-generic-font-family:auto;
	mso-font-charset:134;
	border:.5pt solid #000000;
	text-align:center;
	vertical-align:middle;
	white-space:normal;}
.et3
	{mso-generic-font-family:auto;
	mso-font-charset:204;
	border:.5pt solid #000000;
	text-align:center;
	vertical-align:middle;
	white-space:normal;}
--></style>
	<table cellpadding="0" cellspacing="0" width="100%" height="450">
		<tbody>
			<tr height="50" style="height:31.95pt;" class="firstRow">
				<td colspan="4" class="et2" height="55" x:str="" style="">
					<span class="font2">取证报告</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td class="et2" height="55" x:str="" style="">
					<span class="font2">取证时间</span>
				</td>
				<td class="et2" width="140" x:str="" style="">
					<span class="font2">${nowTime.value}</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">取证类型</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">手动</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td class="et2" width="140" height="55" x:str="" style="">
					<span class="font2">街道</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">${analySisData.value.deviceAddress}</span>
				</td>
				<td class="et2" width="140" x:str="" style="">
					<span class="font2">摄像头名称</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">${analySisData.value.deviceName}</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td class="et2" height="55" x:str="" style="">
					<span class="font2">地块名称</span>
				</td>
				<td class="et2" width="140" x:str="" style="">
					<span class="font2">${analySisData.value.dkmc || '暂无'}</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">地块类型</span>
				</td>
				<td class="et2" width="140" x:str="" style="">
					<span class="font2">${analySisData.value.dkType || '暂无'}</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td class="et2" height="55" x:str="" style="">
					<span class="font2">预警类型</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">${analySisData.value.warnType || '暂无'}</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">预警种类</span>
				</td>
				<td class="et2" x:str="" style="">
					<span class="font2">${analySisData.value.warnSort || '暂无'}</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td class="et2" height="55" x:str="" style="">
					<span class="font2">预警地经纬度</span>
				</td>
				<td colspan="3" class="et2" x:str="" style="">
					<span class="font2">${analySisData.value.lon}，${analySisData.value.lat}</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td class="et2" height="55" x:str="" style="">
					<span class="font2">摄像头姿态</span>
				</td>
				<td colspan="3" class="et2" x:str="" style="">
					<span class="font2">${analySisData.value.pose || '暂无'}</span>
				</td>
			</tr>
			<tr height="50" style="height:55pt;">
				<td colspan="4" class="et2" height="55" x:str="" style="">
					<span class="font2">取证照片</span>
				</td>
			</tr>
      <tr height="50" style="height:55pt;">
				<td colspan="4" class="et2" height="300" x:str="" style="">
					<img src="${imgSrc.value}" width="600" height="300"/>
				</td>
			</tr>
		</tbody>
	</table>
	<p>
		<br/>
	</p>
</section>
<section class="_135editor" data-role="paragraph">
	<p >
		<br/>
	</p>
</section>
                <p style="line-height:28.6pt; margin:0pt 0pt 1pt 180pt; text-align:justify; text-indent:36pt"><span style="font-family:宋体; font-size:15pt">&nbsp;</span></p>
             
            </body>
          </html>
        `
  const docx = htmlDocx.asBlob(htmlContent)
  const link = document.createElement('a')
  link.href = URL.createObjectURL(docx)
  link.download = '取证报告.docx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  if (videoSrc.value) downloadMP4(videoSrc.value, '取证视频')
}

onMounted(() => {
  $bus.on('shotImgUrl', (url) => {
    imgSrc.value = url
  })
  $bus.on('screenVideoSrc', (url) => {
    videoSrc.value = url
  })
  $bus.on('landCoordInfo', ({ params }) => {
    analySisData.value.dkmc = params.dkmc
    analySisData.value.dkType = params.type
    console.log(params, '--params')
  })
  nowTime.value = timeline('日')
})
watch(cameraFullScreenObj, (newValue) => {
  analySisData.value = { ...newValue }
  analySisData.value.typeOf = '手动'
  analySisData.value.warnType = ''
  analySisData.value.warnTypeId = ''
  analySisData.value.warnSortId = ''
  analySisData.value.warnSort = ''
  analySisData.value.warnSort = ''
  analySisData.value.pose = '暂无'
  analySisData.value.lonLat = analySisData.value.lon + ',' + analySisData.value.lat
}, { deep: true, immediate: true })
onBeforeUnmount(() => {
  $bus.off('shotImgUrl')
  $bus.off('screenVideoSrc')
})
</script>

<style lang="less" scoped>
::v-deep.PDFBox {
  padding: 20px 20px 0;
  max-height: 700px;
    overflow-y: auto;

  .text {
    color: #fff;
    font-size: 17px;
    margin-bottom: 15px;
  }

  .el-form-item__label {
    color: #fff;
  }

  .el-input__wrapper {

    background-color: rgba(13, 81, 157, 0.45);
    padding: 0px;
    box-shadow: 0 0 0 1px #0B7FE2 inset;
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
.el-image {
width: 632px;
object-fit: cover;
border-radius: 2px
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
.SBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .el-image {
    width: 400px;
  }
}

.dsnone {
  display: none;
}

.el-button {
  width: 100px;
  margin: 0 auto;
  display: block;
  margin-bottom: 20px;

}
</style>
