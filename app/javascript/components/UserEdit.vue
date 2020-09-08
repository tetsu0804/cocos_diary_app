<template>
  <div>
    <p class="user-edit-title h5 text-info text-center">編集画面</p>
    <b-form @submit="onUserEditSubmit">
      <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
      <b-form-group id="input-group-1" label="性" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="last_name"
          type="text"
          required
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
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="メールアドレス" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="email"
          type="email"
          required
          ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="info">登録</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios"

  export default {
    data() {
      return {
        id: this.$route.params.id,
        first_name: this.$route.params.first_name,
        last_name: this.$route.params.last_name,
        email: this.$route.params.email,
        error: ''
      }
    },
    methods: {
      onUserEditSubmit() {
        axios.patch(`/api/v1/users/${this.$route.params.id}`, { id: this.id, first_name: this.first_name, last_name: this.last_name, email: this.email})
        .then(response => {
          this.fetchUserEdit(response)
        }).catch(error => {
          this.userEditFailure(error)
        })
      },
      fetchUserEdit(response) {
        this.$store.dispatch('doFetchStateId', response.data.user.id)
        this.$store.dispatch('doFetchStateFirstName', response.data.user.first_name)
        this.$store.dispatch('doFetchStateLastName', response.data.user.last_name)
        this.$store.dispatch('doFetchStateEmail', response.data.user.email)
        this.$router.push(`/users/${response.data.user.id}`)
      },
      userEditFailure(error) {
        this.error = "ユーザー編集失敗しました"
      }
    }
  }
</script>

<style scoped>
  .user-edit-title {
    margin: 20px auto;
  }
</style>
