const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  publicPath: './',
  devServer: {
    port: 8304,
    hot: true,
    client: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://192.168.2.12:8304', // 将这里的URL替换成你需要转发请求的后端服务器地址
        changeOrigin: true, // 设置为true，本地会虚拟一个服务器接收你的请求并代你发送该请求
        pathRewrite: {
          '^/api': '' // 重写路径，如果后端API没有/api路径，在这里可以重写去掉
        }
      },
      '/geoserver': {
        target: 'http://localhost:9090', // 这是你的GeoServer服务的域名和端口
        ws: true, // 如果你想要代理 websockets
        changeOrigin: true // 这个选项会将主机头的源改为目标URL
      },
      '/flv': {
        target: 'http://192.168.110.194:8404', // 这是你的GeoServer服务的域名和端口
        ws: true, // 如果你想要代理 websockets
        changeOrigin: true // 这个选项会将主机头的源改为目标URL
      },
      '/RPC2|RPC2_Login|RPC_Loadfile/': {
        target: 'http://192.168.2.108:80',
        changeOrigin: true,
        ws: true,
        secure: false
      },
      '/web_caps/': {
        target: 'http://127.0.0.1:80',
        changeOrigin: true,
        ws: true,
        secure: false
      }
    }
  }
})
