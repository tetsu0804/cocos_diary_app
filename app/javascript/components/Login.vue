<template >

  <b-row v-if="this.widthTruthy === true" class="big-login-form">
    <div>
      <b-card
      overlay
      img-src="/img/IMG_0883.JPG"
      img-alt="Card Image"
      >
      <b-card-text id="login-text-title" class="h1 text-white login-title-text">
        COCO's DIARY....login
      </b-card-text>

      <b-card-text class="login-form" >
        <b-col cols="6">
        <b-form @submit="onLoginSubmit">
          <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>

            <b-form-group id="login-input-group-1" label="メールアドレス" label-for="login-input-1" class="text-info">
              <b-form-input
                id="login-input-1"
                v-model="email"
                type="email"
                required
                placeholder="example@example.com"
                class="login-input login-email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="login-input-group-2" label="パスワード" label-for="login-input-2" class="text-info">
              <b-form-input
                id="login-input-2"
                v-model="password"
                type="password"
                required
                class="login-input login-password"
              ></b-form-input>
            </b-form-group>
            <div class="login-btn">
            <b-button type="submit" variant="info" class="login-login-btn">ログイン</b-button>
            <router-link :to="{name: 'Signup'}" class="btn btn-info login-signup-btn">ユーザー登録</router-link>
            </div>
          </b-form>
          </b-col>
        </b-card-text>

      </b-card>
      <p>{{ width }}</p>
    </div>
  </b-row>

  <b-row v-else-if="this.widthTruthy === false">
    <div>
      <b-card
        overlay
        img-src="/img/IMG_0883.JPG"
        img-alt="Card Image"
        class="small-display-top"
      >
        <b-card-text id="login-text-title" class="h2 text-white small-login-title-text">
          COCO's DIARY....login
        </b-card-text>
      </b-card>

      <b-col offset="1" cols="10" class="small-login-form">
      <b-form @submit="onLoginSubmit">
        <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>

          <b-form-group id="login-input-group-1" label="メールアドレス" label-for="login-input-1" class="text-info">
            <b-form-input
              id="login-input-1"
              v-model="email"
              type="email"
              required
              placeholder="example@example.com"
              class="login-input login-email"
              ></b-form-input>
          </b-form-group>

          <b-form-group id="login-input-group-2" label="パスワード" label-for="login-input-2" class="text-info">
            <b-form-input
              id="login-input-2"
              v-model="password"
              type="password"
              required
              class="login-input login-password"
            ></b-form-input>
          </b-form-group>

          <div class="login-btn">
            <b-button type="submit" variant="info" class="login-login-btn">ログイン</b-button>
            <router-link :to="{name: 'Signup'}" class="btn btn-info login-signup-btn">ユーザー登録</router-link>
          </div>

      </b-form>
      </b-col>
      <p>{{ width }}</p>
    </div>
  </b-row>
</template>

<script>

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
        width: window.innerWidth,
        widthTruthy: '',
      }
    },
    mounted() {
      this.width = window.innerWidth
        if(this.width > 576) {
          this.widthTruthy = true
        } else {
          this.widthTruthy = false
        }

      window.addEventListener('resize', this.loginResize)
    console.log(this.height)
    },
    created() {

      this.checkLoginCookieTrue()
    },
    updated() {
      this.checkLoginCookieTrue()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
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
      },
      loginResize() {
        this.width = window.innerWidth

        if(this.width > 576) {

          this.widthTruthy = true
        } else {

          this.widthTruthy = false
        }
      }
    }
  }
</script>

<style scoped>
  .big-login-form {
    margin-top: 8%;
  }
  .login-form {
    margin-top:2%;
  }
  .login-title-text {
    margin-top: 4%;
    margin-left: 2%;
  }
  .login-btn {
    display: flex;
  }
  .login-login-btn {
    margin-right: 15px;
    width: 48%;
  }
  .login-signup-btn {
    width: 48%;
  }
  .small-login-title-text {
    text-align: center;
  }
  .small-login-form {
    margin-top: 15px;
  }
  .small-display-top {
    margin-top: 10%;
  }
</style>
