<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutHeader, NLayoutSider, NLayoutContent, NButton } from 'naive-ui'
import { useUserStore } from '@/store/modules/user'
import UserAuth from './UserAuth.vue'
import ChatHistory from './ChatHistory.vue'

const userStore = useUserStore()
const showLoginModal = ref(false)
const chatHistoryRef = ref()

function handleLoginSuccess() {
  showLoginModal.value = false
  if (chatHistoryRef.value)
    chatHistoryRef.value.refreshHistory()
}

function handleLogout() {
  userStore.resetUserInfo()
}
</script>

<template>
  <NLayout class="layout" has-sider>
    <NLayoutSider
      bordered
      collapse-mode="width"
      :collapsed-width="0"
      :width="260"
      :native-scrollbar="false"
      class="layout-sider"
      show-trigger
    >
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              class="avatar"
              :src="userStore.userInfo.avatar"
              :alt="userStore.userInfo.name"
            >
            <span class="ml-2">{{ userStore.userInfo.name }}</span>
          </div>
          <div>
            <NButton v-if="!userStore.isAuthenticated" text @click="showLoginModal = true">
              Login
            </NButton>
            <NButton v-else text @click="handleLogout">
              Logout
            </NButton>
          </div>
        </div>
        <ChatHistory ref="chatHistoryRef" />
      </div>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered class="layout-header">
        <div class="flex items-center justify-between w-full px-4">
          <div class="flex-1" />
          <div>
            <NButton v-if="!userStore.isAuthenticated" type="primary" @click="showLoginModal = true">
              Login
            </NButton>
            <NButton v-else @click="handleLogout">
              Logout
            </NButton>
          </div>
        </div>
      </NLayoutHeader>
      <NLayoutContent class="layout-content">
        <slot />
      </NLayoutContent>
    </NLayout>
  </NLayout>

  <div v-if="showLoginModal" class="modal-backdrop" @click="showLoginModal = false">
    <div class="modal-wrapper" @click.stop>
      <UserAuth @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100vh;
}

.layout-sider {
  background-color: #fff;
}

.layout-header {
  height: 64px;
  padding: 16px;
  background-color: #fff;
}

.layout-content {
  padding: 24px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.flex {
  display: flex;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-wrapper {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  min-width: 320px;
}

.flex-1 {
  flex: 1;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.p-4 {
  padding: 1rem;
}
</style>