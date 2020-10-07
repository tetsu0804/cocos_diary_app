import { mount } from '@vue/test-utils';
import Home from "@/Home"
import axios from 'axios'

jest.mock('axios')

describe('Testing App component', () => {
  let data_blogs
  let axios_response
  let prossingBlogs = {}
  let thisPageNum = 1
  let blogs = []
  data_blogs = [
    {title: '1テスト', content: '1コンテント'},
    {title: '2テスト', content: '2コンテント'},
    {title: '3テスト', content: '3コンテント'},
    {title: '4テスト', content: '4コンテント'},
    {title: '5テスト', content: '5コンテント'},
    {title: '6テスト', content: '6コンテント'},
    {title: '7テスト', content: '7コンテント'},
    {title: '8テスト', content: '8コンテント'},
    {title: '9テスト', content: '9コンテント'},
    {title: '10テスト', content: '10コンテント'},
    {title: '11テスト', content: '11コンテント'},
  ]

  beforeEach( async() => {
   axios_response =   axios.get.mockImplementation((url) => {
     return Promise.resolve(data_blogs)
   })
   blogs = await axios_response()
   let currentNumber = thisPageNum * 9
   prossingBlogs = blogs.slice(currentNumber -9, currentNumber)
  })

  it('is a Vue instance', () => {
    const wrapper = mount(Home, {
      data() {
        return {
          prossingBlogs: prossingBlogs,
          blogs: blogs,
          thisPageNum: 1
        }
      }
    })
  
    expect(wrapper.vm.prossingBlogs[0].title).toEqual('1テスト')
    expect(wrapper.vm.prossingBlogs[8].title).toEqual('9テスト')
    expect(wrapper.vm.prossingBlogs.length).toBe(9)
    expect(wrapper.vm.blogs[0].title).toEqual('1テスト')
    expect(wrapper.vm.blogs[10].title).toEqual('11テスト')
    expect(wrapper.vm.blogs.length).toBe(11)

    wrapper.vm.clickCallback(2)
    expect(wrapper.vm.prossingBlogs.length).toBe(2)
    expect(wrapper.vm.prossingBlogs[0].title).toEqual('10テスト')
    expect(wrapper.vm.prossingBlogs[1].title).toEqual('11テスト')
  })
})
