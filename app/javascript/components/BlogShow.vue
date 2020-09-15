<template>
  <div>
    <b-col sm="12">
      <b-row class="blog-show-table">
        <b-col class="blog-show-border text-info text-center" >作成者: {{ user.last_name}} {{ user.first_name }}さん</b-col>
        <b-col class="blog-show-border text-info text-center">作成日: {{ blog.created_at | moment("YYYY年M月D日") }} </b-col>
      </b-row>
      <b-row>
        <b-col class="blog-show-title-border text-info">タイトル: {{ blog.title }}</b-col>
      </b-row>

        <b-img-lazy :src="blog.blog_image" alt="blog.blog_image" width="600px" heigth="650px" center rounded="true" class="blog-show-image"></b-img-lazy>

      <b-row>
        <b-col>
          <b-overlay :show="show" rounded="sm">
            <b-card-text class="text-center">
              {{ blog.content}}
            </b-card-text>
          </b-overlay>
        </b-col>
     </b-row>
    </b-col>
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
    margin: 15px 0;
    border: solid 2px #17a2b8;
    border-radius: 6px;
  }
</style>
