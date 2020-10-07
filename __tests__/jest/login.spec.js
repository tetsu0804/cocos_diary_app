import { mount } from '@vue/test-utils';
import login from '@/Login'

describe('login', () => {
  it('login成功', done => {
    const login_wrapper = mount(login, {
      data() {
        return {
          email: '',
          password: ''
        }
      }
    })
    login_wrapper.setData({ email: 'test@test.com', password: 'password' })

    const login_button = login_wrapper.find('.login-login-btn')
    login_button.trigger('submit')
    login_wrapper.vm.$nextTick( () => {
      expect(login_wrapper.vm.email).toEqual('test@test.com')
      expect(login_wrapper.vm.password).toEqual('password')
      done()
    })
  })
})
