import Vue from "vue"
import Router from "vue-router"
import Home from "../components/Home.vue"
import Signup from "../components/Signup.vue"
import Login from "../components/Login.vue"
import UserShow from "../components/UserShow.vue"
import UserEdit from "../components/UserEdit.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", component: Home, name: "Home"},
    { path: "/signup", component: Signup, name: "Signup"},
    { path: "/login", component: Login, name: "Login"},
    { path: "/users/:id", component: UserShow, name: "UserShow"},
    { path: "/users/:id", component: UserEdit, name: "UserEdit"},
  ]
})
