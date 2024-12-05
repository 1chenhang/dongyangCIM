<template>
  <div class="b_wrapper">
    <swiper :modules="modules" :slides-per-view="4" :loop="true" :navigation="navigation" @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide @click="MenuClick(item.path)" v-for="item in menuList" :key="item.label">
        <div class="outBox">
          <img class="img" :src="require('/public/image/entrancePage/选中箭头.png')" alt="">
          <div class="swiperBox">
            <div class="roundBox">
              <i><span></span></i>
            </div>
            <img :src="item.url" alt="">
            <div class="text">
              {{ item.label }}
            </div>
          </div>
        </div>

      </swiper-slide>

      <div class="swiper-button-prev" @click.stop="prevEl(item, index)" />
      <div class="swiper-button-next" @click.stop="nextEl" />
    </swiper>
    <div class="baseBg"></div>
    <ul class="bottomIconBox">
      <li @click="setUpClick(item)" v-for="item in setUpList" :key="item.label">
        <div class="iconBgBox">
          <img :src="item.url" alt="">
        </div>

        <div class="text">
          {{ item.label }}
        </div>
      </li>
    </ul>

  </div>
  <img class="bottomBg" :src="require('/public/image/entrancePage/底.png')" alt="">
</template>
<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/navigation'
import { Navigation, A11y } from 'swiper/modules'
import 'swiper/css'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import Store from '@/store'
const modules = [Navigation, A11y]
const Router = useRouter()
const navigation = ref({
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
})
const menuList = ref([
  {
    label: '平台总览',
    url: './image/entrancePage/平台总览_icon.png',
    path: '/platformOverview'
  },
  {
    label: '预警研判',
    url: './image/entrancePage/预警研判_icon.png',
    path: '/earlyWarningAnalysis'
  },
  {
    label: '视频巡地',
    url: './image/entrancePage/视频巡地_icon.png',
    path: '/videoPartrol'
  },
  // {
  //   label: '违法处置',
  //   url: './image/entrancePage/违法处置_icon.png',
  //   path: '/earlyWarningInterpretation'
  // },
  // {
  //   label: '监控对象',
  //   url: './image/entrancePage/监控对象_icon.png',
  //   path: '/cameraManagement'
  // },
  {
    label: '监控分析',
    url: './image/entrancePage/监控分析_icon.png',
    path: '/supervisingAnalysis'
  }
])
const setUpList = ref(
  [
    {
      label: '数据管理',
      url: './image/entrancePage/数据管理_icon.png',
      path: ''
    },
    {
      label: '视频管理',
      url: './image/entrancePage/视频管理_icon.png',
      path: ''
    },
    {
      label: '系统管理',
      url: './image/entrancePage/系统管理_icon.png',
      path: ''
    },
    {
      label: '退出登录',
      url: './image/entrancePage/退出登录_icon.png',
      path: ''
    }
  ]
)
const onSwiper = (swiper) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}
const prevEl = (item, index) => {
  // console.log('上一张' + index + item)
}
const nextEl = () => {
  // console.log('下一张')
}
const MenuClick = (path) => {
  Router.push(path)
}
const setUpClick = (param) => {
  if (param.label === '退出登录') {
    ElNotification({
      title: '成功',
      message: '退出成功',
      type: 'success'
    })
    setTimeout(() => {
      Store.commit('logout')
      Router.push({ path: '/login' })
    }, 1000)
  } else if (param.label === '系统管理') {
    window.open('http://localhost:8110/#/')
  } else {
    ElNotification({
      title: '提示',
      message: '功能开发中....',
      type: 'warning'
    })
    // Router.push(param.path)
  }
}

</script>
<style>
.b_wrapper {
  padding: 140px 110px 0;
  position: relative;
  z-index: 10;
  height: 100%;
  box-sizing: border-box;

  .swiper {
    width: 100%;

    z-index: 10;

    .swiper-slide {
      display: flex;
      justify-content: center;
    }

    .swiper-button-next,
    .swiper-button-prev {
      width: 42px;
      height: 63px;
      background-size: cover;
      background-repeat: no-repeat;
      transition: all .3s;

      &:after {
        display: none
      }

      &:hover {
        filter: brightness(150%);
      }
    }

    .swiper-button-prev {
      background-image: url('/public/image/entrancePage/上一页.png');
      left: 0;
      top: var(--swiper-navigation-top-offset, 60%);
    }

    .swiper-button-next {
      background-image: url('/public/image/entrancePage/下一页.png');
      right: 0;
      top: var(--swiper-navigation-top-offset, 60%);
    }

    .outBox {
      height: 550px;
      display: flex;
      align-items: flex-end;
      position: relative;
      cursor: pointer;

      &:hover .img {
        top: 20px;
      }

      &:hover .swiperBox {
        background-image: url('/public/image/entrancePage/选中bg.png');
      }

      .img {
        position: absolute;
        top: -150px;
        left: 110px;
        transition: all .3s;
      }

    }

    .swiperBox {
      width: 317px;
      height: 394px;
      position: relative;
      background-image: url('/public/image/entrancePage/icon_bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin-top: 75px;
        margin-bottom: 40px;
      }

      .text {
        font-family: YSBTH;
        font-size: 36px;
        letter-spacing: 0.12em;
        color: #fff;

      }

      .roundBox {
        position: absolute;
        top: 13px;
        left: 46px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        transform: rotateX(70deg) rotateY(-10deg);

        &::before {
          content: "";
          border-radius: 50%;
          padding: 3px;
          inset: 0;
          position: absolute;
          background: linear-gradient(147.58deg, rgba(255, 255, 255, 0) 24.98%, rgba(0, 229, 255, 0.851) 61.49%, #FFFFFF 74.86%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        i {
          display: block;
          width: 200px;
          height: 200px;
          position: absolute;
          left: -10px;
          top: -10px;
          border-radius: 50%;
          border: 10px solid transparent;
          /*旋转*/
          animation: circleRoate 10s infinite;
          animation-timing-function: linear;

          span {
            position: absolute;
            left: 172px;
            top: 28px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(140.65deg, #FFFFFF 22.76%, #4486CD 96.12%);

          }
        }
      }

    }
  }

  .baseBg {
    width: 1706px;
    height: 261px;
    background-image: url('/public/image/entrancePage/梯形.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    z-index: 10;
    bottom: 66px;
  }

  .bottomIconBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 100px;
    width: calc(100% - 220px);
    z-index: 10;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      &:hover .iconBgBox {
        background-position-y: 0px;

        img {
          filter: brightness(200%);
        }
      }

      .iconBgBox {
        width: 193px;
        height: 117px;
        background-image: url('/public/image/entrancePage/选中光.png');
        background-position-y: 100px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .3s;
      }

      .text {
        font-family: YSBTH;
        font-size: 22px;
        letter-spacing: 0.08em;
        color: #fff;
      }
    }
  }

}

.bottomBg {
  position: absolute;
  bottom: 0;
  z-index: 10
}

@keyframes circleRoate {
  from {
    transform: rotate(0deg) infinite;
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes light {

  0% {
    filter: hue-rotate(0deg);
    /*色调旋转*/
  }

  20% {
    filter: hue-rotate(100deg);
    /*色调旋转*/
  }

  40% {
    filter: hue-rotate(200deg);
    /*色调旋转*/
  }

  100% {
    filter: hue-rotate(360deg);
    /*色调旋转*/
  }

}

@media screen and (max-height:953px) {
  .b_wrapper {
    padding: 70px 110px 0;

    .bottomIconBox {
      bottom: 50px;
    }
  }
}
</style>
