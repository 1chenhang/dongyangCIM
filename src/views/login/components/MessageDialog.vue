<template>
  <div class="message_wrapper">
    <el-form ref="phoneDataRef" class="login-form" status-icon :rules="formRule" :model="phoneForm">
      <el-form-item>
        <el-input v-model="phoneNumber" :prefix-icon="Iphone" auto-complete="off" :readonly="readonlyFlag"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="phoneForm.code" :prefix-icon="ChatLineSquare" placeholder="请输入验证码" auto-complete="off"
          @keyup.enter="submitPhone">
          <template #append>
            <el-button class="msgBtn" :disabled="msgFlag" @click="sendMsg">{{ msgFlag ? count + 's' : '获取验证码' }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-submit" type="primary" @click.prevent="submitPhone(phoneDataRef)">确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted, defineEmits, defineProps, toRefs } from 'vue'
import { getPhoneCode, login } from '@/api/index'
import { ChatLineSquare, Iphone } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import AESUtil from '@/utils/cryptoJS'
import md5 from 'js-md5'
const phoneDataRef = ref()

const readonlyFlag = ref(true)
const msgFlag = ref(false)
const count = ref(60)
const timer = ref(null)
const emit = defineEmits(['closeDialog'])
const props = defineProps({
  phoneNumber: {
    type: Number,
    default: 15545454545
  },
  account: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
})
const { phoneNumber, account, password } = toRefs(props)
const router = useRouter()
const phoneForm = reactive({
  username: '',
  password: '',
  code: ''
})
const formRule = reactive({
  code: [{
    required: true,
    message: '请输入验证码',
    trigger: 'blur'
  }]
})
const sendMsg = async () => {
  const { code, msg } = await getPhoneCode({ phone: phoneNumber.value })
  if (code === '200') {
    ElMessage.success('已发送验证码')
    msgFlag.value = true
    timer.value = setInterval(() => {
      count.value--
      if (count.value < 0) {
        clearInterval(timer.value)
        msgFlag.value = false
        count.value = 60
      }
    }, 1000)
  } else {
    ElMessage.error(msg)
  }
}

const submitPhone = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const { code, msg, data } = await login({
        account: account.value,
        password: AESUtil.aesEncrypt(md5(password.value)),
        phone: phoneNumber.value,
        code: phoneForm.code
      })
      if (code === '200') {
        window.sessionStorage.setItem('token', data.token)
        ElMessage.success('登录成功')
        emit('closeDialog')
        router.push('/platformOverview')
      } else {
        ElMessage.error(msg)
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<style scoped lang="less"></style>
