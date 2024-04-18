// 获取token
export function getToken() {
  return sessionStorage.getItem('uc-token') || ''
}

// 设置token
export function setToken(value) {
  sessionStorage.setItem('uc-token', value)
}

// 将用户信息存入session
export function setUserInfo(value) {
  if (typeof value === 'string') {
    return sessionStorage.setItem('userInfo', value)
  } else if (typeof value === 'object') {
    return sessionStorage.setItem('userInfo', JSON.stringify(value))
  }
}

// 从session获取用户信息
export function getUserInfo() {
  return sessionStorage.getItem('userInfo')
}
