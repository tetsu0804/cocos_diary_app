<template>
  <div>
    <b-nav>
      <router-link :to="{ name: 'Home' }">COCO's Diary Application</router-link>
      <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
      <b-nav-item>{{ first_name }}</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
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
    
    }
  }
</script>
