<template>
  <div>
    <b-form @submit="onSignupSubmit">
      <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
      <b-form-group id="input-group-1" label="性" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="last_name"
          type="text"
          required
          placeholder="吉田"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="名"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="first_name"
          type="text"
          required
          placeholder="太郎"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="メールアドレス" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="email"
          type="email"
          required
          placeholder="example@example.com"
          ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="パスワード" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="パスワード確認" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="passsword_confirmation"
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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passsword_confirmation: '',
        error: ''
      }
    },
    created() {
      this.checkCookieTrue()
    },
    updated() {
      this.checkCookieTrue()
    },
    methods: {
      onSignupSubmit() {
        this.$http.plan.post('/api/v1/signup', { first_name: this.first_name, last_name: this.last_name, email: this.email, password: this.password, passsword_confirmation: this.passsword_confirmation})
        .then(response => {
          this.fetchSignup(response)
        }).catch(error => {
          this.signupFailure(error)
        })
      },
      fetchSignup(response) {
        if( !response.data.cookie) {
          this.signupFailure(response)
          return
        }
        document.cookie = `cookie=${response.data.cookie}`
        document.cookie = "signedIn=true"
        this.$store.dispatch('doFetchStateId', response.data.user.id)
        this.$store.dispatch('doFetchStateFirstName', response.data.user.first_name)
        this.$store.dispatch('doFetchStateLastName', response.data.user.last_name)
        this.$store.dispatch('doFetchStateEmail', response.data.user.email)
        this.signedInTrue(document.cookie)
        this.$router.push('/')
      },
      signedInTrue(data) {
        let cookieSignedIns = data.split(';')
        if (cookieSignedIns.includes("signedIn=true") || cookieSignedIns.includes(" signedIn=true")) {
          this.$store.dispatch('doFetchStateSignIn', true)
        } else {
          this.signupFailure('error')
        }
      },
      signupFailure(error) {
        this.error =  (error.response && error.response.data && error.response.data.config) || "ユーザー登録失敗しましたの再度お願いします"
        document.cookie = "cookie=; max-age=0"
        document.cookie = "signedIn=; max-age=0"
      },
      checkCookieTrue() {
        let checkCookies = document.cookie.split(';')
        if (checkCookies.includes("signedIn=true") || checkCookies.includes(" signedIn=true") ) {
          this.$router.push('/')
        }
      }
    }
  }
</script>
