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
          placeholder="タイトル"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="内容" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="content"
          placeholder="今日のここちゃん"
          rows="8"
        >
        </b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="info">登録</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

  export default {
    computed: mapState({
      id: state => state.id,
      last_name: state => state.last_name,
      first_name: state => state.first_name
    }),
    mounted() {
    },
    methods: {
      onBlogsNewSubmit() {
        axios.post(`/api/v1/users/${this.id}/blogs`, { title: this.title, content: this.content})
        .then(response => {
          this.$router.push('/')
        })
      }
    }
  }
</script>
