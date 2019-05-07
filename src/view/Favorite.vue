<template>
    <div clasS="favorite">
        <header>
            <h2 v-if="noFavorites === true">
                No Articles Saved To Favorites!
            </h2>
        </header>
        <div class="row mb-5">
            <article v-for="api of apiData" :key="api.id" class="col-lg-4 col-md-6 mt-3 mb-3">
                <Article :api-data="api" modal-route="modalFavorite" />
            </article>
            <router-view />
        </div>
    </div>
</template>

<script>
import Article from '../components/Article.vue';

export default {
    components: {
        Article,
    },
    props: {
        searchString: {
            type: String,
            default: '',
        },
        checkedCategoriesArray: {
            type: Array,
            default: Array,
        },
    },
    data() {
        return {
            apiData: null,
            id: '',
            noFavorites: false,
            limit: 15,
            category: '',
        };
    },
    watch: {
        searchString(searchString) {
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?ids=${this.id}&limit=${
                    this.limit
                }&searchString=${searchString}&mediaCategories=${
                    this.category
                }&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
            )
                .then(response => response.json())
                .then(data => {
                    this.apiData = data.data.items;
                });

            this.offset = 0;
        },
        checkedCategoriesArray(categories) {
            let categoryString = '';
            categories.forEach(category => {
                categoryString += `${category},`;
            });
            this.category = categoryString;
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?ids=${this.id}&limit=${
                    this.limit
                }&searchString=${
                    this.searchString
                }&mediaCategories=${categoryString}&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
            )
                .then(response => response.json())
                .then(data => {
                    this.apiData = data.data.items;
                });

            this.offset = 0;
        },
    },
    mounted() {
        document.body.scrollTop = 0;
        const data = JSON.parse(localStorage.getItem('id'));
        if (data.length <= 0) {
            this.noFavorites = true;
        }
        data.forEach(idString => {
            this.id += `${idString},`;
        });
        fetch(
            `https://interns-test-channel.hoodin.com/api/v2/items?ids=${
                this.id
            },?&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
        )
            .then(response => response.json())
            .then(post => {
                this.apiData = post.data.items;
            });
    },
};
</script>

<style lang="scss">
.favorite {
    header {
        h1 {
            text-align: center;
            font-size: 4em;
        }
        h2 {
            text-align: center;
            margin-top: 35vh;
            font-size: 2em;
            font-weight: 200;
        }
    }
}
</style>
