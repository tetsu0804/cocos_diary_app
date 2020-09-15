import Vue from 'vue'
import App from './App.vue'
import Router from '../router/router'
import Store from '../store/store'
import { planAxiosInstance } from "../backend/axios/axios"
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Paginate from 'vuejs-paginate'

Vue.use(require('vue-moment'));

Vue.use(VueAxios,
  {plan: planAxiosInstance}
)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('paginate', Paginate)
document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    store: Store,
    router: Router,
    planAxiosInstance,
    render: h => h(App)
  }).$mount("#app")
})
