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
    signIn: "",
    blogs: [
      {
        id: '',
       title: '',
       content: '',
       created_at: ''
     }
    ]
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
    },
    fetchStateBlogs(state, {id, title, content, created_at} ) {
      let fakeBlog = {id: id, title: title, content: content, created_at: created_at}
        state.blogs.push(fakeBlog)
    },
    fetchStateEditBlogs(state, {id, title, content }) {
      state.blogs[id].title = title
      state.blogs[id].content = content
    },
    deleteStateBlogs(state) {
      let deleteBlogarrays = state.blogs
      for (let i = 0; i < deleteBlogarrays.length; i++) {
          delete deleteBlogarrays[i].id
          delete deleteBlogarrays[i].title
          delete deleteBlogarrays[i].content
          delete deleteBlogarrays[i]
      }
    },
   deleteStateBlogId(state, {id, title, content, created_at}) {
     delete state.blogs[id].id
     delete state.blogs[id].title
     delete state.blogs[id].content
     delete state.blogs[id].created_at
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
    },
    doFetchStateBlogs( { commit }, { id, title, content, created_at}) {
      commit('fetchStateBlogs', { id: id, title: title, content: content, created_at: created_at } )
    },
    doFetchStateEditBlogs( { commit }, { id, title, content }) {
      commit('fetchStateEditBlogs', { id: id, title: title, content: content })
    },
    doDeleteStateBlogs({ commit }) {
      commit('deleteStateBlogs')
    },
    doDeleteStateBlogId( { commit}, {id, title, content, created_at}) {
      commit('deleteStateBlogId', {id: id, title: title, content: content, created_at: created_at})
    }
  },
  plugins: [
    createPersistedState(
      { key: "coco_diary_app" }
    )
  ]
})
