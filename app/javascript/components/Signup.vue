<template>
  <div>
    <b-row>
      <b-col offset="1" sm="10">
        <p class="signup-title h5 text-info text-center">ユーザー登録</p>
        <b-row>
          <b-col><router-link :to="{ name: 'Login'}" class="btn btn-info signup-btn">戻る</router-link></b-col>
        </b-row>
        <b-form @submit="onSignupSubmit" class="signup-btn">
          <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
          <b-form-group id="signup-input-group-1" label="性" label-for="signup-input-1">
            <b-form-input
              id="signup-input-1"
              v-model="last_name"
              type="text"
              required
              placeholder="吉田"
              data_last_name
              class="signup-input"
            ></b-form-input>
          </b-form-group>
          <p>{{ last_name }}</p>

          <b-form-group
            id="signup-input-group-2"
            label="名"
            label-for="signup-input-2"
          >
            <b-form-input
              id="signup-input-2"
              v-model="first_name"
              type="text"
              required
              placeholder="太郎"
              class="signup-input"
            ></b-form-input>
          </b-form-group>
          <p>{{ first_name }}</p>

          <b-form-group id="signup-input-group-3" label="メールアドレス" label-for="signup-input-3">
            <b-form-input
              id="signup-input-3"
              v-model="email"
              type="email"
              required
              placeholder="example@example.com"
              class="signup-input"
              ></b-form-input>
          </b-form-group>
          <p>{{ email }}</p>

          <b-form-group id="signup-input-group-4" label="パスワード" label-for="signup-input-4">
            <b-form-input
              id="signup-input-4"
              v-model="password"
              type="password"
              required
              class="signup-input"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="signup-input-group-5" label="パスワード確認" label-for="signup-input-5">
            <b-form-input
              id="signup-input-5"
              v-model="passsword_confirmation"
              type="password"
              required
              class="signup-input"
            ></b-form-input>
          </b-form-group>

          <b-button id="signup-btn" type="submit" variant="info">登録</b-button>
          <router-link :to="{name: 'Login'}" class="btn btn-info">ログイン</router-link>
        </b-form>
      </b-col>
    </b-row>
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

<style scoped>
  .signup-title {
    margin: 20px auto;
  }
  .signup-btn {
    margin-top: 15px;
  }
</style>
