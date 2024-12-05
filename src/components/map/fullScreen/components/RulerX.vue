
<template>
    <div class="cs-rule" ref="rulepage">
      <!--刻度表-->
      <div class="cs-scrollrule" ref="scrollrule">
        <ul class="cs-scrollrule-hook" ref="rulehook">
          <!--0刻度前的空白-->
          <div class="cs-rule-null">
            <li v-for="(item, index) in state.zeroList" class="cs-scroll-item" :key="index"></li>
          </div>
          <!--正常刻度表-->
          <template v-for="(item, index) in counter" :key="index">
            <li class="cs-scroll-item" >
              <template v-if="index % 10 === 0">
                <div class="cs-scroll-item-rule vux-1px-l cs-scale-integer"></div>
                <div v-if="ispoint" class="cs-scroll-item-num">{{ (index + minNum) / 10 }}</div>
                <div v-else ref="numItem" class="cs-scroll-item-num">{{ (index + minNum) * oneGridValue }}</div>
              </template>
              <template v-else-if="index % 5 === 0">
                <div class="cs-scroll-item-rule vux-1px-l cs-scale-half"></div>
              </template>
              <template v-else>
                <div class="cs-scroll-item-rule vux-1px-l cs-scale-one"></div>
              </template>
            </li>
          </template>

          <!-- 最大刻度后面的空白 -->
          <div class="cs-rule-null-after">
            <li v-for="(item, index) in state.aletrList" class="cs-scroll-item" :key="index"></li>
          </div>

        </ul>
      </div>
      <!--刻度表的针-->
      <div class="cs-scroll-item-pointer"></div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, defineProps, defineEmits, defineExpose, nextTick } from 'vue'
import BScroll from 'better-scroll'

const props = defineProps({
  NowNum: {
    type: Number,
    default: 100
  },
  maxNum: {
    type: Number,
    default: 1000
  },
  minNum: {
    type: Number,
    default: 0
  },
  pointerColor: {
    type: String,
    default: 'rgb(97,206,81)'
  },
  ruleWidth: {
    type: Number,
    default: 40
  },
  numSize: {
    type: Number,
    default: 50
  },
  ispoint: {
    type: Boolean,
    default: false
  },
  oneGridValue: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['scroll-start', 'post-NumValue', 'scroll-end'])
const rulepage = ref(null)
const scrollrule = ref(null)
const rulehook = ref(null)
const NumValue = ref(0)
const numItem = ref()
const state = reactive({
  zeroList: props.ruleWidth / 2,
  aletrList: props.ruleWidth / 2 - 1,
  oneWidth: 0,
  scrollX: 0
})

const counter = computed(() => props.maxNum - props.minNum + 1)

const initScroll = () => {
  scrollrule.value = new BScroll(scrollrule.value, {
    probeType: 3,
    scrollX: true

    // snapLoop: true
  })

  scrollrule.value.on('scrollStart', () => {
    emit('scroll-start', true)
  })

  scrollrule.value.on('scroll', (pos) => {
    state.scrollX = Math.abs(Math.round(pos.x))
    NumValue.value = Math.abs(Math.round(state.scrollX / state.oneWidth)) + props.minNum
    if (props.ispoint) {
      emit('post-NumValue', NumValue.value / 10 * props.oneGridValue)
    } else {
      emit('post-NumValue', NumValue.value * props.oneGridValue)
    }
  })

  scrollrule.value.on('scrollEnd', () => {
    const littleNum = state.scrollX % state.oneWidth
    const vul = state.oneWidth - littleNum
    if (vul > 0.5 && vul < (state.oneWidth - 0.5)) {
      if (littleNum > (state.oneWidth / 2)) {
        scrollrule.value.scrollBy(-vul, 0, 0)
      } else {
        scrollrule.value.scrollBy(littleNum, 0, 0)
      }
    }
    emit('scroll-end', NumValue.value)
  })
}

const calculateWidth = () => {
  const goodsList = rulehook.value
  const listWidth = goodsList.clientWidth
  const listNum = counter.value + state.zeroList + state.aletrList
  state.oneWidth = listWidth / listNum
}

const getMainValue = () => {
  const docStyle = rulepage.value.style
  docStyle.setProperty('--pointer-color', props.pointerColor)
  docStyle.setProperty('--num-size', props.numSize)
  docStyle.setProperty('--rule-width', props.ruleWidth)
}

const init = () => {
  nextTick(() => {
    initScroll()
    calculateWidth()
    getZero()
  })
}
const getZero = () => {
  scrollrule.value.scrollTo(-5740, 0) // 写死归0点 不可修改布局
}
onMounted(() => {
  init()
  getMainValue()
})
defineExpose({
  getZero
})
</script>

<style lang="less">
  .setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .setBottomLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid @c;
    color: @c;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }

  .setLeftLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    // transform: scaleX(0.5);
  }

  .setRightLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid @c;
    color: @c;
    transform-origin: 100% 0;
    // transform: scaleX(0.5);
  }

  .setLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    border: 1px solid @c;
    color: @c;
    height: 200%;
    transform-origin: left top;
    transform: scale(0.5);
  }

  .vux-1px,
  .vux-1px-t,
  .vux-1px-b,
  .vux-1px-tb,
  .vux-1px-l,
  .vux-1px-r {
    position: relative;
  }

  .vux-1px {
    &:before {
      .setLine();
    }
  }

  .vux-1px-t {
    &:before {
      .setTopLine();
    }
  }

  .vux-1px-b {
    &:after {
      .setBottomLine();
    }
  }

  .vux-1px-tb {
    &:before {
      .setTopLine();
    }

    &:after {
      .setBottomLine();
    }
  }

  .vux-1px-l {
    &:before {
      .setLeftLine();
    }
  }

  .vux-1px-r {
    &:after {
      .setRightLine();
    }
  }
</style>

<style scoped>
  .cs-rule {
    position: relative;
    width: 100vw;
    transform: translateX(-28%);
    --pointer-color: rgb(97,206,81);
    --rule-width: 40;
    --num-size: 50
  }

  .cs-scrollrule-hook {
    list-style: none;
    overflow: hidden;
    border-collapse: collapse;
    white-space: nowrap;
    display: inline-block;
  }

  .cs-scroll-item {
    display: inline-block;
    width: calc(100vw / var(--rule-width));
    text-align: center;
    vertical-align: top;
  }

  /*刻度表数字*/
  .cs-scroll-item-num {
    width: calc(100 / 750 * 100vw);
    margin-left: calc(-50 / 750 * 100vw);
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }

  /*中间红色指针*/
  .cs-scroll-item-pointer {
    position: absolute;
    top: 0;
    left: 50%;
    height: 30px;
    transform: translate(-50%, 0);
    border-right: 4px solid var(--pointer-color);
  }

  .cs-scroll-item-rule {
    display: inline-block;
    width: calc(100vw / 40);
    box-sizing: border-box;
  }

  .vux-1px-l[data-v-db07d170]:before {
    border-color: #fff !important;
  }

  .vux-1px-l:before {
    border-color: #fff !important;
  }

  /*刻度1的*/
  .cs-scale-one {
    height: 10px;
  }

  /*刻度0.5的*/
  .cs-scale-half {
    height: 20px;
  }

  /*刻度10的*/
  .cs-scale-integer {
    height: 30px;
  }

  /*0刻度前面的空白*/
  .cs-rule-null {
    margin-right: calc(-8 / 750 * 100vw);
    display: inline-block;
  }
  .cs-rule-null-after {
    margin-left: calc(-8 / 750 * 100vw);
    display: inline-block;
  }
</style>
