<template>
  <div class="header" @mouseleave="hidePopups">
    <div @click="pathTo('/entrancePage')" class="title">东阳市自然资源监控平台</div>
    <div :class="['leftBox', isTabActive ? '' : 'closeBox']">
      <div class="timeBox">
        {{ nowTime }}
      </div>
      <div class="menu_container">
        <ul class="menuBox">
          <li @click="pathTo2(item,index)" v-for="(item,index) in menuList.slice(0, 3)" :key="item.name"
            :class="menu === item.name ? 'active' : ''">{{
              item.name }}
            <div v-show="item.isActive && menu === item.name" class="menu_item_popus">
                <p v-for="item in item.children" :key="item.name" @click="mentItmeClick(item)">{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['rightBox', isTabActive ? '' : 'closeBox']">
      <ul class="menuBox">
        <li @click="pathTo2(item,index+3)" v-for="(item,index) in menuList.slice(3, 6)" :key="item.name"
          :class="menu === item.name ? 'active' : ''" class="scaleX">{{
      item.name }}
            <div v-show="item.isActive && menu === item.name" class="menu_item_popus">
                <p v-for="item in item.children" :key="item.name" @click="mentItmeClick(item)">{{ item.name }}</p>
            </div>
        </li>
      </ul>
      <div class="dateBox">
        <p>{{ nowWeek }}</p>
        <p class="nowDate">{{ nowDate }}</p>
      </div>
    </div>
    <img @click="isTab" class="isTab" :src="require('/public/image/homePage/收起按钮.png')" alt="">
  </div>
</template>
<script setup>
// :src="require('/public')
import { ref, watch, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import $bus from '@/utils/eventBus.js'
const Route = useRoute()
const Router = useRouter()
const menu = ref()
const nowDate = ref('')
const nowWeek = ref('')
const nowTime = ref('')
const count = ref(0)
const timer = ref(null)
const isTabActive = ref(true)
const menuList = ref(
  [
    {
      name: '平台总览',
      path: '/platformOverview',
      isActive: false,
      children: [
        {
          name: '动态数据一张图',
          path: '/platformOverview',
          isActive: false
        }
      ]
    },
    {
      name: '预警研判',
      path: '/earlyWarningAnalysis',
      isActive: false,
      children: [
        {
          name: '初判分配',
          path: '/earlyWarningAnalysis',
          isActive: false,
          query: {
            handleStatue: 0
          }
        }, {
          name: '事件处理',
          path: '/earlyWarningAnalysis',
          query: {
            handleStatue: 1
          },
          isActive: false
        }, {
          name: '完结回顾',
          path: '/earlyWarningAnalysis',
          isActive: false,
          query: {
            handleStatue: 2
          }
        }, {
          name: '事件统计',
          path: '/earlywarningStatistics',
          isActive: false
        }
      ]
    },
    {
      name: '智能取证',
      path: '/smartEvidence',
      isActive: false,
      children: [
        {
          name: '智能取证设置',
          path: '/smartEvidence',
          isActive: false,
          query: {
            tabs: 1
          }
        }, {
          name: '水印设置',
          path: '/smartEvidence',
          isActive: false,
          query: {
            tabs: 2
          }
        }, {
          name: 'AI设置',
          path: '/smartEvidence',
          isActive: false,
          query: {
            tabs: 3
          }
        }, {
          name: 'AI知识库',
          path: '/smartEvidence',
          isActive: false,
          query: {
            tabs: 4
          }
        }, {
          name: '手动取证',
          path: '/smartEvidence',
          isActive: false,
          query: {
            tabs: 0
          }
        }, {
          name: '模型收藏与切换',
          path: '/smartEvidence',
          isActive: false,
          query: {
            tabs: 5
          }
        }
      ]
    },
    {
      name: '视频巡地',
      path: '/videoPartrol',
      isActive: false,
      children: [
        {
          name: '视频测距/测面',
          path: '/videoPartrol',
          isActive: false
        }, {
          name: '地图定位',
          path: '/videoPartrol',
          isActive: false
        }, {
          name: '视频定位',
          path: '/videoPartrol',
          isActive: false
        }
      ]
    },
    // {
    //   name: '违法处置',
    //   path: '/earlyWarningInterpretation'
    // },
    // {
    //   name: '监控对象',
    //   path: '/cameraManagement'
    // },
    {
      name: '预警统计',
      path: '/earlywarningStatistics',
      isActive: false,
      children: [
        {
          name: '预警事件统计',
          path: '/earlywarningStatistics',
          isActive: false,
          query: {
            tabs: 1
          }
        }, {
          name: '视频管理',
          path: '/earlywarningStatistics',
          isActive: false,
          query: {
            tabs: 2
          }
        }, {
          name: '图片管理',
          path: '/earlywarningStatistics',
          isActive: false,
          query: {
            tabs: 3
          }
        }
      ]
    },
    {
      name: '监控分析',
      path: '/supervisingAnalysis',
      children: [
        {
          name: '预警信息分析',
          path: '/supervisingAnalysis',
          isActive: false,
          query: {
            tabs: 1
          }
        }, {
          name: '违法处置分析',
          path: '/supervisingAnalysis',
          isActive: false,
          query: {
            tabs: 2
          }
        }, {
          name: '视频监控摄像分析',
          path: '/supervisingAnalysis',
          isActive: false,
          query: {
            tabs: 3
          }
        }
      ]
    }
  ]
)
const pathTo = (path) => {
  Router.push(path)
}
const pathTo2 = async (item, index) => {
  menuList.value.forEach((item2, index2) => {
    if (index === index2) {
      item2.isActive = true
      item2.children[0].isActive = true
    } else {
      item2.isActive = false
    }
  })
  // Router.push(item.path)
  menu.value = item.name
  console.log(item, menuList.value)
}
const mentItmeClick = (item) => {
  Router.push({
    path: item.path,
    query: item.query
  })
}

const hidePopups = () => {
  menuList.value.forEach((item) => {
    item.isActive = false
  })
}
const isTab = () => {
  isTabActive.value = !isTabActive.value
  $bus.emit('isTabActive', isTabActive.value)
}
const getDate = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  const date = ('0' + currentDate.getDate()).slice(-2)
  const hours = ('0' + currentDate.getHours()).slice(-2)
  const minutes = ('0' + currentDate.getMinutes()).slice(-2)
  const seconds = ('0' + currentDate.getSeconds()).slice(-2)
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  nowWeek.value = days[currentDate.getDay()]
  nowDate.value = year + '-' + month + '-' + date
  nowTime.value = hours + ':' + minutes + ':' + seconds
}
getDate()
watchEffect(() => {
  getDate()
  timer.value = setInterval(() => { getDate() }, 1000)
  onBeforeUnmount(() => {
    clearInterval(timer.value)
  })
})

watch(
  () => Router.currentRoute.value,
  (newValue) => {
    menu.value = Route.meta.name
  },
  { immediate: true }
)
</script>
<style scoped lang="less">
.header {
  height: 98px;
  width: 100%;
  background-image: url('/public/image/homePage/top_bg@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: space-between;

  .title {
    position: absolute;
    z-index: 10;
    top: 41%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: PMZD;
    font-size: 44px;
    letter-spacing: 5px;
    background: linear-gradient(180deg, #FFFFFF 35%, #6DB1F1 82%);
    -webkit-background-clip: text;
    /*将设置的背景颜色限制在文字中*/
    -webkit-text-fill-color: transparent;
    /*给文字设置成透明*/
    transition: all .3s;
    cursor: pointer;

    &:hover {
      filter: brightness(150%);
    }
  }

  .leftBox {
    width: 576px;
    height: 66px;
    position: relative;
    background: radial-gradient(51.46% 113.7% at 46.87% 100%, rgba(34, 126, 219, 0.4) 0%, rgba(34, 126, 219, 0) 100%);
    display: flex;
    align-items: center;
    padding-top: 10px;
    box-sizing: border-box;
    transform: translateY(0);
    transition: all .3s;

    .timeBox {
      font-family: DDT;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 0.085em;
      color: #FFFFFF;
      padding-left: 24px;
      line-height: 28.24px;
      width: 110px;
      // margin-right: 25px;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 576px;
      height: 2px;
      background: linear-gradient(90deg, rgba(10, 134, 248, 0.248) -4.59%, rgba(88, 156, 221, 0.8) 50.29%, rgba(10, 134, 248, 0) 98.34%);
      bottom: -2px;
      left: 0;
    }
  }

  .rightBox {
    width: 574px;
    height: 66px;
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 10px;
    background: radial-gradient(51.46% 113.7% at 46.87% 100%, rgba(34, 126, 219, 0.4) 0%, rgba(34, 126, 219, 0) 100%);
    padding-left: 70px;
    box-sizing: border-box;
    transform: translateY(0);
    transition: all .3s;

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 512px;
      height: 2px;
      background: linear-gradient(90deg, rgba(10, 134, 248, 0.248) -4.59%, rgba(88, 156, 221, 0.8) 50.29%, rgba(10, 134, 248, 0) 98.34%);
      bottom: -2px;
      right: 0;
    }

    .dateBox {
      margin-left: -5px;

      p {
        font-size: 14px;
        color: #fff;
      }

      .nowDate {
        letter-spacing: 1px;
      }
    }
  }

  .closeBox {
    transform: translateY(-66px);
  }

  .menuBox {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;

    li {
      width: 117px;
      height: 36px;
      position: relative;
      margin-right: 11px;
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      transition: all .3s;

      &:hover {
        filter: brightness(200%);
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/public/image/homePage/按钮_未选中.png');
        background-repeat: no-repeat;
        background-size: cover;

        z-index: -1;
      }
    }

    li .menu_item_popus {
      position: absolute;
      left: 20px;
      top: 60px;
      width: 120px;
      z-index: 1000;
      transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    li .menu_item_popus p {
      height: 35px;
      border: 1px solid #6DB1F1;
      font-size: 13px;
      text-align: center;
      color: #fff;
      line-height:35px;
      border-radius: 10px;
      margin-bottom: 3px;
      transition: filter 0.3s ease;
      background-image: url('/public/image/supervisingAnalysis/c1.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    li .menu_item_popus p:hover {
      filter: brightness(150%);
    }

    .scaleX {
      &:before {
        transform: scaleX(-1);
      }

      /* 水平翻转背景图 */
    }

    .active {
      width: 153px;
      height: 66px;

      &:before {
        background-image: url('/public/image/homePage/按钮_选中.png');
      }

    }
  }

  .isTab {
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all .3s;

    &:hover {
      filter: brightness(150%);
    }
  }
}
.menu_container{
  position: relative;
}
</style>
