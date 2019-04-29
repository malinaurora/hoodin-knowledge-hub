
<template>
  <div>
    <div class="row mb-5 mt-4">
      <article
        v-for="api of apiData"
        :key="api.id"
        class="col-lg-4 col-md-6 mt-3 mb-3"
      >
        <Article
          :api-data="api"
          modal-route="modalStart"
          @saveArticleId="saveFavorites($event)"
          @removeArticleId="removeFavorite($event)"
        />
      </article>
    </div>
    <router-view />
  </div>
</template>

<script>
import Article from '../components/Article.vue';

export default {
    components: {
        Article,
    },
    data() {
        return {
            apiData: null,
            Favorites: [],
        };
    },
    mounted() {
        fetch('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
            .then(response => response.json())
            .then((data) => { this.apiData = data.data.items; });

        setInterval(() => {
            fetch('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
                .then(response => response.json())
                .then((data) => { this.apiData = data.data.items; });
        }, 60000);

        /* convert local Storage from string to array */
        const data = JSON.parse(localStorage.getItem('id'));

        /* push old favorites to favorites array */
        data.forEach((id) => {
            this.Favorites.push(id);
        });
    },
    methods: {
        saveFavorites(id) {
            /* push new favorit id to array and saves it localy */
            this.Favorites.push(id);
            localStorage.setItem('id', JSON.stringify(this.Favorites));
        },
        removeFavorite(removedId) {
            /* removes the id from start favorites array so it doesn't
            push same article multiple times */
            let index = 0;

            this.Favorites.forEach((id) => {
                if (removedId === id) {
                    this.Favorites.splice(index, 1);
                }
                index += 1;
            });
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
