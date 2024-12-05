/* eslint-disable prefer-regex-literals */

import { ElMessage, ElNotification } from 'element-plus'

/**
 *  向剪切板写入指定内容
 *
 * @param content
 * @param detail
 * @param message
 * @returns {boolean}
 */
export const setCopyContent = (content, detail, message) => {
  const input = document.createElement('input')
  input.setAttribute('id', 'copy-id-input')
  input.setAttribute('value', content)
  document.body.appendChild(input)

  input.select()
  if (document.execCommand('copy')) {
    let tip = '已复制该内容到剪切板！'
    if (detail) {
      if (message) {
        tip = `已复制 ${message} 到剪切板！`
      } else {
        tip = `已复制 ${content} 到剪切板！`
      }
    }
    ElMessage.success({ message: tip, center: true })
  }

  document.body.removeChild(document.getElementById('copy-id-input'))
}

/**
 * 表单序列化
 *
 * @param data
 * @returns {string}
 */
export const serialize = (data) => {
  const list = []
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

/**
 * 获取对象类型
 *
 * @param obj
 * @returns {string|*}
 */
export const getObjType = (obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}

/**
 * 对象深拷贝
 *
 * @param data
 * @returns {{}|*}
 */
export const deepClone = (data) => {
  const type = getObjType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

/**
 * 设置灰度模式
 *
 * @param status
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}

/**
 * 设置主题
 *
 * @param name
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 * 递归寻找子类的父类
 *
 * @param menu
 * @param id
 * @returns {undefined|*}
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 动态插入css
 *
 * @param url
 */
export const loadStyle = (url) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 判断2个对象属性和值是否相等
 *
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  const o1 = obj1 instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }

  for (const attr in obj1) {
    const t1 = obj1[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

/**
 * 根据字典的value显示label
 *
 * @param dic
 * @param value
 * @returns {string|*}
 */
export const findDicLabel = (dic, value) => {
  let result = ''
  if (isNull(dic)) return value
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    let index = 0
    index = findDicIndex(dic, value)
    if (index !== -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach((ele) => {
      index = findDicIndex(dic, ele)
      if (index !== -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}

/**
 * 根据字典的value查找对应的index
 *
 * @param dic
 * @param value
 * @returns {number}
 */
export const findDicIndex = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i
    }
  }
  return -1
}

/**
 * 生成随机len位数字
 *
 * @param len
 * @param date
 * @returns {string}
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 *
 * @param date1
 * @param date2
 * @returns {{leave1, hours, seconds, leave2, leave3, minutes, days}}
 */
export const calcDate = (date1, date2) => {
  const date3 = date2 - date1

  const days = Math.floor(date3 / (24 * 3600 * 1000))

  const leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))

  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))

  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * 日期格式化
 *
 * @param date
 * @returns {string}
 */
export function dateFormat (date) {
  let format = 'yyyy-MM-dd hh:mm:ss'
  if (date !== 'Invalid Date') {
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  }
  return ''
}

/**
 * esc监听全屏
 *
 * @param callback
 */
export const listenFullscreen = (callback) => {
  function listen () {
    callback()
  }

  document.addEventListener('fullscreenchange', function () {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function () {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function () {
    listen()
  })
  document.addEventListener('msfullscreenchange', function () {
    listen()
  })
}

/**
 * 判断是否为Url
 * @param url
 * @returns {boolean}
 */
export function isUrl (url) {
  return /^http[s]?:\/\/.*/.test(url)
}

/**
 * 判断是否为Email
 * @param email
 * @returns {boolean}
 */
export function isEmail (email) {
  return /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
}

/**
 * 判断是否为手机号码
 * @param phone
 * @returns {boolean}
 */
export function isPhone (phone) {
  return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/.test(phone)
}

/**
 * 判断是否为整数
 * @param num
 * @param type
 * @returns {boolean}
 */
export function isNum (num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) return false
  } else if (type === 2) {
    regName = /[^\d]/g
    if (!regName.test(num)) return false
  }
  return true
}

/**
 * 判断是否为小数
 * @param num
 * @param type
 * @returns {boolean}
 */
export function isNumord (num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) return false
  } else if (type === 2) {
    regName = /[^\d.]/g
    if (!regName.test(num)) return false
  }
  return true
}

/**
 * 判断是否为空
 * @param val
 * @returns {boolean}
 */
export function isNull (val) {
  if (typeof val === 'boolean') return false
  if (typeof val === 'number') return false
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    return val === 'null' || val == null || val === 'undefined' || val === undefined || val === ''
  }
  return false
}

export const assign = (source, target) => {
  Object.assign(source, target)
}

// 判断当前时间段
export const getTimeState = () => {
  // 获取当前时间
  const timeNow = new Date()
  // 获取当前小时
  const hours = timeNow.getHours()
  // 设置默认文字
  let text = ''
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    text = '早上好'
  } else if (hours > 10 && hours <= 14) {
    text = '中午好'
  } else if (hours > 14 && hours <= 18) {
    text = '下午好'
  } else if (hours > 18 && hours <= 24) {
    text = '晚上好'
  }
  // 返回当前时间段对应的状态
  return text
}

// 隐藏手机号中间四位
export const getShowPhone = (phone) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 提示错误信息
export const errorNotification = (msg) => {
  return ElNotification({
    title: '错误',
    message: msg,
    type: 'error'
  })
}

// 提示警告信息
export const warnNotification = (msg) => {
  return ElNotification({
    title: '提示',
    message: msg,
    type: 'warning'
  })
}
// 提示成功信息
export const successNotification = (msg) => {
  return ElNotification({
    title: '操作成功',
    message: msg,
    type: 'success'
  })
}
// el-form公共校验语句
export const formRule = (message, trigger) => {
  return [
    {
      required: true,
      message: message,
      trigger: trigger
    }
  ]
}

// 定义天地图全局ak
export const tTk = () => {
  return 'be50c7492442ecf4e61ca7bd578d6b8b'
}

// 下载excel文件流
export const downloadFile = (filename, data) => {
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
  const hrefUrl = URL.createObjectURL(blob)
  eleLink.href = hrefUrl
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

// 拼接完整日期格式
export const completeDate = (time, type) => {
  return time + (type === '0' ? ' 00:00:00' : ' 23:59:59')
}

// 去除经纬度中指定字符
export const replaceLonLat = (str, type) => {
  if (type === 'lon') {
    const reg1 = new RegExp('°E')
    return str.replace(reg1, '')
  }
  const reg2 = new RegExp('°N')
  return str.replace(reg2, '')
}

// 计算多边形的质心
export const computeCentroid = (positions) => {
  let x = 0; let y = 0; let z = 0
  for (let i = 0; i < positions.length; i++) {
    x += positions[i].x
    y += positions[i].y
    z += positions[i].z
  }
  const centroid = new Cesium.Cartesian3(x / positions.length, y / positions.length, z / positions.length)

  // 将质心转换为经纬度
  const cartographic = Cesium.Cartographic.fromCartesian(centroid)
  const longitude = Cesium.Math.toDegrees(cartographic.longitude)
  const latitude = Cesium.Math.toDegrees(cartographic.latitude)

  return [longitude, latitude]
}

// 判断对象是否为空
export const isEmptyObject = (obj) => {
  if (!obj) return true
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const isString = (str) => {
  return typeof str === 'string'
}

export const exportFileType = (type) => {
  let fileType
  switch (type) {
    case 'png':
    case 'jpg':
    case 'gif':
    case 'jpeg':
      fileType = `image/${type}`
      break
    case 'doc':
      fileType = 'application/msword'
      break
    case 'xls':
      fileType = 'application/vnd.ms-excel'
      break
    case 'pdf':
      fileType = 'application/pdf'
      break
    case 'ppt':
      fileType = 'application/vnd.ms-powerpoint'
      break
    default:
      break
  }
  return fileType
}

// js年月日时分秒中文格式
export const timeline = (datetype) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (datetype === '月') {
    return year + '年' + month + '月'
  } else if (datetype === '日') {
    return year + '年' + month + '月' + day + '日'
  } else if (datetype === '秒') {
    return year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分' + second + '秒'
  } else if (datetype === '分') {
    return year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分'
  } else if (datetype === 'year-week-day') {
    return year + '-' + month + '-' + day
  } else if (datetype === 'beforeDay') {
    const yesterday = new Date(date)
    yesterday.setDate(date.getDate() - 1)
    const yYear = yesterday.getFullYear()
    const yMonth = (yesterday.getMonth() + 1 < 10 ? '0' : '') + (yesterday.getMonth() + 1)
    const yDay = (yesterday.getDate() < 10 ? '0' : '') + yesterday.getDate()
    return yYear + '-' + yMonth + '-' + yDay
  } else if (datetype === 'beforeMonth') {
    const lastMonth = new Date(date)
    lastMonth.setMonth(date.getMonth() - 1)
    const lYear = lastMonth.getFullYear()
    const lMonth = (lastMonth.getMonth() + 1 < 10 ? '0' : '') + (lastMonth.getMonth() + 1)
    const lDay = (lastMonth.getDate() < 10 ? '0' : '') + lastMonth.getDate()
    return lYear + '-' + lMonth + '-' + lDay
  } else if (datetype === 'beforeWeek') {
    const lastWeek = new Date(date)
    lastWeek.setDate(date.getDate() - 7)
    const lwYear = lastWeek.getFullYear()
    const lwMonth = (lastWeek.getMonth() + 1 < 10 ? '0' : '') + (lastWeek.getMonth() + 1)
    const lwDay = (lastWeek.getDate() < 10 ? '0' : '') + lastWeek.getDate()
    return lwYear + '-' + lwMonth + '-' + lwDay
  } else if (datetype === 'beforeDay2') {
    const yesterday = new Date(date)
    yesterday.setDate(date.getDate() - 1)
    const yYear = yesterday.getFullYear()
    const yMonth = (yesterday.getMonth() + 1 < 10 ? '0' : '') + (yesterday.getMonth() + 1)
    const yDay = ((yesterday.getDate() < 10 ? '0' : '') + yesterday.getDate())-1
    return yYear + '-' + yMonth + '-' + yDay
  }
}
// 下载.MP4格式文件
export const downloadMP4 = (url, filename) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = xhr.response
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    }
  }
  xhr.send()
}
