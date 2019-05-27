<template>
    <div class="favorite">
        <header>
            <div v-if="error" class="error">
                <img :src="errorImage" />
                <h2>
                    {{ $t('errormsg') }}
                </h2>
            </div>
            <h2 v-else-if="noFavorites">
                {{ $t('favoritText') }}
            </h2>
            <h2 v-else-if="apiData.length <= 0 && fetchSuccess">
                {{ $t('articlesfound') }}
            </h2>

            <Spinner v-else-if="!fetchSuccess" />
        </header>
        <div v-if="queryString.ids" class="row">
            <article v-for="api of apiData" :key="api.id" class="column">
                <Article
                    :article="api"
                    modal-route="modalFavorite"
                    :favorite-in-modal="favoriteInModal"
                />
            </article>
            <router-view
                @favoriteAddedInModal="favoriteAddedInModal($event)"
                @favoriteRemovedInModal="favoriteRemovedInModal($event)"
            />
        </div>
        <MoreArticles
            v-if="apiData.length >= queryString.limit && MoreArticlesToLoad && queryString.ids"
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
                mediaCategories: '',
                sources: '',
                after: '',
                before: '',
                ondate: '',
                searchString: '',
            },
            error: false,
            errorImage: '/src/assets/images/error.svg',
            MoreArticlesToLoad: true,
            favoriteInModal: '',
            noFavorites: false,
            fetchSuccess: false,
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
        const data = JSON.parse(localStorage.getItem('id'));
        if (data.length <= 0) {
            this.noFavorites = true;
        }
        data.forEach(idString => {
            this.queryString.ids += `${idString},`;
        });
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
    },
};
</script>

<style lang="scss">
.favorite {
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
            font-family: var(--filter-box-font);
            margin: auto;
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
</style>
