
<template>
  <div>
    <router-view />
    <div class="row mb-5">
      <article
        v-for="api of apiData"
        :key="api.id"
        class="col-lg-4 col-md-6 mt-3 mb-3"
        @click="getArticle(api)"
      >
        <router-link :to="{name: 'Modal', params: {id: api.id}}">
          <Article :api-data="api" />
        </router-link>
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
            apiData: null,
            show: false,
            modalArticle: null,
        };
    },
    mounted() {
        this.$http
            .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
            .then((response) => {
                this.apiData = response.body.data.items;
            });
        setInterval(() => {
            this.$http
                .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
                .then((response) => { this.apiData = response.body.data.items; });
        }, 60000);
    },
    methods: {
        toggleModal() {
            this.show = !this.show;
        },
        getArticle(articleData) {
            this.modalArticle = articleData;
        },
    },
};
</script>

<style lang="scss">
article{
    a{
        color: black;
        &:hover{
            color: black;
            text-decoration: none;
        }
    }
}
</style>
