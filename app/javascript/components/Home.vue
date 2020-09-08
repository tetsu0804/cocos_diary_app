<template>
  <div>
    <p>Home.vue</p>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">{{ blog.title }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"

  export default {
    data: function() {
      return {
        blogs: {}
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
