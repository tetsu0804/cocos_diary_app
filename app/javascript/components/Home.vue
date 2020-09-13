<template>



  <div>
    <p>Home.vue</p>
    <p>{{ pageNumber }} </p>
    <div class="overflow-auto">
      <div v-for="(i, index) in blogs.slice((pageNumber -1) * 3, pageNumber * 3 )">
      <b-card-group deck  :key="i" class="homeCardStyle">
        <div sm="4" class="homeCard" v-for="blog in blogs.slice( index * 3, (index + 1) * 3 )">
          <b-card
            :img-src="blog.blog_image"
            :img-alt="blog.blog_image"
            img-top
            img-height="300px"
            img-width="200px"
            tag="article"
            style="width: 20rem;"
            border-variant="info"
          >
            <router-link class="btn btn-info homeBtn":to="{name: 'BlogShow', params: {user_id: blog.user_id, id: blog.id}}">{{ blog.id }}</router-link>
          </b-card>
        </div>
      </b-card-group>
      </div>
      <b-pagination-nav
        v-model="pageNumber"
        :number-of-pages="pagesAllNumber"
        base-url="#"
        first-number
      ></b-pagination-nav>
    </div>
  </div>

</template>

<script>
import axios from "axios"
  export default {
    data: function() {
      return {
        blogs: {},
        images: {},
        pageNumber: 1,
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
      },
      pagesAllNumber() {
        return Math.ceil(this.blogs.length / 9)
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

  .homeCardStyle {
    margin: 0 auto;
  }
  .homeCard {
    margin: 10px auto;
  }
  .homeBtn {
    width: 100%;
    margin: 0 auto;
  }
</style>
