<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <p>{{ message }}</p>
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
p {
  font-size: 2em;
  text-align: center;
}
</style>
