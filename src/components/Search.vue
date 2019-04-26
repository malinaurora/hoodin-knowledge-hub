<template>
  <div>
    <input
      v-model="search"
      type="text"
      placeholder="Search title.."
    >
    <div class="row mb-5">
      <article
        v-for="api of searchInArticles"
        :key="api.id"
        class="col-lg-4 col-md-6 mt-3 mb-3"
      >
        <Article :api-data="api" />
      </article>
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
            search: '',
            apiData: [],
        };
    },
    computed: {
        searchInArticles() {
            return this.apiData.filter(api => api.title.match(this.search));
        },

    },
    mounted() {
        this.$http
            .get('https://interns-test-channel.hoodin.com/api/v2/items?&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
            .then((response) => {
                this.apiData = response.body.data.items;
            });
    },

};


</script>

<style>

</style>
