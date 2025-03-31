<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NAvatar } from 'naive-ui'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'
import UserAuth from '@/components/custom/UserAuth.vue'

const userStore = useUserStore()
const showLoginModal = ref(false)

const userInfo = computed(() => userStore.userInfo)

function handleLoginClick() {
  showLoginModal.value = true
}

function handleLoginSuccess() {
  showLoginModal.value = false
}
</script>

<template>
  <div class="flex items-center overflow-hidden cursor-pointer" @click="handleLoginClick">
    <UserAuth v-if="showLoginModal" v-model:show="showLoginModal" @login-success="handleLoginSuccess" />
    <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <NAvatar
          size="large"
          round
          :src="userInfo.avatar"
          :fallback-src="defaultAvatar"
        />
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
        {{ userInfo.name ?? 'ChenZhaoYu' }}
      </h2>
      <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
        <span
          v-if="isString(userInfo.description) && userInfo.description !== ''"
          v-html="userInfo.description"
        />
      </p>
    </div>
  </div>
</template>
