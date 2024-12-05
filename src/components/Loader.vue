<template>
    <div id="loader-wrapper" v-if="showLoader">
      <div class="loadin_box">
        <div class="txt_loading">正在加载中..</div>
        <div class="loader"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showLoader: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  #loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.txt_loading{
  font-size: 18px;
  color: rgb(31, 245, 247);
  text-align: center;
  margin-bottom: 10px;
  font-weight: 800;
}
.loader {
  width: 300px;
  height: 30px;
  border-radius: 20px;
  color: rgb(31, 245, 247);
  border: 2px solid;
  position: relative;
  z-index: 99999999999;
}
.loader::before {
  content: "";
  position: absolute;
  margin: 2px;
  inset: 0 100% 0 0;
  border-radius: inherit;
  background: currentColor;
  animation: l6 8s infinite;
}
@keyframes l6 {
    100% {inset:0}
}
  </style>
  