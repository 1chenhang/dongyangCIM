import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/platformOverview',
    component: () => import('@/components/homePage'),
    children: [
      {
        path: '/platformOverview',
        name: 'platformOverview',
        meta: {
          name: '平台总览'
        },
        component: () => import('@/views/platformOverview/index.vue')
      },
      {
        path: '/earlyWarningAnalysis',
        name: 'earlyWarningAnalysis',
        meta: {
          name: '预警研判'
        },
        component: () => import('@/views/earlyWarningAnalysis/index.vue')
      },
      {
        path: '/smartEvidence',
        name: 'SmartEvidence',
        meta: {
          name: '智能取证'
        },
        component: () => import('@/views/smartEvidence/newIndex.vue')
      },
      {
        path: '/earlyWarningInterpretation',
        name: 'earlyWarningInterpretation',
        meta: {
          name: '违法处置'
        },
        component: () => import('@/views/earlyWarningInterpretation/index.vue')
      },
      {
        path: '/cameraManagement',
        name: 'cameraManagement',
        meta: {
          name: '监控对象'
        },
        component: () => import('@/views/cameraManagement/index.vue')
      },
      {
        path: '/videoPartrol',
        name: 'videoPartrol',
        meta: {
          name: '视频巡地'
        },
        component: () => import('@/views/videoPartrol/index.vue')
      },
      {
        path: '/earlywarningStatistics',
        name: 'earlywarningStatistics',
        meta: {
          name: '预警统计'
        },
        component: () => import('@/views/earlywarningStatistics/index.vue')
      },
      {
        path: '/supervisingAnalysis',
        name: 'supervisingAnalysis',
        meta: {
          name: '监控分析'
        },
        component: () => import('@/views/supervisingAnalysis/index.vue')
      },
      {
        path: '/entrancePage',
        name: 'entrancePage',
        meta: {
          name: '入口页'
        },
        component: () => import('@/views/entrancePage/index.vue')
      }
    ]
  },

  {
    name: '403',
    path: '/403',
    meta: {
      title: '403'
    },
    component: () => import('@/components/error/403.vue')
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '404'
    },
    component: () => import('@/components/error/404.vue')
  },
  {
    name: '500',
    path: '/500',
    meta: {
      title: '500'
    },
    component: () => import('@/components/error/500.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
