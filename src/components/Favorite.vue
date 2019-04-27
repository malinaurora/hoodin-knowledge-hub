
<template>
  <div clasS="favorite">
    <header>
      <h2 :style="{display: favorites ? 'block' : 'none'}">
        No Articles Saved To Favorites!
      </h2>
    </header>
    <div class="row mb-5">
      <article
        v-for="api of apiData"
        :key="api.id"
        class="col-lg-4 col-md-6 mt-3 mb-3"
      >
        <Article
          :api-data="api"
          modal-route="modalFavorite"
        />
      </article>
      <router-view />
    </div>
  </div>
</template>

<script>
import Article from './Article.vue';

export default {
    components: {
        Article,
    },
    data() {
        return {
            apiData: null,
            id: '',
            favorites: false,
        };
    },
    mounted() {
        document.body.scrollTop = 0;
        const data = JSON.parse(localStorage.getItem('id'));
        if (data.length <= 0) {
            this.favorites = true;
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const idString of data) {
            this.id += `${idString},`;
        }
        fetch(`https://interns-test-channel.hoodin.com/api/v2/items?ids=${this.id},?&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`)
            .then(response => response.json())
            .then((post) => { this.apiData = post.data.items; });
    },
};
</script>

<style lang="scss">
.favorite{
  header{
    h1{
      text-align: center;
      font-size: 4em;
    }
    h2{
        text-align: center;
        margin-top: 35vh;
        font-size: 2em;
        font-weight: 200;
    }
  }
}
</style>
