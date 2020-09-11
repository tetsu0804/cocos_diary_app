<template>
  <div>
    <p>Home.vue</p>
    <ul>
      <router-link v-for="blog in blogs" :key="blog.id" :to="{name: 'BlogShow', params:{ user_id: blog.user_id , id: blog.id }}">{{ blog.title }}</router-link>
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
