<template>
  <div>
    <p>Home.vue</p>
    <router-link v-for="blog in blogs" :to="{name: 'BlogShow', params: {user_id: blog.user_id, id: blog.id}}" :key="blog.id">{{blog.title}}</router-link>
  </div>
</template>

<script>
import axios from "axios"
  export default {
    data: function() {
      return {
        blogs: {},
        images: {}
      }
    },
    mounted() {
      this.allBlogs()
    },
    computed: {
      allBlogs() {
        axios.get('/api/v1/blogs')
        .then(response => {
          this.blogs = response.data.blogs
        })
      }
    }
  }
</script>
