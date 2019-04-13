import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Account/login/rest',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/Account/register/rest',
    method: 'post',
    data
  })
}
export function getInfo() {
  return request({
    url: '/Account/GetInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

