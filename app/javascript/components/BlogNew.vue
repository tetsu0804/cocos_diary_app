<template>
  <div>
    <p class="text-center h3 text-info">{{ last_name }} {{ first_name }} さんの新しいここの日記</p>
    <b-form @submit="onBlogsNewSubmit">
      <p>
        <label>Title</label>
        <input name="title" type="text" v-model="title"><br />
      </p>
      <p>
        <label>Body</label>
        <input name="content" type="text" v-model="content"><br />
      </p>
      <p>
        <label>画像</label>
        <input name="uploadedImage" type="file" ref="file" v-on:change="onFileChange()"><br />
      </p>
      <input type="submit" value="Submit">
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
