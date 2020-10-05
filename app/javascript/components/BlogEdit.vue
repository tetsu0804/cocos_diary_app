<template>
  <div>
    <b-row>
      <b-col offset="1" sm="10">
        <router-link :to="{name: 'BlogShow', params: {user_id: this.user.id, id: this.blog.id}}" class="btn btn-info blog-new-btn text-white">戻る</router-link>

        <p class="text-center h3 text-info">{{ blog.created_at | moment("YYYY年M月D日")}}の{{ user.last_name }} {{ user.first_name }} さんのここの日記を編集</p>

        <b-form @submit="onBlogsEditSubmit">

        <b-form-group
          id="blog-edit-input-group-1"
          label="タイトル"
          label-for="blog-edit-input-1"
        >
          <b-form-input
            id="blog-edit-input-1"
            v-model="blog.title"
            type="text"
            required
            placeholder="今日の可愛いここちゃん"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="blog-edit-textarea-rows"
          label="日記"
          label-for="blog-edit-input-2"
          >
          <b-form-textarea
            v-model="blog.content"
            id="blog-edit-input-2"
            placeholder="朝7時に起きてすぐにウンチを.................."
            rows="8"
          ></b-form-textarea>
        </b-form-group>

          <b-button block class="blog-edit-finish-btn" variant="info" type="submit">投稿</b-button>
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
          user: {}
      }
    },
    created() {
      let blogEditUrl = this.$route.path

      let blogEditUrlArrays = blogEditUrl.split('/')

      axios.get(`/api/v1/users/${this.$store.state.id}/blogs/${Number(blogEditUrlArrays[4])}`)
      .then(response => {
        let self = this
        self.blog = response.data.blog
        self.user = response.data.user
      })
    },
    computed: {
    },
    updated() {
    },
    mounted() {
    },
    methods: {
      onBlogsEditSubmit() {
        return new Promise((resolve, _) => {
          axios.patch(`/api/v1/users/${this.user.id}/blogs/${this.blog.id}`, { id: this.blog.id, title: this.blog.title, content: this.blog.content })
          .then(response => {
            this.blog = ""
            this.user = ""
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
