<template>
  <div>
    <p> {{ blog.title }}</p>
    <b-img-lazy :src="blog.blog_image" alt="blog.blog_image" width="600px" heigth="650px" center rounded="true"></b-img-lazy>
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
      })
    }
  }
</script>
