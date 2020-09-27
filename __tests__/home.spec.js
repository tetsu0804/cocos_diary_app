import { mount } from '@vue/test-utils';
import Home from "@/Home"

describe('Testing App component', () => {
    it('is a Vue instance', () => {
      const wrapper = mount(Home)
      expect(wrapper.isVueInstance).toBeTruthy()
    })
  })
