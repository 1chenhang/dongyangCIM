<template>
    <div class="container_box">
        <div class="camera_List">
            <div class="camera_Item" v-for="(item,index) in 10" :key="index">
                <div class="item_title">2024-01-03 04:48:11 摄像头1</div>
                <div class="item_content">
                    <p><span class="camera_label">街道：</span><span class="camera_value">江北街道</span></p>
                    <p><span class="camera_label">地块名称：</span><span class="camera_value">江北百盛发展公司</span></p>
                    <p><span class="camera_label">摄像头：</span><span class="camera_value">东阳基站</span></p>
                    <p><span class="camera_label">处置时间：</span><span class="camera_value">2024-01-03 04:48:11</span></p>
                </div>
            </div>
        </div>
        
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
</script>

<style lang="less" scoped>
.container_box{
    height: 55%;
    overflow-y: auto;
    color: #fff;
    margin-top: 20px;
    padding: 0px 10px;
}
.camera_Item{
    height: 150px;
    border: 1px solid #6DE8F2;
    margin-bottom: 5px;
    border-radius: 3px;
    font-size: 13px;
    background-color: #222222;
    p{
        padding: 5px 15px;
    }
    .item_title{
        padding: 10px 15px;
        background-color: rgb(23, 99, 99);
        border-radius:3px 3px 0px 0px;
        font-weight: 700;
    }
    .camera_label{
        color: #dadada;
    }
    .camera_value{
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
</style>
  