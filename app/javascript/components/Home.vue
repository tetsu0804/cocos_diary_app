<template>
  <div>
    <div class="overflow-auto home-screen">
      <b-card-group deck  :key="i" class="homeCardStyle">
        <div sm="4" class="homeCard" v-for="blog in prossingBlogs" :key="blog.id">
          <b-card
            :img-src="blog.blog_image"
            :img-alt="blog.blog_image"
            img-top
            img-height="360px"
            img-width="320px"
            tag="article"
            style="width: 20rem;"
            border-variant="info"
          >
            <router-link class="btn btn-info homeBtn":to="{name: 'BlogShow', params: {user_id: blog.user_id, id: blog.id}}">{{ blog.title }}</router-link>
          </b-card>
        </div>
      </b-card-group>
      <b-col offset="5">
        <paginate
          :page-count="pagesAllNumber"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          >
        </paginate>
      </b-col>

    </div>
  </div>

</template>

<script>
import axios from "axios"
  export default {
    data: function() {
      return {
        prossingBlogs: {},
        blogs: {},
        thisPageNum: 1
      }
    },
    created() {
      axios.get('/api/v1/blogs').then(response => {
        let self = this
        let currentNumber =  this.thisPageNum * 9
        self.blogs = response.data.blogs
        self.prossingBlogs = self.blogs.slice(currentNumber - 9, currentNumber)
      })
      console.log('created')
    },
    mounted(){
  debugger
    },
    computed: {
      pagesAllNumber() {
        return Math.ceil(this.blogs.length / 9)
      }
    },
    methods: {
      clickCallback(pageNum) {
        this.thisPageNum = pageNum
        let changeNumber =  this.thisPageNum * 9
        this.prossingBlogs = this.blogs.slice(changeNumber -9,changeNumber )
      }
    }
  }
</script>

<style scoped>
  .home-screen {
    margin-top: 15px;
  }
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
  .paginate-home {
    margin: 0 auto;
  }
</style>
