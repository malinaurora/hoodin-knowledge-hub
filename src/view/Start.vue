<template>
    <div class="start">
        <header>
            <div v-if="error" class="error">
                <img :src="errorImage" />
                <h2>
                    {{ $t('errormsg') }}
                </h2>
            </div>
            <h2 v-else-if="apiData.length <= 0 && fetchSuccess">
                {{ $t('articlesfound') }}
            </h2>
            <Spinner v-else-if="!fetchSuccess" />
        </header>
        <div class="row">
            <article v-for="api of apiData" :key="api.id" class="column">
                <Article
                    :article="api"
                    modal-route="modalStart"
                    :favorite-in-modal="favoriteInModal"
                />
            </article>
        </div>
        <router-view
            @toggleNav="toggleNav($event)"
            @favoriteAddedInModal="favoriteAddedInModal($event)"
            @favoriteRemovedInModal="favoriteRemovedInModal($event)"
        />
        <MoreArticles
            v-if="apiData.length >= queryString.limit && moreArticlesToLoad"
            @showMore="showMore(queryString)"
        />
    </div>
</template>

<script>
import Article from '../components/Article.vue';
import MoreArticles from '../components/MoreArticles.vue';
import Spinner from '../components/Spinner.vue';
import Helper from '../helpers';
import config from '../config.json';

export default {
    components: {
        Article,
        MoreArticles,
        Spinner,
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
        startTimestamp: {
            type: String,
            default: '',
        },
        endTimestamp: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            apiData: [],
            queryString: {
                ids: '',
                offset: 0,
                limit: config.articleLimit,
                mediaCategories: this.checkedCategoriesArray,
                Sources: this.checkedSourcesArray,
                after: this.startTimestamp,
                before: this.endTimestamp,
                ondate: this.startTimestamp,
                searchString: this.searchString,
            },
            error: false,
            fetchSuccess: false,
            errorImage: '/src/assets/images/error.svg',
            moreArticlesToLoad: false,
            favoriteInModal: '',
        };
    },
    watch: {
        searchString() {
            this.getSearchString();
        },
        checkedCategoriesArray(categories) {
            this.getCategories(categories);
        },
        checkedSourcesArray(sources) {
            this.getSources(sources);
        },
        startTimestamp() {
            this.getDate();
        },
        endTimestamp() {
            this.getDate();
        },
    },
    mounted() {
        document.body.scrollTop = 0;
        this.getData(this.queryString);
    },
    methods: {
        getData: Helper.getData,
        showMore: Helper.showMoreData,
        getSearchString: Helper.getSearchString,
        getCategories: Helper.getCategories,
        getSources: Helper.getSources,
        getDate: Helper.getDate,

        favoriteAddedInModal(id) {
            this.favoriteInModal = `add ${id}`;
        },
        favoriteRemovedInModal(id) {
            this.favoriteInModal = `rem ${id}`;
        },
        toggleNav(hide) {
            if (window.innerWidth < 575.98) {
                this.$emit('hideNavbar', hide);
            }
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
        left: 50%;
        -ms-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
        width: 80%;
        z-index: -9;

        h2 {
            text-align: center;
            font-size: 2em;
            font-weight: 200;
            max-width: 900px;
            margin: auto;
            font-family: var(--filter-box-font);
        }

        .error {
            img {
                margin-top: 50px;
                width: 100%;
                max-width: 700px;
                margin-bottom: 20px;
            }
        }
    }

    .row {
        margin-top: 40px;
        margin-bottom: 20px;
    }
}
article {
    a {
        color: var(--text-color);
        margin-top: 30px;
        margin-bottom: 30px;
        &:hover {
            color: var(--text-color);
            text-decoration: none;
        }
    }
}
</style>
