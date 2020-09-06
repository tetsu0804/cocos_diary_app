import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    signIn: ""
  },
  mutations: {
    fetchStateId(state, id) {
      state.id = id
    },
    fetchStateFirstName(state, first_name) {
      state.first_name = first_name
    },
    fetchStateLastName(state, last_name) {
      state.last_name = last_name
    },
    fetchStateEmail(state, email) {
      state.email = email
    },
    fetchStateSignIn(state, signIn) {
      state.signIn = signIn
    }
  },
  actions: {
    doFetchStateId({ commit }, id) {
      commit('fetchStateId', id)
    },
    doFetchStateFirstName( { commit }, first_name) {
      commit('fetchStateFirstName', first_name)
    },
    doFetchStateLastName( { commit }, last_name) {
      commit('fetchStateLastName', last_name)
    },
    doFetchStateEmail( { commit }, email) {
      commit('fetchStateEmail', email)
    },
    doFetchStateSignIn( { commit }, signIn) {
      commit('fetchStateSignIn', signIn)
    }
  },
  plugins: [createPersistedState()]
})
