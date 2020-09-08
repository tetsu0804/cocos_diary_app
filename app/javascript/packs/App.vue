<template>
  <div id="app">
    <b-container class="container-fluid">
      <Header></Header>
      <router-view></router-view>
      <p>{{ message }}</p>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue"

export default {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  },
  components: {
    Header: Header
  }
}
</script>

<style scoped>
@import '../bootstrap/scss/_variables.scss'
p {
  font-size: 2em;
  text-align: center;
}
</style>
