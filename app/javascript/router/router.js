import Vue from "vue"
import Router from "vue-router"
import Home from "../components/Home.vue"
import Signup from "../components/Signup.vue"
import Login from "../components/Login.vue"
import UserShow from "../components/UserShow.vue"
import UserEdit from "../components/UserEdit.vue"
import BlogNew from "../components/BlogNew.vue"
import BlogShow from "../components/BlogShow.vue"
import BlogEdit from "../components/BlogEdit.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", component: Home, name: "Home"},
    { path: "/signup", component: Signup, name: "Signup"},
    { path: "/login", component: Login, name: "Login"},
    { path: "/users/:id", component: UserShow, name: "UserShow"},
    { path: "/users/:id", component: UserEdit, name: "UserEdit"},
    { path: "/users/:id/blog_new", component: BlogNew, name: "BlogNew"},
    { path: "/users/:user_id/blogs/:id", component: BlogShow, name: "BlogShow"},
    { path: "/users/:user_id/blogs/:id/edit", component: BlogEdit, name: "BlogEdit"}
  ]
})
