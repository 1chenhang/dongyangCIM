import { createStore } from 'vuex'

export default createStore({
  state: {
    view: null,
    cameraData: [],
    treeData: [],
    landData: [],
    warnTypeList: [],
    isshowloading: false
  },
  getters: {
  },
  mutations: {
    view: (state, data) => {
      state.view = data
    },
    cameraData: (state, data) => {
      state.cameraData = data
    },
    landData: (state, data) => {
      state.landData = data
    },
    treeData: (state, data) => {
      state.treeData = data
    },
    warnTypeList: (state, data) => {
      state.warnTypeList = data
    },
    isshowloading: (state, data) => {
      state.isshowloading = data
    },
    logout (state) {
      window.sessionStorage.clear()
    }
  },
  actions: {
  },
  modules: {
  }
})
