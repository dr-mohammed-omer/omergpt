import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './types'
import { defaultSetting, getLocalState, setLocalState, clearToken } from './helper'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.isAuthenticated = !!userInfo.token
      this.recordState()
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo }
      this.isAuthenticated = false
      clearToken()
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    },
  },
})
