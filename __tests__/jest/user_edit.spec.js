import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import VueRouter from 'vue-router'
import UserEdit from '@/UserEdit'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex, VueRouter)

describe('UserEdit', () => {
  let store
  let $route
  let actions
  beforeEach(() => {
    actions = {
      doFetchStateId: jest.fn(id => { store.state.id = id }),
      doFetchStateFirstName: jest.fn(first_name => { store.state.first_name = first_name }),
      doFetchStateLastName: jest.fn(last_name => { store.state.last_name = last_name }),
      doFetchStateEmail: jest.fn(email => { store.state.email = email })
    }

    store = new Vuex.Store({
      state: {
        id: 1,
        first_name: '絵理子',
        last_name: '早坂',
        email: 'test@test.com'
      },
      actions
    })

    $route = {
      params: {
        id: 1,
        first_name: '絵理子',
        last_name: '早坂',
        email: 'test@test.com'
      }
    }
  })

  it('成功', () => {
    const user_edit_wrapper = mount(UserEdit, { store, localVue,
      mocks: {
        $route
      },
      data() {
        return {
          id: $route.params.id,
          first_name: $route.params.first_name,
          last_name: $route.params.last_name,
          email: $route.params.email
        }
      }
    })
    // 変更するstate.storeの初期の値の確認
    expect(store.state.last_name).toEqual('早坂')

    user_edit_wrapper.setData({
      id: $route.params.id,
      first_name: $route.params.first_name,
      last_name: '吉田',
      email: $route.params.email
    })

    expect(user_edit_wrapper.vm.last_name).not.toEqual('早坂')
    expect(user_edit_wrapper.vm.last_name).toEqual('吉田')

    user_edit_wrapper.find('.user-edit-btn').trigger('submit')
    actions.doFetchStateId(user_edit_wrapper.vm.id)
    actions.doFetchStateFirstName(user_edit_wrapper.vm.first_name)
    actions.doFetchStateLastName(user_edit_wrapper.vm.last_name)
    actions.doFetchStateEmail(user_edit_wrapper.vm.email)
    // 変更後のstate.storeの値の確認
    expect(store.state.last_name).toEqual('吉田')
  })
})
