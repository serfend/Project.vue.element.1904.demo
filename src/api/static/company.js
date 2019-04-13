import request from '@/utils/request'

export function getdic(path) {
  return request({
    url: '/company/GetDic',
    method: 'get',
    params: { path }
  })
}

export function create(data) {
  return request({
    url: '/company/create',
    method: 'post',
    data
  })
}

export function authorize(data) {
  return request({
    url: '/company/authorize',
    method: 'post',
    data
  })
}
