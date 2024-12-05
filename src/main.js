import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import '@/assets/css/common.less'
import '@/assets/css/reset.less'
import './assets/iconfont/iconfont.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import DHPlayer from './utils/videoPlayer'
// eslint-disable-next-line import/no-absolute-path
import config from '../public/config'
import directives from '@/utils/directive' // 引入文件
import screenShort from 'vue-web-screen-shot'
window.config = config

const app = createApp(App)
app.use(store)
app.use(router)

app.use(ElementPlus, { locale: zhCN })
// app.use(DHPlayer)
app.use(directives)
app.mount('#app')
app.use(screenShort, { enableWebRtc: false })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
