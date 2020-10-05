import { mount } from '@vue/test-utils';
import Home from "@/Home"

describe('Testing App component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Home, {
      data() {
        return {
          prossingBlogs: {},
          blogs: [],
          thisPageNum: 1
        }
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy()

    wrapper.setData({
      blogs: [
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
    })

    wrapper.vm.clickCallback(1)
    expect(wrapper.vm.prossingBlogs[0].title).toEqual('1テスト')
    expect(wrapper.vm.prossingBlogs[8].title).toEqual('9テスト')
    wrapper.vm.clickCallback(2)
    expect(wrapper.vm.prossingBlogs[0].title).toEqual('10テスト')
  })
})
