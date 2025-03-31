<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NForm, NFormItem, NInput, NButton, NTabs, NTabPane, useMessage, NModal } from 'naive-ui'
import { useUserStore } from '@/store/modules/user'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['update:show', 'login-success'])

const userStore = useUserStore()
const message = useMessage()

const activeTab = ref('login')
const loading = ref(false)

const loginForm = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  username: '',
  password: '',
  email: ''
})

async function handleLogin() {
  if (!loginForm.value.username || !loginForm.value.password) {
    message.error('Please fill in all fields')
    return
  }

  loading.value = true
  try {
    const response = await fetch('http://localhost:3003/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginForm.value)
    })

    const data = await response.json()
    if (data.status === 'Success') {
      message.success('Login successful')
      userStore.updateUserInfo({
        name: data.data.user.username,
        token: data.data.token
      })
      // Emit login success event
      emit('login-success')
    } else {
      message.error(data.message)
    }
  } catch (error) {
    message.error('Login failed')
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  if (!registerForm.value.username || !registerForm.value.password || !registerForm.value.email) {
    message.error('Please fill in all fields')
    return
  }

  loading.value = true
  try {
    const response = await fetch('http://localhost:3003/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerForm.value)
    })

    const data = await response.json()
    if (data.status === 'Success') {
      message.success('Registration successful')
      activeTab.value = 'login'
      loginForm.value.username = registerForm.value.username
    } else {
      message.error(data.message)
    }
  } catch (error) {
    message.error('Registration failed')
  } finally {
    loading.value = false
  }
}

function handleClose() {
  emit('update:show', false)
}
</script>

<template>
  <NModal :show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px" @update:show="(val) => emit('update:show', val)">
    <NCard class="card-auth" :bordered="false" size="large">
    <NTabs v-model:value="activeTab" type="segment" animated>
      <NTabPane name="login" tab="Login">
        <NForm>
          <NFormItem label="Username">
            <NInput v-model:value="loginForm.username" placeholder="Enter your username" />
          </NFormItem>
          <NFormItem label="Password">
            <NInput
              v-model:value="loginForm.password"
              type="password"
              placeholder="Enter your password"
              show-password-on="click"
            />
          </NFormItem>
          <div class="flex justify-end">
            <NButton
              type="primary"
              :loading="loading"
              @click="handleLogin"
            >
              Login
            </NButton>
          </div>
        </NForm>
      </NTabPane>

      <NTabPane name="register" tab="Register">
        <NForm>
          <NFormItem label="Username">
            <NInput v-model:value="registerForm.username" placeholder="Choose a username" />
          </NFormItem>
          <NFormItem label="Email">
            <NInput v-model:value="registerForm.email" placeholder="Enter your email" />
          </NFormItem>
          <NFormItem label="Password">
            <NInput
              v-model:value="registerForm.password"
              type="password"
              placeholder="Choose a password"
              show-password-on="click"
            />
          </NFormItem>
          <div class="flex justify-end">
            <NButton
              type="primary"
              :loading="loading"
              @click="handleRegister"
            >
              Register
            </NButton>
          </div>
        </NForm>
      </NTabPane>
    </NTabs>
  </NCard>
  </NModal>
</template>

<style scoped>
.card-auth {
  max-width: 400px;
  margin: 0 auto;
}
</style>