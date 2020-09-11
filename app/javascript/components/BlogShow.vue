<template>
  <div>
    <p> {{ blog.title }}</p>
    <img :src="image" alt="image">
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data: function() {
      return {
        blog: {},
        image: '',
      }
    },
    mounted(){
      axios.get(`/api/v1/users/${this.$route.params.user_id}/blogs/${this.$route.params.id}`)
      .then(response => {
        this.blog = response.data.blog
        this.image = response.data.image
      })
    }
  }
</script>
