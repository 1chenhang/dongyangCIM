<template>
    <el-select v-model="value" :disabled="disabled" placeholder="请选择" @change="selectChange" :style="{ width: width + 'px',height: height + 'px' }"
        popper-class="selectMenuOption" suffix-icon="CaretBottom">
        <el-option v-for="item in optionList" :key="item[id]" :label="item[label]" :value="item[id]" style="background: #052243F5;
" />
    </el-select>
</template>
<script setup>
import { defineProps, toRefs, defineEmits } from 'vue'
const props = defineProps({
  value: {
    type: [String, Number],
    default: ''
  },
  width: {
    type: Number,
    default: 294
  },
  height: {
    type: Number,
    default: 36
  },
  label: {
    type: String,
    default: 'label'
  },
  id: {
    type: [String, Number],
    default: 'id'
  },
  optionList: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }

})
const { value, width, optionList, label, id, disabled } = toRefs(props)
const emit = defineEmits(['selectChange', 'update:value'])
const selectChange = (e) => {
  emit('update:value', e)
  emit('selectChange', e)
}
</script>
<style scoped lang="less">
::v-deep.el-select {
  .el-select__wrapper {
    height: 100%;
    min-height: 28px;
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

</style>
<style>
.el-popper__arrow {
  display: none;
  /* 隐藏小三角图案 */
}

.el-select-dropdown__list {
  padding: 0;
  border-radius: 4px;
  border: 1px solid #0B7FE2;
}

.el-select-dropdown__item {
  color: #fff;
  border-bottom: 1px solid #0B7CDC3B;
}

.el-popper.is-light {
  border: none;
}

.el-select-dropdown__item:hover {
  color: rgb(213, 215, 230);
  background: linear-gradient(90deg, rgba(11, 132, 244, 0) 0%, rgba(11, 132, 244, 0.42) 52.16%, rgba(11, 132, 244, 0) 100%), #052243F5 !important;
}
</style>
