<template>
  <div>
    <router-link :to="{name: 'BlogShow', params: {user_id: this.$route.params.user_id, id: this.$route.params.id}}">戻る</router-link>
    Blog Edit

    <p class="text-center h3 text-info">{{ created_at | moment("YYYY年M月D日")}}の{{ this.$route.params.last_name }} {{ this.$route.params.first_name }} さんのここの日記を編集</p>

    <b-form @submit="onBlogsEditSubmit">

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
  import axios from "axios"

  export default {
    data: function() {
      return {
          title: title,
          content: content,
          created_at: created_at,
          first_name: frist_name,
          last_name: last_name
      }
    },
    created() {
      this.title = this.$route.params.title,
      this.content = this.$route.params.content,
      this.created_at =  this.$route.params.created_at,
      this.first_name = this.$route.params.frist_name,
      this.last_name = this.$route.params.last_name
      console.log('created')
    },
    updated() {
      console.log('updated')
    },
    methods: {
      onBlogsEditSubmit() {

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
