import {
  login,
  register,
  logout,
  getInfo
} from '@/api/user'
import {
  resetRouter
} from '@/router'

const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {

  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        UserName: username.trim(),
        Password: password
      }).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user register
  register({ commit }, userInfo) {
    const { username, password, confirm, email, company, verifyCode } = userInfo
    return new Promise((resolve, reject) => {
      register({
        UserName: username.trim(),
        Password: password,
        ConfirmPassword: confirm,
        Email: email,
        Company: company,
        VerifyCode: verifyCode
      }).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {
          roles,
          name,
          avatar,
          introduction
        } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_ROLES', [])
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
