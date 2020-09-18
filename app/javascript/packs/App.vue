<template>
  <div id="app">
    <b-container fluid>
      <Header></Header>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue"

export default {
  data: function () {
    return {
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
