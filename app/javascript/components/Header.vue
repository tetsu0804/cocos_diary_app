<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-nav>
        <router-link class="nav-item" :to="{ name: 'Home' }"><b-icon font-scale="2" icon="house-door" aria-hidden="true"></b-icon></router-link>
        <router-link class="nav-item" :to="{ name: 'Signup' }">ユーザー登録</router-link>
        <router-link  :to="{ name: 'UserShow', params: { id: `${this.$store.state.id}`}}" class="nav-item"> {{ first_name }}</router-link>
        <b-nav-item  class="nav-item2" v-on:click="logOut">ログアウト</b-nav-item>
        <router-link class="nav-item" :to="{ name: 'Login' }">ログイン</router-link>
        <router-link class="nav-item" :to="{ name: 'BlogNew', params: { id: `${this.$route.params.id}`}}"> ブログ作成</router-link>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    computed: mapState({
      first_name: state => state.first_name
    }),
    mounted() {
    },
    methods: {
      logOut() {
        this.$http.plan.delete('/api/v1/logout')
        .then(response => {

          document.cookie = "cookie=; max-age=0"
          document.cookie = "signedIn=; max-age=0"
          localStorage.removeItem("coco_diary_app")
          this.$store.dispatch('fetchStateId', "")
          this.$store.dispatch('fetchStateFirstName', "")
          this.$store.dispatch('fetchStateLastName', "")
          this.$store.dispatch('fetchStateEmail', "")
          this.$store.dispatch('fetchStateSignIn', "")

          this.$router.push('/')
        })
      }
    }
  }
</script>

<style scoped>
  .nav {
    height: 60px;
    background-color: rgb(250, 126, 204);
  }
  .nav-item {
    color: rgb(255, 255, 255);
    line-height: 60px;
    margin-left: 5px;
  }
  .nav-item2 {
    font-color: rgb(255, 255, 255);
    height: 60px;
    line-height: 45px;
  }
</style>
