import { shallowMount, createLocalVue} from '@vue/test-utils';
import Signup from '@/Signup';
import BootstrapVue, { BFormInput } from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Signup", () => {
  it("確認", () => {
    const wrapper= shallowMount(Signup, { localVue,
      data() {
        return {
          first_name: '絵理子',
          last_name: '早坂',
          email: 'test@test.com',
          password: 'password',
          passsword_confirmation: 'password',
          error: ''
        }
      }
    });
    console.log(wrapper.html())
    wrapper.setData({last_name: '吉田'})
    wrapper.vm.$nextTick(() => {
      console.log(wrapper.html())
    })

    // wrapper.vm.$data = signUpData
    // console.log(wrapper.vm.$data.first_name)
    //expect(wrapper.props().first_name).toBe('絵理子')
    // const input = wrapper.find('#input-1')
    // input.['data_last_name'] = 'hayasaka'
    // console.log(input.html())
    // console.log(wrapper.props().first_name)
    // console.log(wrapper.findComponent({ name: 'BFormInput' }))
  //  expect(wrapper.findComponent({ name: 'BFormInput' }).exists()).toBe(true);
    //console.log(wrapper.findComponent({ name: 'BFormInput'}).setData('first_name'))
    //console.log(wrapper.findComponent({ name: 'BFormInput' }).props())
    //wrapper.findComponent('#input-1').setValue('吉田')
    //expect(wrapper.findComponent('#input-1')).toBe('吉田')


    // console.log(wrapper.findComponent({ name: 'BFormInput' }).html())
    // console.log(wrapper.findComponent({name: 'BFormInput'}).element.value = "早坂")
    // console.log(wrapper.findComponent({ name: 'BFormInput' }).html())
  })
})
