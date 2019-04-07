import request from '@/utils/request'

export function getdic(path) {
  return request({
    url: '/company/GetDic',
    method: 'get',
    params: { path }
  })
}
