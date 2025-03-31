<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NList, NListItem, NButton, NEmpty, useMessage } from 'naive-ui'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const message = useMessage()

interface ChatHistoryItem {
  id: number
  prompt: string
  created_at: string
}

const chatHistory = ref<ChatHistoryItem[]>([])
const loading = ref(false)

async function fetchChatHistory() {
  if (!userStore.isAuthenticated) {
    chatHistory.value = []
    return
  }

  loading.value = true
  try {
    const response = await fetch('/api/chat-history', {
      headers: {
        'Authorization': `Bearer ${userStore.userInfo.token}`
      }
    })

    const data = await response.json()
    if (data.status === 'Success') {
      chatHistory.value = data.data
    } else {
      message.error('Failed to fetch chat history')
    }
  } catch (error) {
    message.error('Failed to fetch chat history')
  } finally {
    loading.value = false
  }
}

async function deleteChat(chatId: number) {
  try {
    const response = await fetch(`/api/chat-history/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userStore.userInfo.token}`
      }
    })

    const data = await response.json()
    if (data.status === 'Success') {
      message.success('Chat deleted successfully')
      await fetchChatHistory()
    } else {
      message.error('Failed to delete chat')
    }
  } catch (error) {
    message.error('Failed to delete chat')
  }
}

onMounted(() => {
  fetchChatHistory()
})

defineExpose({
  refreshHistory: fetchChatHistory
})
</script>

<template>
  <NCard title="Chat History" :bordered="false">
    <template #header-extra>
      <NButton text type="primary" @click="fetchChatHistory" :loading="loading">
        Refresh
      </NButton>
    </template>

    <div v-if="!userStore.isAuthenticated" class="text-center py-4">
      <NEmpty description="Please login to view chat history" />
    </div>
    <div v-else-if="loading" class="text-center py-4">
      Loading...
    </div>
    <div v-else-if="chatHistory.length === 0" class="text-center py-4">
      <NEmpty description="No chat history found" />
    </div>
    <NList v-else>
      <NListItem v-for="chat in chatHistory" :key="chat.id">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="font-medium">{{ chat.prompt }}</div>
            <div class="text-sm text-gray-500 mt-1">
              {{ new Date(chat.created_at).toLocaleString() }}
            </div>
          </div>
          <NButton
            text
            type="error"
            @click="deleteChat(chat.id)"
          >
            Delete
          </NButton>
        </div>
      </NListItem>
    </NList>
  </NCard>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-start {
  align-items: flex-start;
}

.flex-1 {
  flex: 1;
}

.font-medium {
  font-weight: 500;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-500 {
  color: #6b7280;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>