<template>
  <ul class="cBox">
    <li v-for="item in dialogData" :key="item.label">
      <p class="tip">{{ item.label }}</p>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="item.value "
        placement="top"
      >
      <p class="text">{{ item.value }}</p>
      </el-tooltip>

    </li>
  </ul>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
const props = defineProps({
  // 唯一标识
  dialogData: {
    type: Array,
    default: () => []
  }
})
const { dialogData } = toRefs(props)

</script>

<style lang="less" scoped>
.cBox {
  padding: 20px 0;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 20px;
    margin-bottom: 15px;

    .tip {

      color: #18CBF2;
      width: 45%
    }

    .text {
      width: 50%;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
