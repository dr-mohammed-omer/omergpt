import { ss } from '@/utils/storage'
import type { UserInfo, UserState } from './types'

const LOCAL_NAME = 'userStorage'
const TOKEN_NAME = 'token'

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/Chanzhaoyu/chatgpt-web/main/src/assets/avatar.jpg',
      name: 'Guest',
      description: 'Please login to save your chat history',
      token: '',
    },
    isAuthenticated: false,
  }
}

export function getToken(): string | null {
  return ss.get(TOKEN_NAME)
}

export function setToken(token: string): void {
  ss.set(TOKEN_NAME, token)
}

export function clearToken(): void {
  ss.remove(TOKEN_NAME)
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  const token = getToken()
  return {
    ...defaultSetting(),
    ...localSetting,
    userInfo: {
      ...defaultSetting().userInfo,
      ...(localSetting?.userInfo || {}),
      token: token || '',
    },
    isAuthenticated: !!token,
  }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
  if (setting.userInfo.token)
    setToken(setting.userInfo.token)
  else
    clearToken()
}
