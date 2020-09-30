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
    // fetchStateBlogs(state, {id, title, content, created_at} ) {
    //   let fakeBlog = {id: id, title: title, content: content, created_at: created_at}
    //     state.blogs.push(fakeBlog)
    // },
    fetchStateBlogId(state, id) {
      let new_blog_id = { id: id }
      state.blogs.push(new_blog_id)
    },
    fetchStateBlogTitle(state, title) {
      let new_blog_title = state.blogs[state.blogs.length -1 ]
      new_blog_title.title = title
    },
    fetchStateBlogContent(state, content) {
      let new_blog_content = state.blogs[state.blogs.length - 1]
      new_blog_content.content = content
    },
    fetchStateBlogCreatedAt(state, created_at) {
      let new_blog_created_at = state.blogs[state.blogs.length - 1]
      new_blog_created_at.created_at = created_at
    },
    fetchStateEditBlogs(state, {id,title, content }) {
      let virtual_blog = { id: id, title: title, content: content }
      let real_blogs = state.blogs

      for(let key in real_blogs){
        //console.log(real_blogs[key])
        if (real_blogs[key] == null ) {

        } else if (real_blogs[key].id === id){
          real_blogs[key].id = id
          real_blogs[key].title = title
          real_blogs[key].content = content
        }
      }
    },
    deleteStateBlogs(state) {
      let deleteBlogarrays = state.blogs
      for (let i = 0; i < deleteBlogarrays.length; i++) {
        delete deleteBlogarrays[i].id
        delete deleteBlogarrays[i].title
        delete deleteBlogarrays[i].content
        delete deleteBlogarrays[i].created_at
      }
    },
   deleteStateBlogId(state, {id, title, content, created_at}) {
     let delete_blog_index = state.blogs.findIndex( (result) => {
       return result.id === id
     })
     delete state.blogs[delete_blog_index].id
     delete state.blogs[delete_blog_index].title
     delete state.blogs[delete_blog_index].content
     delete state.blogs[delete_blog_index].created_at
   },
   deleteBlogsIndex(state, index) {
      let delete_blog_index = state.blogs[index]
      delete delete_blog_index.id
      delete delete_blog_index.title
      delete delete_blog_index.content
      delete delete_blog_index.created_at

   },
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
    // doFetchStateBlogs( { commit }, { id, title, content, created_at}) {
    //   commit('fetchStateBlogs', { id: id, title: title, content: content, created_at: created_at } )
    // },
    doFeatchStateBlogId( { commit }, id) {
      commit('fetchStateBlogId', id)
    },
    doFeatchStateBlogTitle( { commit }, title) {
      commit('fetchStateBlogTitle', title)
    },
    doFeatchStateBlogContent( { commit }, content) {
      commit('fetchStateBlogContent', content)
    },
    doFeatchStateBlogCreatedAt( { commit }, created_at) {
      commit('fetchStateBlogCreatedAt', created_at)
    },
    doFetchStateEditBlogs( { commit }, { id, title, content }) {
      commit('fetchStateEditBlogs', {id: id, title: title, content: content })
    },
    doDeleteStateBlogs({ commit }) {
      commit('deleteStateBlogs')
    },
    doDeleteStateBlogId( { commit}, {id, title, content, created_at}) {
      commit('deleteStateBlogId', {id: id, title: title, content: content, created_at: created_at})
    },
    doDeleteStateBlogIndex( { commit }, index) {
      commit('deleteBlogsIndex', index)
    },
  },
  plugins: [
    createPersistedState(
      { key: "coco_diary_app" }
    )
  ]
})
