<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">

        <b-row class="blog-show-table">
          <b-col class="blog-show-border text-info text-center" >作成者: {{ user.last_name}} {{ user.first_name }}さん</b-col>
          <b-col class="blog-show-border text-info text-center">作成日: {{ blog.created_at | moment("YYYY年M月D日") }} </b-col>
        </b-row>
        <b-row>
          <b-col class="blog-show-title-border text-info">タイトル: {{ blog.title }}</b-col>
        </b-row>

          <b-img :src="blog.blog_image" alt="blog.blog_image" center rounded="true" class="blog-show-image"></b-img>

        <b-row>
          <b-col>
            <b-overlay :show="show" rounded="sm">
              <b-card-text class="text-center blog-show-content-border">
                {{ blog.content}}
              </b-card-text>
            </b-overlay>
          </b-col>
       </b-row>

         <b-row v-if="this.$store.state.id === this.blog.user_id">
          <b-col>
            <router-link id="blog-edit-btn":to="{name:'BlogEdit', params: {user_id: this.blog.user_id, id: this.blog.id, title: this.blog.title, content: this.blog.content, created_at: this.blog.created_at, first_name: this.user.first_name, last_name: this.user.last_name}}" class="blog-show-btn btn btn-info" >編集</router-link>
         </b-col>
         <b-col>
          <b-button class="blog-show-btn blog-delete-btn" variant="danger" v-on:click="deleteBlogs">削除</b-button>
         </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data: function() {
      return {
        user: {},
        blog: {},
        image: '',
      }
    },
    computed: {
      makeDate() {
        return new Date(this.blog.created_at)
      }
    },
    mounted(){
      axios.get(`/api/v1/users/${this.$route.params.user_id}/blogs/${this.$route.params.id}`)
      .then(response => {
        this.blog = response.data.blog
        this.user = response.data.user
      })
    },
    methods: {
      deleteBlogs() {
        return new Promise((resolve, _) => {
          axios.delete(`/api/v1/users/${this.$store.state.id}/blogs/${this.blog.id}`)
          .then( response => {
            this.blog = ''
            this.user = ''
            this.$store.dispatch('doDeleteStateBlogId', {id: this.blog.id, title: this.blog.title, content: this.blog.content, created_at: this.blog.created_at})
            this.$router.push('/')
          })
        })
      }
    }
  }
</script>

<style scoped>
  .blog-show-table {
    margin-top: 15px;
  }
  .blog-show-border {
    margin-left:5px;
    border: solid 2px #17a2b8;
    border-radius: 6px;
  }
  .blog-show-title-border {
    margin-top: 15px;
    border: solid 2px #17a2b8;
    border-radius: 6px;
  }
  .blog-show-image {
    width: 100%;
    margin: 15px 0;
    border: solid 2px #17a2b8;
    border-radius: 6px;
  }
  .blog-show-btn {
    margin: 15px 0;
    width: 100%;
  }
</style>
