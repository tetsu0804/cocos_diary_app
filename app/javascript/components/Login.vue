<template>
  <div>
    <b-form @submit="onLoginSubmit">
      <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>

      <b-form-group id="input-group-1" label="メールアドレス" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="example@example.com"
          ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="パスワード" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    created() {
      this.checkLoginCookieTrue()
    },
    updated() {
      this.checkLoginCookieTrue()
    },
    methods: {
      onLoginSubmit() {
        this.$http.plan.post('/api/v1/login', { email: this.email, password: this.password })
        .then(response => {
          this.fetchLogin(response)
        }).catch(error => {
          this.loginFailure(error)
        })
      },
      fetchLogin(response) {
        if( !response.data.cookie) {
          this.loginFailure(response)
          return
        }
        document.cookie = `cookie=${response.data.cookie}`
        document.cookie = "signedIn=true"
        this.$store.dispatch('doFetchStateId', response.data.user.id)
        this.$store.dispatch('doFetchStateFirstName', response.data.user.first_name)
        this.$store.dispatch('doFetchStateLastName', response.data.user.last_name)
        this.$store.dispatch('doFetchStateEmail', response.data.user.email)
        this.logInTrue(document.cookie)
        this.$router.push('/')
      },
      logInTrue(data) {
        let cookieLoggedins = data.split(';')
        if (cookieLoggedins.includes("signedIn=true") || cookieLoggedins.includes(" signedIn=true")) {
          this.$store.dispatch('doFetchStateSignIn', true)
        } else {
          this.loginFailure('error')
        }
      },
      loginFailure(error) {
        this.error =  (error.response && error.response.data && error.response.data.config) || "メールアドレス or パスワードが一致しない為ログインできません"
        document.cookie = "cookie=; max-age=0"
        document.cookie = "signedIn=; max-age=0"
      },
      checkLoginCookieTrue() {
        let loginCheckCookies = document.cookie.split(';')
        if (loginCheckCookies.includes("signedIn=true") || loginCheckCookies.includes(" signedIn=true") ) {
          this.$router.push('/')
        }
      }
    }
  }
</script>
