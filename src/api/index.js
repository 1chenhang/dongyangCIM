import request from '@/utils/axios'
const BASE_URL = process.env.NODE_ENV === 'electron' ? process.env.VUE_APP_BASE_API : '/api'
// 根据三个经纬度点计算角度
export const postCalculateAngle = (params) => request.postBody('/coordinate/calculateAngle', params)

// 登录
export const login = (params) => request.postBody(BASE_URL + '/user/login', params)

// 获取手机号
export const getPhoneByAccount = (params) => request.postBody(BASE_URL + '/user/getPhoneByAccount', params)

// 获取短信验证码
export const getPhoneCode = (params) => request.postQuery(BASE_URL + '/user/Code', params, {})

// 上传文件
export const getUpload = (params) => request.postUpload(BASE_URL + '/file/upload', null, params)
