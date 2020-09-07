<template>
  <div>
    <b-overlay  rounded="sm" class="user-show" >
      <b-card title="プロフィール" text-variant="info" border-variant="info" bg-variant="white">
        <b-card-text>{{ last_name }} {{ first_name }} さん</b-card-text>
        <b-card-text>メールアドレス: {{ email}}</b-card-text>
        <b-button variant="secondary">編集</b-button>
        <b-button variant="danger">削除</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    computed: mapState({
      first_name: state => state.first_name,
      last_name: state => state.last_name,
      email: state => state.email
    })
  }
</script>

<style scoped>
  .user-show {
    margin: 20px;
  }
</style>
