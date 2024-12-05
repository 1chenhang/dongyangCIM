import request from '@/utils/axios'
const BASE_URL = process.env.NODE_ENV === 'electron' ? process.env.VUE_APP_BASE_API : '/api'
// 预警统计
export const warninfoStatistics = (params) => request.postBody(BASE_URL + '/warninfo/statistics', {})

// 预警信息列表-查询
export const alarmListPage = (data, params) => request.post(BASE_URL + '/dy-alarm/listPage', data, params)

// 预警信息处理
export const alarmInfoExcute = (data, params) => request.post(BASE_URL + '/dy-alarm/alarmInfo/excute', data, params)

// 预警结果处理
export const alarmHandleResult = (params) => request.putQuery(BASE_URL + '/dy-alarm/alarmHandle/result', params)

// 摄像头列表
export const getOneByFeatureId = (params) => request.get(BASE_URL + '/land/getOneByFeatureId', params)