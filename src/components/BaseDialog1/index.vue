<template>
  <div ref="baseDialogRef" v-drag="drag" :style="props.styles" class="baseDialog">
    <div class="title">
      {{ props.title }}
      <el-icon @click="closeDialog" class="close">
        <Close />
      </el-icon>
    </div>
    <slot name="content"></slot>
    <div class="bgIcon leftIcon iconfont  icon-danguiwaikuang_youxia"></div>
    <div class="bgIcon bottomIcon iconfont  icon-danguiwaikuang_youxia"></div>
  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  styles: {
    type: Object,
    default: () => {}
  },
  title: {
    type: String,
    default: '标题'
  },
  drag: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['closeDialog'])
const closeDialog = () => {
  emits('closeDialog')
}
</script>

<style lang="less" scoped>
.baseDialog {
  width: 333px;
  border: 1px solid #1B74A6;
  background-color: #03213EE5;
  position: fixed;
  top: 20%;
  right: 40%;
  z-index: 11;
  transition: all .3s;
  .title {
    height: 35px;
    margin-top: 2px;
    position: relative;
    background-image: url('/public/image/components/弹窗标题_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    font-family: YSBTH;
    font-size: 18px;
    letter-spacing: 3px;
    line-height: 35px;
    padding-left: 30px;
    box-sizing: border-box;
    text-shadow: 0px 4px 2.4px #05385F;

    .close {
      position: absolute;
      right: 7px;
      top: 7px;
      font-size: 18px;
      cursor: pointer;
      background: linear-gradient(180deg, #D8EEFF 0%, #659CD6 100%);
      -webkit-background-clip: text;
      /*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent;
      transition: all .3s;

      /*给文字设置成透明*/
      &:hover {
        filter: brightness(200%);
      }
    }
  }

  ::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: #fff;
  }

  .bgIcon {
    position: absolute;
    font-weight: 600;
    font-size: 20px;
  }

  .leftIcon {
    top: -5px;
    left: -5px;
    color: #00F0FF;
  }

  .bottomIcon {
    bottom: -3px;
    right: -2px;
    transform: rotate(180deg);
    color: #52F0FAAD;
  }
}
</style>
