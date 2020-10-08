<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <b-overlay  rounded="sm" class="user-show" >
          <b-card title="プロフィール" text-variant="info" border-variant="info" bg-variant="white">
            <b-card-text class="user-show-data">{{ last_name }} {{ first_name }} さん</b-card-text>
            <b-card-text class="user-show-data">メールアドレス: {{ email}}</b-card-text>
            <router-link :to="{ name: 'UserEdit', params: {id: id, first_name: first_name, last_name: last_name, email: email }}" class="btn btn-info user-show-edit">編集</router-link>
            <b-button variant="danger" v-on:click="userDelete">削除</b-button>
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    computed: mapState({
      id: state => state.id,
      first_name: state => state.first_name,
      last_name: state => state.last_name,
      email: state => state.email
    }),
    mounted() {
    },
    methods: {
      userDelete() {
        this.$http.plan.delete(`/api/v1/signout/${this.id}`)
        .then(response => {
          document.cookie = "cookie=; max-age=0"
          document.cookie = "signedIn=; max-age=0"
          this.$store.dispatch('doFetchStateId', "")
          this.$store.dispatch('doFetchStateFirstName', "")
          this.$store.dispatch('doFetchStateLastName', "")
          this.$store.dispatch('doFetchStateEmail', "")
          this.$store.dispatch('doFetchStateSignIn', "")
          this.$router.push({name: "Login"})
        })
      }
    }
  }
</script>

<style scoped>
  .user-show {
    margin: 20px;
  }
</style>
