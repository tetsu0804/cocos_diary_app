<template>
  <div>
    <p>Home.vue</p>
  </div>
</template>

<script>
  export default {
    mounted() {
    document.cookie = "cookie=; max-age=0"
     document.cookie = "signedIn=; max-age=0"
     this.$store.dispatch('doFetchStateId', '')
     this.$store.dispatch('doFetchStateFirstName', '')
     this.$store.dispatch('doFetchStateLastName', '')
     this.$store.dispatch('doFetchStateEmail', '')
     this.$store.dispatch('doFetchStateSignIn', '')
      debugger
    }
  }
</script>
