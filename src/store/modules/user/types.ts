export interface UserInfo {
  avatar?: string
  name?: string
  description?: string
  token?: string
}

export interface UserState {
  userInfo: UserInfo
  isAuthenticated: boolean
}