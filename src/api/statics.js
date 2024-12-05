import request from '@/utils/axios'
const BASE_URL = process.env.NODE_ENV === 'electron' ? process.env.VUE_APP_BASE_API : '/api'
// 视频监控摄像分析
export const getStaticsCamera = (params) => request.get(BASE_URL + '/statics/camera', params)

// 识别分析情况
export const getStaticsJudState = (params) => request.get(BASE_URL + '/statics/judgmeState', params)

// 故障数量
export const getFaultCountByDay = (params) => request.get(BASE_URL + '/statics/faultCountByDay', params)

// 处置类别
export const getStaticsCountByHandleType = (params) => request.get(BASE_URL + '/statics/countByHandleType', params)
