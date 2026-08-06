import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    userInfo: storage.get(constant.userInfo),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
	language: storage.get(constant.language),
	loginPopup: storage.get(constant.loginPopup) || false,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
	SET_USER_INFO: (state,info) => {
		state.userInfo = info
		storage.set(constant.userInfo, info)
	},
	
	SET_LANGUAGE: (state,info) => {
		state.language = info
		storage.set(constant.language, info)
	},
	
	SET_LOGIN_POPUP: (state, status)=> {
		state.loginPopup = status
		storage.set(constant.loginPopup, status)
	}
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
		 const {token} = res.data.userinfo
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
		  commit('SET_USER_INFO', res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
		    commit('SET_TOKEN', '')
		    commit('SET_ROLES', [])
		    commit('SET_PERMISSIONS', [])
		    commit('SET_USER_INFO', {})
			commit('SET_LOGIN_POPUP', false)
		    removeToken()
		    storage.clean()
		    resolve()
      
      })
    },
	
	// 设置语言
	Language({commit}, info){
		return new Promise((res, rej) => {
			commit('SET_LANGUAGE', info)
			res()
		})
	},
	
	// 配置登录弹窗
	LoginPopup({commit}, status){
		return new Promise((res, rej) => {
			commit('SET_LOGIN_POPUP', status)
			res()
		})
	}
  }
}

export default user
