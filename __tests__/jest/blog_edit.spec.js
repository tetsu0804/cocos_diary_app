import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BlogEdit from '@/BlogEdit'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex, VueRouter)

describe('ブログ編集', () => {
  let get_response
  let $route
  let store
  let axios_get_response
  let actions

  get_response = {
    user:{
      id: 1,
      last_name: '吉田',
      first_name: '哲朗',
    },
    blog: {
      id: 1,
      title: '編集をするためのテスト',
      content: '編集成功を願ってのテストである'
    }
   }

  beforeEach(() => {
   actions = {
     doFetchStateEditBlogs: jest.fn((id, title, content) => {
       store.state.blogs[0].id = id
       store.state.blogs[0].title = title
       store.state.blogs[0].content = content
     })
   }

   store = new Vuex.Store({
     state: {
       id: 1,
       blogs: [
         {
           id: '',
           title: '',
           content: '',
         }
       ]
     },
     actions
   });

   axios_get_response = axios.get.mockResolvedValue(get_response)
    $route = {
      path: `/api/v1/users/${store.state.id}/blogs/${get_response.blog.id}`
    }
  })

  it('編集成功dataからstateへ', async() => {
    const blog_edit_wrapper = mount(BlogEdit, { axios_get_response , store, localVue,
      data() {
        return {
          user: {},
          blog: {}
        }
      },
      mocks: {
        $route
      }
    })
    // beforeEachで作成したaxios.get (editする元のデータベースから取得したUserデータとBlogデータ)
    let axios_value = await axios_get_response()
    // BlogEditのVueインスタンスのblog_edit_wrapper.vmに axios.getしたデータをセットアップしている
    blog_edit_wrapper.setData({
      user: axios_value.user,
      blog: axios_value.blog
    })
    // axios.getしたデータがblog_edit_wrapper.vmに入っているか確認
    expect(blog_edit_wrapper.vm.user.first_name).toEqual('哲朗')
    expect(blog_edit_wrapper.vm.blog.title).toEqual('編集をするためのテスト')
    // blog_edit_wrapper.vmのデータを編集したデータをセットアップ
    blog_edit_wrapper.setData({
      blog: {id: 1, title: '編集後のタイトルだよ', content: '編集後のコンテンツだよ'}
    })
    // 編集したデータ入っているか確認している
    expect(blog_edit_wrapper.vm.blog.title).toEqual('編集後のタイトルだよ')
    // buttonを取得してイベントsubmitを実行している
    blog_edit_wrapper.find('.blog-edit-finish-btn').trigger('submit')
    //axios.patchしてレスポンスデータを格納する変数
    let axios_patch_response
    // レスポンスデータを格納した変数に対して await (非同期している)データを格納する変数
    let axios_patch_edit_blog
    // axios.patchしてレスポンスデータを格納している
    axios_patch_response = axios.patch.mockResolvedValue(blog_edit_wrapper.vm.blog)
    // レスポンスデータを非同期通信してデータを変数に格納している
    axios_patch_edit_blog = await axios_patch_response()
    // Vuex.Storeに設定したactionsのdoFetchStateEditBlogsを実行している
    actions.doFetchStateEditBlogs(axios_patch_edit_blog.id, axios_patch_edit_blog.title, axios_patch_edit_blog.content)
    // Vuex.Storeで設定したdoFetchStateEditBlogsがきちんと動作しているか確認している
    expect(store.state.blogs[0].id).toEqual(1)
    expect(store.state.blogs[0].title).toEqual('編集後のタイトルだよ')
    expect(store.state.blogs[0].content).toEqual('編集後のコンテンツだよ')
  })
})
