import Vue from 'vue'

// 应用初始状态
const state = {
  count: 10,
  //图片查询时上传的图片，经过crop
  img:'',
  //重新上传的图片
  anotherImg:'',
  //router的loading
  isLoading: false,
  //勾选的商标
  selectedTMArr: []
}

// 定义所需的 mutations
const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  },
  changeImg(state, payload) {
    state.img = payload.img;
  },
  changeAnotherImg(state, payload) {
    state.anotherImg = payload.anotherImg;
  },
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  updateSelectedTM (state, payload) {
    state.selectedTMArr = payload.selectedTMArr
    console.log(payload.selectedTMArr);
  }
}

const actions = {
  increment ({commit}) {
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  },
  getProvince ({commit}, params = {}) {
    return Vue.http.get('globalUrl.getProvince', params)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
