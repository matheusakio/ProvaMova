import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opcao1: {
      label: 'País',
      value: 'alpha',
      options: {}
    },
    opcao2: [],
  },
  mutations: {
    CHANGE_OPTION_1(state, payload) {
      state.opcao1 = payload.opcao1;
    },
    CHANGE_OPTION_2(state, payload) {
      state.opcao2 = payload.opcao2;
    },
  },
  // actions: {
  //   changeUser(context, payload) {
  //     context.commit('CHANGE_USER', payload);
  //     context.commit('CHANGE_ID', payload);
  //   },
  // },
});