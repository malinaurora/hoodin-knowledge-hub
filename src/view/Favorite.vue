<template>
    <div clasS="favorite">
        <header>
            <div v-if="error" class="error">
                <img :src="errorImage" />
                <h2>
                    Något gick fel på grund av oss, försök gärna igen och kontakta vår support om
                    felet kvarstår.
                </h2>
            </div>
            <h2 v-else-if="noFavorites">
                No Articles Saved To Favorites!
            </h2>
            <h2 v-else-if="apiData.length <= 0">
                No Articles Found!
            </h2>
        </header>
        <div v-if="queryString.ids" class="row mb-5">
            <article v-for="api of apiData" :key="api.id" class="col-lg-4 col-md-6 mt-3 mb-3">
                <Article
                    :article="api"
                    modal-route="modalFavorite"
                    :favorite-in-modal="favoriteInModal"
                />
            </article>
            <router-view
                @toggleNav="toggleNav($event)"
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
import Helper from '../helpers';

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
                limit: 15,
                mediaCategories: '',
                sources: '',
                ondate: '',
                searchString: '',
            },
            error: false,
            errorImage: '/src/assets/images/error.svg',
            MoreArticlesToLoad: true,
            favoriteInModal: '',
            noFavorites: false,
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
        toggleNav(hide) {
            if (window.innerWidth < 575.98) {
                this.$emit('hideNavbar', hide);
            }
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
}
</style>
