import { shallowMount, createLocalVue} from '@vue/test-utils';
import Signup from '@/Signup';
import BootstrapVue, { BFormInput } from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Signup", () => {
  it("確認", done => {
    const wrapper= shallowMount(Signup, { localVue,
      data() {
        return {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          passsword_confirmation: '',
          error: ''
        }
      }
    });

    wrapper.setData({
      first_name: '哲朗',
      last_name: '吉田',
      email: 'test@test.com',
      password: 'password',
      passsword_confirmation: 'password'
    })

    const button = wrapper.find('#signup-btn')
    button.trigger('submit')
    wrapper.vm.$nextTick( () => {
      expect(wrapper.vm.first_name).toEqual('哲朗')
      expect(wrapper.vm.last_name).toEqual('吉田')
      expect(wrapper.vm.email).toEqual('test@test.com')
      expect(wrapper.vm.password).toEqual('password')
      expect(wrapper.vm.passsword_confirmation).toEqual('password')
      done()
    })


    // wrapper.vm.$nextTick(() => {
    //   expect(wrapper.vm.last_name).toEqual('吉田')
    //   expect(wrapper.vm.first_name).toEqual('哲朗')
    //   expect(wrapper.vm.email).toEqual('test@test.com')
    //   expect(wrapper.vm.password).toEqual('password')
    //   expect(wrapper.vm.password_confirmation).toEqual('password')
    //   done()
    // })
  })
})
