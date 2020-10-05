import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import BlogNew from '@/BlogNew'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ブログ作成', () => {
  let store
  let actions
  beforeEach( () => {
    actions = {
      doFeatchStateBlogTitle: jest.fn(title => {
        store.state.title = title
      }),
      doFeatchStateBlogContent: jest.fn(content => {
        store.state.content = content
      })
    }
    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        title: '',
        content: ''
      },
      actions
    })
  })
  it('データが入っているか？', async() => {
    const blog_new_wrapper = mount(BlogNew, { store, localVue,
      data() {
        return {
          title: '',
          content: ''
        }
      }
     })
    blog_new_wrapper.setData({
      title: '初めての投稿',
      content: '初めての投稿はワクワクする'
    })
    const blog_new_p = blog_new_wrapper.find('p')
    expect(blog_new_p.text()).toMatch(`${store.state.last_name} ${store.state.first_name} さんの新しいここの日記`)

    blog_new_wrapper.find('.blog-new-btn').trigger('submit')
    expect(blog_new_wrapper.vm.title).toEqual('初めての投稿')
    expect(blog_new_wrapper.vm.content).toEqual('初めての投稿はワクワクする')
    await actions.doFeatchStateBlogTitle(blog_new_wrapper.vm.title)
    await actions.doFeatchStateBlogContent(blog_new_wrapper.vm.content)
    expect(store.state.title).toEqual('初めての投稿')
    expect(store.state.content).toEqual('初めての投稿はワクワクする')
  })
})
