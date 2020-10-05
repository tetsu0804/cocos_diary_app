import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import Vuex from 'vuex'
import Router from 'vue-router'
import BlogShow from '@/BlogShow'

jest.mock('axios')
const localVue = createLocalVue()
localVue.use(Vuex, Router)

describe('BlogShow', () => {
  let blog_show_response
  let axios_blog_show_response
  let axios_get_response
  let $route
  let store

  blog_show_response = {
    user: {
      id: 1,
      last_name: '早坂',
      first_name: '絵理子'
    },
    blog: {
      id: 1,
      title: 'BlogShowのtitle',
      content: 'BlogShowのcontent',
      user_id: 1,
      created_at: new Date(2020, 10, 4)
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '早坂',
        first_name: '絵理子',
        blogs: [
          {
            id: 1,
            title: 'BlogShowのtitle',
            content: 'BlogShowのcontent',
            user_id: 1,
            created_at: new Date(2020, 10, 4)
          }
        ]
      }
    })

    axios_blog_show_response = axios.get.mockResolvedValue(blog_show_response)
    $route = {
      params: {
        user_id: blog_show_response.id,
        id: blog_show_response.blog.id
      }
    }
  })

  it('成功', async() => {
    const blog_show_wrapper = mount(BlogShow, { axios_blog_show_response, store, localVue,
      data() {
        return {
          user: {
            id: 1,
            last_name: '早坂',
            first_name: '絵理子'
          },
          blog: {
            id: 1,
            title: 'BlogShowのtitle',
            content: 'BlogShowのcontent',
            user_id: 1,
            created_at: new Date(2020,10, 4)
          },
          image: ''
        }
      },
      mocks: {
        $route
      }
    })
    axios_get_response = await axios_blog_show_response()
    blog_show_wrapper.setData({
      user: axios_get_response.user,
      blog: axios_get_response.blog
    })

    let class_blog_show_border = blog_show_wrapper.findAll('.blog-show-border')
    expect(class_blog_show_border.at(0).text()).toEqual(`作成者: ${blog_show_wrapper.vm.user.last_name} ${blog_show_wrapper.vm.user.first_name}さん`)

    let class_blog_show_title_border = blog_show_wrapper.find('.blog-show-title-border')
    let class_blog_show_content_border = blog_show_wrapper.find('.blog-show-content-border')
    expect(class_blog_show_title_border.text()).toEqual(`タイトル: ${blog_show_wrapper.vm.blog.title}`)
    expect(class_blog_show_content_border.text()).toEqual(blog_show_wrapper.vm.blog.content)
  })
})
