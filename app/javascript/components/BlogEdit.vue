<template>
  <div>
    <b-row>
      <b-col offset="1" sm="10">
        <router-link :to="{name: 'BlogShow', params: {user_id: this.user_id, id: this.blog.id}}" class="btn btn-info blog-new-btn text-white">戻る</router-link>

        <p class="text-center h3 text-info">{{ blog.created_at | moment("YYYY年M月D日")}}の{{ last_name }} {{ first_name }} さんのここの日記を編集</p>

        <b-form @submit="onBlogsEditSubmit">

        <b-form-group
          id="input-group-1"
          label="タイトル"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="blog.title"
            type="text"
            required
            placeholder="今日の可愛いここちゃん"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="textarea-rows"
          label="日記"
          label-for="input-2"
          >
          <b-form-textarea
            v-model="blog.content"
            id="textarea-rows"
            placeholder="朝7時に起きてすぐにウンチを.................."
            rows="8"
          ></b-form-textarea>
        </b-form-group>

          <b-button block class="blog-new-btn" variant="info" type="submit">投稿</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data: function() {
      return {
          blog: {},
          first_name: frist_name,
          last_name: last_name,
          user_id: user_id,
          uploadedEditImage: ''
      }
    },
    created() {


      console.log('created')
      let num = this.$route.params.id
      let editBlogs = this.$store.state.blogs
      function isBlogs(blog, index, array, t) {
        return blog.id === Number(num)
      }
      this.blog = editBlogs.find(isBlogs)

      this.first_name = this.$store.state.first_name
      this.last_name = this.$store.state.last_name
      this.user_id = this.$store.state.id
    },
    computed: {
    },
    updated() {
      console.log('updated')
    },
    mounted() {
      console.log('mounted')
    },
    methods: {
      onBlogsEditSubmit() {
        return new Promise((resolve, _) => {
          axios.patch(`/api/v1/users/${this.user_id}/blogs/${this.blog.id}`, { id: this.blog.id, title: this.blog.title, content: this.blog.content })
          .then(response => {
            this.blog = ""
            this.first_name = ""
            this.last_name = ""
            user_id: ""
            uploadedEditImage: ""
            this.$store.dispatch('doFetchStateEditBlogs', { id: response.data.blog.id, title: response.data.blog.title, content: response.data.blog.content })
            this.$router.push('/')
          })
        })
      }
    }

  }
</script>

<style scoped>
  .text-info {
    margin-top: 15px;
  }
  .blog-new-btn {
    margin-top: 15px;
  }
</style>
