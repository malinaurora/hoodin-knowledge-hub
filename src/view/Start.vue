<template>
    <div class="start">
        <header>
            <h2 v-if="apiData.length <= 0">
                No Articles Found!
            </h2>
        </header>
        <div class="row mb-4 mt-2">
            <article v-for="api of apiData" :key="api.id" class="col-lg-4 col-md-6 mt-3 mb-3">
                <Article :api-data="api" modal-route="modalStart" />
            </article>
        </div>
        <router-view />
        <MoreArticles
            v-if="apiData.length >= limit && MoreArticlesToLoad"
            @showMore="showMore($event)"
        />
    </div>
</template>

<script>
import Article from '../components/Article.vue';
import MoreArticles from '../components/MoreArticles.vue';

export default {
    components: {
        Article,
        MoreArticles,
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
        checkedSourcesArray: {
            type: Array,
            default: Array,
        },
        unixTimestamp: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            apiData: [],
            limit: 15,
            offset: 0,
            category: '',
            MoreArticlesToLoad: true,
            source: '',
        };
    },
    watch: {
        searchString(searchString) {
            document.body.scrollTop = 0;
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?limit=${
                    this.limit
                }&searchString=${searchString}&mediaCategories=${this.category}&sources=${
                    this.source
                }&ondate=${
                    this.unixTimestamp
                }&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
            )
                .then(response => response.json())
                .then(data => {
                    this.apiData = data.data.items;
                });

            this.offset = 0;
        },
        checkedCategoriesArray(categories) {
            document.body.scrollTop = 0;
            let categoryString = '';
            categories.forEach(category => {
                categoryString += `${category},`;
            });
            this.category = categoryString;
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?limit=${
                    this.limit
                }&searchString=${this.searchString}&mediaCategories=${categoryString}&ondate=${
                    this.unixTimestamp
                }&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
            )
                .then(response => response.json())
                .then(data => {
                    this.apiData = data.data.items;
                });

            this.offset = 0;
        },
        checkedSourcesArray(sources) {
            document.body.scrollTop = 0;
            const categoryString = '';
            let sourceString = '';
            sources.forEach(source => {
                sourceString += `${source},`;
            });
            this.source = sourceString;
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?limit=${
                    this.limit
                }&searchString=${this.searchString}&mediaCategories=${categoryString}&ondate=${
                    this.unixTimestamp
                }&sources=${sourceString}&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
            )
                .then(response => response.json())
                .then(data => {
                    this.apiSources = sources.data.items;
                });

            this.offset = 0;
        },
        unixTimestamp(date) {
            document.body.scrollTop = 0;
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?limit=${
                    this.limit
                }&searchString=${this.searchString}&mediaCategories=${
                    this.category
                }&ondate=${date}&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
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
        let categoryString = '';
        this.checkedCategoriesArray.forEach(category => {
            categoryString += `${category},`;
        });
        this.category = categoryString;
        fetch(
            `https://interns-test-channel.hoodin.com/api/v2/items?offset=${this.offset}&limit=${
                this.limit
            }&searchString=${this.searchString}&mediaCategories=${this.category}&sources=${
                this.source
            }&ondate=${
                this.unixTimestamp
            }&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
        )
            .then(response => response.json())
            .then(data => {
                this.apiData = data.data.items;
            });
    },
    methods: {
        showMore() {
            this.offset += this.limit;
            fetch(
                `https://interns-test-channel.hoodin.com/api/v2/items?offset=${this.offset}&limit=${
                    this.limit
                }&searchString=${this.searchString}&mediaCategories=${this.category}&ondate=${
                    this.unixTimestamp
                }&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
            )
                .then(response => response.json())
                .then(data => {
                    this.apiData = this.apiData.concat(data.data.items);
                    if (data.data.items.length < this.limit) {
                        this.MoreArticlesToLoad = false;
                    }
                });
        },
        getSources() {
            fetch(
                'https://interns-test-channel.hoodin.com/api/v2/items?sources=facebook,user,twitter&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9',
            )
                .then(response => response.json())
                .then(sources => {
                    this.apiSources = sources.data.items;
                });
        },
    },
};
</script>

<style lang="scss">
.start {
    header {
        position: absolute;
        text-align: center;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 100%;
        left: 0;
        z-index: -9;
        h2 {
            text-align: center;
            font-size: 2em;
            font-weight: 200;
        }
    }
}
article {
    a {
        color: black;
        &:hover {
            color: black;
            text-decoration: none;
        }
    }
}
</style>
