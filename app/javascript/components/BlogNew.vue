<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <p class="text-center h3 text-info">{{ new Date() | moment("YYYY年M月D日")}}の{{ last_name }} {{ first_name }} さんの新しいここの日記</p>

        <b-form @submit="onBlogsNewSubmit">

        <b-form-group
          id="blog-new-input-group-1"
          label="タイトル"
          label-for="blog-new-input-1"
        >
          <b-form-input
            id="blog-new-input-1"
            v-model="title"
            type="text"
            required
            placeholder="今日の可愛いここちゃん"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="blog-new-textarea-rows"
          label="日記"
          label-for="blog-new-input-2"
          >
          <b-form-textarea
            v-model="content"
            id="blog-new-input-2"
            placeholder="朝7時に起きてすぐにウンチを.................."
            rows="8"
          ></b-form-textarea>
        </b-form-group>

        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="ここちゃんの可愛い写真を選んでね"
          drop-placeholder="Drop file here..."
          v-on:change="onFileChange()"
        ></b-form-file>
          <b-button block class="blog-new-btn" variant="info" type="submit">投稿</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

  export default {
    data: function() {
      return {
        file: '',
        title: '',
        content: '',
        uploadedImage: ''
      }
    },
    computed: mapState({
      id: state => state.id,
      last_name: state => state.last_name,
      first_name: state => state.first_name
    }),
    mounted() {
    },
    methods: {
      onFileChange() {
        let eventFile = event.target.files[0] || event.dataTransfer.files
        let reader = new FileReader()
        reader.onload = () => {
          this.uploadedImage = event.target.result
          this.file = this.uploadedImage
        }

        reader.readAsDataURL(eventFile)

      },
      onBlogsNewSubmit() {
        return new Promise((resolve, _) => {
           axios.post(`/api/v1/users/${this.id}/blogs`, { title: this.title, content: this.content, image: this.file})
           .then(res => {
             this.title = ""
             this.content = ""
             this.file = ""
             this.uploadedImage = ''
             this.$store.dispatch('doFeatchStateBlogId', res.data.blog.id)
             this.$store.dispatch('doFeatchStateBlogTitle', res.data.blog.title)
             this.$store.dispatch('doFeatchStateBlogContent', res.data.blog.content)
             this.$store.dispatch('doFeatchStateBlogCreatedAt', res.data.blog.created_at)
             this.$router.push('/')
             resolve(res)
           }).catch(e => {
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
