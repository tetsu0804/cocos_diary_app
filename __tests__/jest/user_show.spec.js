import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UserShow from '@/UserShow'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserShow', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        id: 1,
        first_name: '絵理子',
        last_name: '早坂',
        email: 'test@test.com'
      }
    })
  })

  it('UserShow成功', () => {
    const user_show_wrapper = mount(UserShow, {store, localVue,
      computed: {
        id: () => 1,
        first_name: () => '絵理子',
        last_name: () => '早坂',
        email: () => 'test@test.com'
      }
    })
    let user_show_data = user_show_wrapper.findAll('.user-show-data')
    expect(user_show_data.at(0).text()).toEqual('早坂 絵理子 さん')
    expect(user_show_data.at(1).text()).toEqual('メールアドレス: test@test.com')
  })
})
