<template>
  <div>
    <p class="text-center h3 text-info">{{ last_name }} {{ first_name }} さんの新しいここの日記</p>

    <b-form @submit="onBlogsNewSubmit">

    <b-form-group
      id="input-group-1"
      label="タイトル"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="title"
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
        v-model="content"
        id="textarea-rows"
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
    mounted(){
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
             this.$refs.file.value = ''
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
