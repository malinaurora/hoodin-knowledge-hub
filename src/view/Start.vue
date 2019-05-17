<template>
    <div class="start">
        <header>
            <h2 v-if="apiData.length <= 0 && !error">
                No Articles Found!
            </h2>
            <div v-if="error" class="error">
                <img :src="errorImage" />
                <h2>
                    Något gick fel på grund av oss, försök gärna igen och kontakta vår support om
                    felet kvarstår.
                </h2>
            </div>
        </header>
        <div class="row mb-4 mt-2">
            <article v-for="api of apiData" :key="api.id" class="col-lg-4 col-md-6 mt-3 mb-3">
                <Article
                    :article="api"
                    modal-route="modalStart"
                    :favorite-in-modal="favoriteInModal"
                />
            </article>
        </div>
        <router-view
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
import Helper from '../helpers';
import config from '../config.json';

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
            queryString: {
                ids: '',
                offset: 0,
                limit: config.articleLimit,
                mediaCategories: '',
                sources: '',
                ondate: '',
                searchString: '',
            },
            error: false,
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
        unixTimestamp(date) {
            this.getDate(date);
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
}
article {
    a {
        color: var(--text-color);
        &:hover {
            color: var(--text-color);
            text-decoration: none;
        }
    }
}
</style>
