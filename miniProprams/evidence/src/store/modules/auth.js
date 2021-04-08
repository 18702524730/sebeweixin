const state = {
  authInfo: {},
  OrderDetailsData:{}
}

const mutations = {
  INITINFO: (state, obj) => {
    console.log('mutatios', obj)
    state.authInfo = obj.info;
  },
  
  ORDERINFO: (state, obj) => {
    console.log('orderinfo', obj)
    state.OrderDetailsData = obj.orderinfo;
  }
}

const actions = {
  initInfo ({commit}, obj) {
    console.log('action', obj)
    commit('INITINFO', obj)
  },
  orderinfo ({commit}, obj) {
    console.log('action', obj)
    commit('ORDERINFO', obj)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
