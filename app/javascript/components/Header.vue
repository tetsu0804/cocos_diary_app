<template>
  <div>
    <b-nav>
      <router-link :to="{ name: 'Home' }">COCO's Diary Application</router-link>
      <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
      <b-nav-item>Link</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
  </div>
</template>
