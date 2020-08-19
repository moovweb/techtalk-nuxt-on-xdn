<template>
  <div class="container">
    <template v-if="$fetchState.pending">
      <div>Loading...</div>
    </template>
    <template v-else-if="$fetchState.error">
      <h1>Post #{{ $route.params.id }} not found {{ $fetchState.error }}</h1>
    </template>
    <template v-else>
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </template>
  </div>
</template>

<script>
import { API_HOST } from '../../helpers/api'

export default {
  async fetch() {
    this.post = await this.$http.$get(
      `${API_HOST}/posts/${this.$route.params.id}`
    )
  },
  data() {
    return {
      post: {},
    }
  },
  head() {
    return { title: this.post.title }
  },
}
</script>
