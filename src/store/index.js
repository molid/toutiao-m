import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 一个对象，用来存储当前登录用户信息
    // user: null
    // user: JSON.parse(window.sessionStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止数据丢失，需要备份到本地
      // window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
