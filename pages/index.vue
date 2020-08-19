<template>
  <div class="container">
    <template v-if="$fetchState.pending">
      <div>Loading...</div>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ $fetchState.error }}</p>
    </template>
    <template v-else>
      <div v-for="post of posts" :key="post.id">
        <div class="post-item">
          <div class="post-title">
            <h2>
              <Prefetch :url="`/api/posts/${post.id}`">
                <n-link :to="`/posts/${post.id}`">
                  {{ post.title }}
                </n-link>
              </Prefetch>
            </h2>
          </div>
          <div class="post-summary">
            <p>{{ post.body }}</p>
          </div>
        </div>
        <hr />
      </div>
    </template>
  </div>
</template>

<script>
import { API_HOST } from '../helpers/api'
import { Prefetch } from '@xdn/vue'

export default {
  components: {
    Prefetch,
  },
  async fetch() {
    this.posts = await this.$http
      .$get(`${API_HOST}/posts`)
      .then((posts) => posts.slice(0, 20))
  },
  data() {
    return {
      posts: null,
    }
  },
}
</script>

<style scoped>
.post-item {
  margin: 1.5em 0;
}
</style>
