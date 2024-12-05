<template>
  <div class="ptz">
    <div class="outer-ring">
      <div class="caret-up" @click="onHandlePTZ('UP')"></div>
      <div class="caret-down" @click="onHandlePTZ('DOWN')"></div>
      <div class="caret-left" @click="onHandlePTZ('LEFT')"></div>
      <div class="caret-right" @click="onHandlePTZ('RIGHT')"></div>
      <div class="inner-ring">
        <div class="plus" @click="onHandlePTZ('ZOOM_IN')">+</div>
        <div class="line"></div>
        <div class="minus" @click="onHandlePTZ('ZOOM_OUT')">-</div>
      </div>
      <div class="ob-caret-left" @click="onExPtzControl('UP_LEFT')"></div>
      <div class="ob-caret-up" @click="onExPtzControl('UP_RIGHT')"></div>
      <div class="ob-caret-right" @click="onExPtzControl('DOWN_RIGHT')"></div>
      <div class="ob-caret-down" @click="onExPtzControl('DOWN_LEFT')"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { ptzControl, exPtzControl } from "@/api/camera";
import $bus from "@/utils/eventBus.js";
onMounted(() => {
  $bus.on("cameraObj22", (params) => {
    cameraObj.value = params;
    console.log(cameraObj.value, "cameraName.value");
  });
});

const cameraObj = ref();

const onHandlePTZ = async (type) => {
  const params = {
    command: type,
    deviceSn: cameraObj.value.deviceSn,
    speed: 20,
  };
  console.log(params, "paramsparams");
  await ptzControl(params);
};

const onExPtzControl = async (type) => {
  const params = {
    command: type,
    deviceSn: cameraObj.value.deviceSn,
    speed: 20,
  };
  await exPtzControl(params);
};
</script>

<style lang="less" scoped>
.ptz {
  position: absolute;
  left: 20px;
  bottom: 10px;
  display: flex;
  z-index: 999999;

  color: #333;
  .outer-ring {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: #fff;
    border-radius: 50%;
    div {
      cursor: pointer;
    }
    box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9,
      0 2px 3px #333;

    i {
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: #00b176;
      }
    }

    .caret-up,
    .caret-down,
    .caret-left,
    .caret-right,
    .ob-caret-left,
    .ob-caret-up,
    .ob-caret-right,
    .ob-caret-down {
      width: 0;
      height: 0;
      border-style: solid;
      cursor: pointer;
      position: absolute;
      transition: background-color 0.3s, transform 0.3s;
    }

    .caret-up {
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent #464646 transparent;
      top: 10px;
      left: 75px;
      margin-left: -10px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: scale(0.9); /* 缩小效果 */
      }
    }

    .caret-down {
      border-width: 10px 10px 0 10px;
      border-color: #464646 transparent transparent transparent;
      bottom: 10px;
      left: 75px;
      margin-left: -10px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: scale(0.9); /* 缩小效果 */
      }
    }

    .caret-left {
      border-width: 10px 10px 10px 0;
      border-color: transparent #464646 transparent transparent;
      left: 10px;
      top: 75px;
      margin-top: -10px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: scale(0.9); /* 缩小效果 */
      }
    }

    .caret-right {
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #464646;
      right: 10px;
      top: 77px;
      margin-top: -10px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: scale(0.9); /* 缩小效果 */
      }
    }

    .ob-caret-left {
      border-width: 10px 10px 0 10px;
      border-color: #464646 transparent transparent transparent;
      transform: rotate(129deg);
      top: 26px;
      left: 24px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: rotate(129deg) scale(0.9); /* 缩小效果 */
      }
    }

    .ob-caret-up {
      border-width: 10px 10px 0 10px;
      border-color: #464646 transparent transparent transparent;
      transform: rotate(227deg);
      top: 26px;
      right: 24px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: rotate(227deg) scale(0.9); /* 缩小效果 */
      }
    }

    .ob-caret-right {
      border-width: 10px 10px 0 10px;
      border-color: #464646 transparent transparent transparent;
      transform: rotate(307deg);
      bottom: 26px;
      right: 24px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: rotate(307deg) scale(0.9); /* 缩小效果 */
      }
    }

    .ob-caret-down {
      border-width: 10px 10px 0 10px;
      border-color: #464646 transparent transparent transparent;
      transform: rotate(45deg);
      bottom: 26px;
      left: 24px;

      &:active {
        background-color: #d0d0d0; /* 点击效果 */
        transform: rotate(45deg) scale(0.9); /* 缩小效果 */
      }
    }

    .inner-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #ddd;

      .plus {
        position: absolute;
        top: 5px;
        left: 40px;
        margin-left: -10px;
        cursor: pointer;
        font-size: 30px;
        transition: background-color 0.3s, transform 0.3s;

        &:active {
          background-color: #d0d0d0; /* 点击效果 */
          transform: scale(0.9); /* 缩小效果 */
        }
      }

      .line {
        height: 1px;
        width: 100%;
        background-color: #ddd;
        position: absolute;
        top: 39px;
        left: 0;
      }

      .minus {
        position: absolute;
        bottom: 10px;
        left: 40px;
        margin-left: -8px;
        font-size: 40px;
        top: 35px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;

        &:active {
          background-color: #d0d0d0; /* 点击效果 */
          transform: scale(0.9); /* 缩小效果 */
        }
      }
    }
  }
}
</style>
