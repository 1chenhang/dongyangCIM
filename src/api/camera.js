import request from '@/utils/axios'
const BASE_URL = process.env.NODE_ENV === 'electron' ? process.env.VUE_APP_BASE_API : '/api'
// 云台操作 上、下、左、右、焦距变大、焦距变小、焦点前调、焦点后调、光圈扩大、光圈缩小
export const ptzControl = (params) => request.get(BASE_URL + '/ptzControl/ptzControl', params)

// 快速定位
export const exPtzFastGoTo = (params) => request.get(BASE_URL + '/ptzControl/exPtzFastGoTo', params)

// 摄像头列表
export const cameraList = (params) => request.postBody(BASE_URL + '/dy-device/list', params)

// 摄像头列表
export const cameraListPage = (data, params) => request.post(BASE_URL + '/dy-device/listPage', data, params)

// 摄像头列表
export const getLandInfoByCamera = (params) => request.get(BASE_URL + '/land/getLandInfoByCamera', params)

// 摄像头预置点
export const getYZD = (params) => request.postQuery(BASE_URL + '/dy-camera-preset-info/add', params)

// 地块与摄像头关联
export const getMonitorByLand = (params) => request.postBody(BASE_URL + '/dy-monitor-plot-info/add', params)

// 摄像头定位至预置点
export const getPtzPointMove = (params) => request.get(BASE_URL + '/ptzControl/ptzPointMove', params)

// 获取摄像头视频流
export const getPreviewUrl = (params) => request.postQuery(BASE_URL + '/dy-device/getPreviewUrl', params)

// 水印新增
export const watermarkAdd = (params) => request.postBody(BASE_URL + '/watermark-config/add', params)

// 水印编辑
export const watermarkEdit = (params) => request.postBody(BASE_URL + '/watermark-config/edit', params)

// 水印查询
export const watermarkList = (params) => request.postBody(BASE_URL + '/watermark-config/list', params)

// 预警配置查询
export const alarmConfigList = (data, params) => request.post(BASE_URL + '/alarmConfig/listPage', data, params)

// 预警配置修改
export const alarmConfigEdit = (data, params) => request.postBody(BASE_URL + '/alarmConfig/update', data, params)

// 预警配置新增
export const alarmConfigAdd = (data, params) => request.postBody(BASE_URL + '/alarmConfig/add', data, params)

// 预警类型查询
export const getAlarmType = (params) => request.post(BASE_URL + '/alarmConfig/getAlarmType', params)

// 地块类型查询
export const getAllLandType = (params) => request.post(BASE_URL + '/alarmConfig/getAllLandType', params)

// 删除预警消息
export const alarmConfigDel = (params) => request.postBody(BASE_URL + '/alarmConfig/del', params)

// 预警信息统计查询
export const getStatistics = (params) => request.post(BASE_URL + '/dy-alarm/statistics', params)

// 数量统计- 历史告警、今日告警
export const getStatisticsHistory = (params) => request.post(BASE_URL + '/dy-alarm/statisticsHistory', params)

// 摄像机状态统计
export const getDeviceStatistics = () => request.get(BASE_URL + '/dy-device/statistics')

// 获取所有用户
export const allUser = () => request.post(BASE_URL + '/user/allUser')

// 下载文件
export const downloadFile = (params) => request.get(BASE_URL + '/file/download', params)

// 取证配置查询
export const forensicConfiglistPage = (data, params) => request.post(BASE_URL + '/dy-forensic-config/listPage', data, params)

// 取证配置新增
export const forensicConfigAdd = (params) => request.post(BASE_URL + '/dy-forensic-config/add', params)

// 取证配置删除
export const forensicConfigDel = (params) => request.postBody(BASE_URL + '/dy-forensic-config/del', params)

// 取证配置编辑
export const forensicConfigEdit = (params) => request.post(BASE_URL + '/dy-forensic-config/edit', params)

// 取证类型-查询
export const getForensicType = (params) => request.get(BASE_URL + '/dy-forensic-config/getForensicType', params)

// 取证类型-查询
export const setForensicType = (params) => request.get(BASE_URL + '/dy-forensic-config/setForensicType', params)

// 上右、上左、下右、下左
export const exPtzControl = (params) => request.get(BASE_URL + '/ptzControl/exPtzControl', params)

// 查询未读数据
export const unreadData = (params) => request.post(BASE_URL + '/dy-alarm/unreadData', params)

// 更改数据已读状态
export const updateReadStatus = (params) => request.post(BASE_URL + `/dy-alarm/updateReadStatus?id=${params.id}`)

// 根据时间统计预警分类
export const getAlarmOtherTypeCountByDate = (params) => request.get(BASE_URL + '/statics/getAlarmOtherTypeCountByDate', params)

// 根据时间统计预警类型
export const getAlarmTypeCountByDate = (params) => request.get(BASE_URL + '/statics/getAlarmTypeCountByDate', params)

// 根据时间统计各个镇街的预警数量
export const getAlarmCountWithZjByDate = (params) => request.get(BASE_URL + '/statics/getAlarmCountWithZjByDate', params)

// 近两周的预警数量
export const near2weeksWarnCount = (params) => request.get(BASE_URL + '/statics/near2weeksWarnCount', params)

// 根据时间统计各个状态的预警数量
export const getAlarmCountWithStateByDate = (params) => request.get(BASE_URL + '/statics/getAlarmCountWithStateByDate', params)

// 根据处置状态和时间统计
export const countByHandleStatusAndTime = (params) => request.get(BASE_URL + '/statics/countByHandleStatusAndTime', params)

// 研判状态
export const judgmeState = (params) => request.get(BASE_URL + '/statics/judgmeState', params)

// 处置类别统计
export const countByHandleType = (params) => request.get(BASE_URL + '/statics/countByHandleType', params)

// 获取摄像头PTZ
export const getPtzParam = (params) => request.get(BASE_URL + '/ptzControl/getPtzParam', params)

// 三纬精确定位
export const getPTZGoTo = (params) => request.get(BASE_URL + '/ptzControl/ptzGoTo', params)

// 摄像头 关联地块
export const cameraMapping = (params) => request.postBody(BASE_URL + '/land/camera/mapping', params)
// 模型自动训练配置-新增
export const autoTrainAdd = (data) => request.post(BASE_URL + '/model-training-config/autoTrainAdd', data)

// 模型训练配置新增
export const modelTrainingConfig = (data) => request.post(BASE_URL + '/model-training-config/add', data)
