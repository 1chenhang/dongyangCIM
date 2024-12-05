import request from '@/utils/axios'
const BASE_URL = process.env.NODE_ENV === 'electron' ? process.env.VUE_APP_BASE_API : '/api'
// 地块查询
export const landList = (data, params) => request.post(BASE_URL + '/land/list', data, params)

// 根据地块查询预置点
export const landByYZD = (params) => request.postQuery(BASE_URL + '/dy-camera-preset-info/getPreset', params)
