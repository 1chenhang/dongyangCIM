<template>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="#"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :http-request="uploadAction"
      list-type="picture"
      :limit="limit"
    >
      <el-button type="primary">上传文件</el-button>
      <template #tip>
        <div class="el-upload__tip">
          只能上传最多 {{ limit }} 张图片
        </div>
      </template>
    </el-upload>
  </template>
  <script setup>
import { ref, defineProps, toRefs, watch, onMounted } from 'vue'
  import { getUpload } from '@/api/index'
  import $bus from '@/utils/eventBus.js'
  const props = defineProps({
    limit: {
      type: Number,
      default: 1,
    },
  })

  const uploadUrl = ref();
  uploadUrl.value = getUpload;

  const fileList = ref([])
  const uploadedFiles = ref([]); // 用于存储上传成功的文件及其ID
  
  const handleChange = (data) => {
    console.log(data)
  }

  
  const beforeUpload = (UploadRawFile) =>{

  }


  const handleRemove = (file) =>{
    console.log(file,'uploadFilesuploadFilesuploadFiles')
    const index = uploadedFiles.value.findIndex((item) => item.file.uid === file.uid);
    if (index !== -1) {
      const fileId = uploadedFiles.value[index].id;
      console.log('Removing file with ID:', fileId);
      uploadedFiles.value.splice(index, 1);
      $bus.emit('uploadedFilesIds', uploadedFiles.value);
    }

  }

  const uploadAction = (data)=>{
    console.log(data.file,'option')
    let formData = new FormData();
    formData.append('file', data.file);
    getUpload(formData).then(res => {
      if(res.code == '200'){
        let {fileOriginName,url,id} = res.data;
        // let obj = {
        //   name:fileOriginName,
        //   url:url
        // };
        // fileList.value[0] = obj;
        // console.log(fileList.value)
        // console.log(id,'ididv')
        uploadedFiles.value.push({ id: id, file: data.file });
        $bus.emit('uploadedFilesIds', uploadedFiles.value);
      }
    })
  }
  const handleSuccess =(res,file,fileList)=>{
      console.log(res,'response')
  }

  onMounted(() => {
    $bus.on('resetFileIds', async () => {
      fileList.value = [];
    })
})

  </script>
  