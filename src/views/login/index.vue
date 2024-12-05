<template>
  <div class="wrapper">
    <h2 class="title">东阳市自然资源智能动态监管平台</h2>
    <div class="loginBox">
      <h2 class="hello">欢迎登录!</h2>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" class="loginForm">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" type="text" placeholder="请输入账号" autocomplete="off">
            <template #prefix>
              <el-icon class="big_icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" autocomplete="off">
            <template #prefix>
              <el-icon class="big_icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnBox">
            <!-- <el-button class="registerBtn" @click="resetForm(loginFormRef)">注册</el-button> -->
            <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 滑动插件 -->
    <VCode :codeShow="codeShow" @codeSuccess="codeSuccess" @closeVCode="codeShow = false" />
    <!-- 短信验证弹窗 -->
    <el-dialog v-model="messageDialog" class="phoneDialog" title="手机验证">
      <MessageDialog :phoneNumber="phoneNumber" :account="loginForm.account" :password="loginForm.password" @closeDialog="messageDialog = false" />
    </el-dialog>
    <div id="sketchBox" ref="sketchBox" class="sketchBox"></div>
  </div>

</template>
<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import VCode from './components/Vcode.vue'
import MessageDialog from './components/MessageDialog.vue'
import { login, getPhoneByAccount } from '@/api'
import { ElMessage } from 'element-plus'
import AESUtil from '@/utils/cryptoJS'
import md5 from 'js-md5'
const loginFormRef = ref()
const codeShow = ref(false)
const messageDialog = ref(false)
const sketchBox = ref()
let sketch = Sketch.create()
const phoneNumber = ref('')
const loginForm = reactive({
  account: '',
  password: ''
})
const rules = reactive({
  account: [{
    required: true,
    message: '请输入账号',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }]
})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const { code, msg, data } = await getPhoneByAccount({
        account: loginForm.account,
        password: AESUtil.aesEncrypt(md5(loginForm.password))
      })
      if (code === '200') {
        phoneNumber.value = +data.phone
        // window.sessionStorage.setItem('token', data.token)
        codeShow.value = true
      } else {
        ElMessage.error(msg)
      }
    } else {
      return false
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const codeSuccess = () => {
  codeShow.value = false
  messageDialog.value = true
}

onMounted(() => {
  const center = {
    x: sketch.width / 2.0,
    y: sketch.height / 2.0
  }
  const orbs = []; let dt = 1; const opt = {
    total: 0,
    count: 100,
    spacing: 2,
    speed: 65,
    scale: 1,
    jitterRadius: 0,
    jitterHue: 0,
    clearAlpha: 10,
    toggleOrbitals: true,
    orbitalAlpha: 100,
    toggleLight: true,
    lightAlpha: 5,
    clear: function () {
      sketch.clearRect(0, 0, sketch.width, sketch.height), orbs.length = 0
    }
  }

  sketchBox.value.appendChild(sketch.element)
  const Orb = function (x, y) {
    const dx = x / opt.scale - center.x / opt.scale; const dy = y / opt.scale - center.y / opt.scale
    this.angle = atan2(dy, dx)
    this.lastAngle = this.angle
    this.radius = sqrt(dx * dx + dy * dy)
    this.size = this.radius / 300 + 1
    this.speed = random(1, 10) / 300000 * this.radius + 0.015
  }
  Orb.prototype.update = function () {
    this.lastAngle = this.angle
    this.angle += this.speed * (opt.speed / 50) * dt
    this.x = this.radius * cos(this.angle)
    this.y = this.radius * sin(this.angle)
  }
  Orb.prototype.render = function () {
    if (opt.toggleOrbitals) {
      let radius = opt.jitterRadius === 0 ? this.radius : this.radius + random(-opt.jitterRadius, opt.jitterRadius)
      radius = opt.jitterRadius != 0 && radius < 0 ? 0.001 : radius
      sketch.strokeStyle = 'hsla( ' + ((this.angle + 90) / (PI / 180) + random(-opt.jitterHue, opt.jitterHue)) + ', 100%, 50%, ' + opt.orbitalAlpha / 100 + ' )'
      sketch.lineWidth = this.size
      sketch.beginPath()
      if (opt.speed >= 0) {
        sketch.arc(0, 0, radius, this.lastAngle, this.angle + 0.001, false)
      } else {
        sketch.arc(0, 0, radius, this.angle, this.lastAngle + 0.001, false)
      }
      ;
      sketch.stroke()
      sketch.closePath()
    }
    ;
    if (opt.toggleLight) {
      sketch.lineWidth = 0.5
      sketch.strokeStyle = 'hsla( ' + ((this.angle + 90) / (PI / 180) + random(-opt.jitterHue, opt.jitterHue)) + ', 100%, 70%, ' + opt.lightAlpha / 100 + ' )'
      sketch.beginPath()
      sketch.moveTo(0, 0)
      sketch.lineTo(this.x, this.y)
      sketch.stroke()
    }
    ;
  }
  const createOrb = function (config) {
    const x = config && config.x ? config.x : sketch.mouse.x; const y = config && config.y ? config.y : sketch.mouse.y
    orbs.push(new Orb(x, y))
  }
  const turnOnMove = function () {
    sketch.mousemove = createOrb
  }
  const turnOffMove = function () {
    sketch.mousemove = null
  }
  sketch.mousedown = function () {
    createOrb()
    turnOnMove()
  }
  sketch.mouseup = turnOffMove
  sketch.resize = function () {
    center.x = sketch.width / 2
    center.y = sketch.height / 2
    sketch.lineCap = 'round'
  }
  sketch.setup = function () {
    while (opt.count--) {
      if (window.CP.shouldStopExecution(1)) {
        break
      }
      createOrb({
        x: random(sketch.width / 2 - 300, sketch.width / 2 + 300),
        y: random(sketch.height / 2 - 300, sketch.height / 2 + 300)
      })
    }
    ;
    window.CP.exitedLoop(1)
  }
  sketch.clear = function () {
    sketch.globalCompositeOperation = 'destination-out'
    sketch.fillStyle = 'rgba( 0, 0, 0 , ' + opt.clearAlpha / 100 + ' )'
    sketch.fillRect(0, 0, sketch.width, sketch.height)
    sketch.globalCompositeOperation = 'lighter'
  }
  sketch.update = function () {
    dt = sketch.dt < 0.1 ? 0.1 : sketch.dt / 16
    dt = dt > 5 ? 5 : dt
    let i = orbs.length
    opt.total = i
    while (i--) {
      if (window.CP.shouldStopExecution(2)) {
        break
      }
      orbs[i].update()
    }
    window.CP.exitedLoop(2)
  }
  sketch.draw = function () {
    sketch.save()
    sketch.translate(center.x - 250, center.y)
    sketch.scale(opt.scale, opt.scale)
    let i = orbs.length
    while (i--) {
      if (window.CP.shouldStopExecution(3)) {
        break
      }
      orbs[i].render()
    }
    window.CP.exitedLoop(3)
    sketch.restore()
  }
})
onUnmounted(() => {
  sketch.destroy()
  sketch = null
  sketchBox.value = null
})

</script>

<script>

</script>
<style scoped lang="less">
@paramsColor: #0475fb;

.wrapper {
  height: 100%;
  // background-image: url('/public/image/login/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #000;
  position: relative;

  .title {
    font-size: 40px;
    font-weight: 400;
    position: absolute;
    top: 100px;
    left: 200px;
    letter-spacing: 2px;
    color: #fff;
    font-family: PMZD;
  }

  .loginBox {
    width: 550px;
    height: 550px;
    padding: 86px 80px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 25px 12px 33px 5px rgba(60, 123, 245, 0.1);
    border-radius: 10px;
    position: absolute;
    top: 180px;
    right: 260px;

    .hello {
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #3a3d3f;
      margin-bottom: 56px;
    }

    .el-form-item {
      margin-bottom: 30px;
    }

    .loginForm {
      .el-input {
        height: 46px;
      }

      .big_icon {
        font-size: 28px;
      }
    }

    .btnBox {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 35px;

      .el-button {
        width: 100%;
        height: 46px;
      }

      .registerBtn {
        border-color: @paramsColor;
        color: @paramsColor;
      }
    }
  }
}
</style>
<style>
.phoneDialog {
  width: 400px;
  padding: 25px 30px 8px
}
</style>
