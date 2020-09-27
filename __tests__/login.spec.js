import { mount } from '@vue/test-utils';
import login from '@/Login'

describe('Testing App component', () => {
    it('is a Vue instance', () => {
      const wrapper = mount(login)
      expect(wrapper.isVueInstance).toBeTruthy()
    })
  })
