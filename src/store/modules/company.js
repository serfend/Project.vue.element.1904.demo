import {
  getdic,
  create,
  authorize
} from '@/api/static/company'

const actions = {
  // company dic
  getdic({ commit }, data) {
    return new Promise((resolve, reject) => {
      var query = data
      getdic(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 创建新的单位，需要相应权限
  create({ commit }, data) {
    return new Promise((resolve, reject) => {
      create({
        Name: data.name,
        ParentPath: data.parentPath
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 对指定用户进行授权，使其拥有创建单位的权限
  authorize({ commit }, data) {
    return new Promise((resolve, reject) => {
      authorize({
        UserName: data.username,
        AuthorizePath: data.path
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
