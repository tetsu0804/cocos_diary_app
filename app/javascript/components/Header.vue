<template>
  <div>
    <b-nav>
      <router-link :to="{ name: 'Home' }">COCO's Diary Application</router-link>
      <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
      <b-nav-item>{{ first_name }}</b-nav-item>
      <b-nav-item v-on:click="logOut">ログアウト</b-nav-item>
      <router-link :to="{ name: 'Login' }">ログイン</router-link>
    </b-nav>
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
