import {
  createStore
} from 'vuex'
import tabs from './module/tabs.js'
import user from './module/user.js'


export default createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    tabs,
    user
  }
})