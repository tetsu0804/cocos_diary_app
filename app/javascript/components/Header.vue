<template v-on:resize="headerResize">
  <div  class="sticky-top">
    <b-row v-if="(this.$store.state.signIn === true) && (this.header_width_truthy === true)">
      <b-col offset="1" sm="10" style="background-color: #17a2b8"  key="header-desplay">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar>
            <router-link class="nav-item" :to="{ name: 'Home' }">
              <b-icon font-scale="2" icon="house-door" aria-hidden="true"></b-icon>
            </router-link>
            <router-link id="header_user_name" :to="{ name: 'UserShow', params: { id: `${this.$store.state.id}`}}" class="nav-item">
              {{ first_name }}
            </router-link>
          </b-navbar>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item  id="header_logout" class="nav-item2" v-on:click="logOut">ログアウト</b-nav-item>
              <router-link id="header-blog-make" class="nav-item" :to="{ name: 'BlogNew', params: { id: `${this.id}`}}"> ブログ作成</router-link>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>

    <b-row v-else-if="(this.$store.state.signIn === true) && (this.header_width_truthy === false)">
      <b-col style="background-color: #17a2b8"  key="header-desplay">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar>
            <router-link class="nav-item" :to="{ name: 'Home' }">
              <b-icon font-scale="2" icon="house-door" aria-hidden="true"></b-icon>
            </router-link>
            <router-link id="header_user_name" :to="{ name: 'UserShow', params: { id: `${this.$store.state.id}`}}" class="nav-item">
              {{ first_name }} さん
            </router-link>
          </b-navbar>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item  id="header_logout" class="nav-item2" v-on:click="logOut">ログアウト</b-nav-item>
              <router-link id="header-blog-make" class="nav-item" :to="{ name: 'BlogNew', params: { id: `${this.id}`}}"> ブログ作成</router-link>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    data() {
      return {
        header_width: window.innerWidth,
        header_width_truthy: ''
      }
    },
    computed: mapState({
      id: state => state.id,
      first_name: state => state.first_name
    }),
    mounted() {

      if(this.header_width > 991) {
        this.header_width_truthy = true
      } else {
        this.header_width_truthy = false
      }

      window.addEventListener('resize', this.headerResize)
    },
    methods: {
      logOut() {
        this.$http.plan.delete('/api/v1/logout')
        .then(response => {

          document.cookie = "cookie=; max-age=0"
          document.cookie = "signedIn=; max-age=0"
          localStorage.removeItem("coco_diary_app")
          this.$store.dispatch('doFetchStateId', "")
          this.$store.dispatch('doFetchStateFirstName', "")
          this.$store.dispatch('doFetchStateLastName', "")
          this.$store.dispatch('doFetchStateEmail', "")
          this.$store.dispatch('doFetchStateSignIn', "")

          this.$router.push({name: "Login"})
        })
      },
      headerResize() {
        this.header_width = window.innerWidth
        this.header_width_truthy = ''
        if(this.header_width > 991) {
          this.header_width_truthy = true
        } else {
          this.header_width_truthy = false
        }
      }
    }
  }
</script>

<style scoped>
  .nav {
    height: 60px;

  }
  .nav-item {
    color: rgb(255, 255, 255);
    line-height: 60px;
    margin: 0 10px;
  }
  .nav-item2 {
    font-color: rgb(255, 255, 255);
    height: 60px;
    line-height: 45px;
  }
</style>
