<template>
    <div class="content">
        <iframe
            v-if="article.video"
            class="video"
            width="100%"
            height="50%"
            :src="'https://www.youtube.com/embed/' + article.video.video_id"
        />
        <ImageSlider
            v-else-if="article.imageObjects.images.length"
            :modal-route="modalRoute"
            :article-id="article.id"
            :images="article.imageObjects.images"
        />
        <router-link :to="{ name: modalRoute, params: { id: article.id } }" class="text">
            <h2 v-if="article.title">
                {{ article.title }}
            </h2>
            <b v-if="article.section">{{ article.section }}</b>
            <p>{{ article.text | striphtml }}</p>
        </router-link>
        <footer>
            <p class="time">
                {{ article.published | moment }}
            </p>
            <br />
            <p>
                {{ article.author.name }}
            </p>
            <div v-if="showMsg" class="msg">
                <p>Favorites are only stored locally on this device!</p>
                <div class="arrow-down" />
            </div>
            <img
                v-if="favorite"
                class="favoriteIcon"
                src="/src/assets/icons/baseline-favorite.svg"
                alt="Remove from favorites."
                @click="removeFavorite()"
            />
            <img
                v-else
                class="favoriteIcon"
                src="/src/assets/icons/baseline-favorite-border.svg"
                alt="Add to favorites."
                @click="addFavorite()"
            />
        </footer>
    </div>
</template>

<script>
import ImageSlider from './ImageSlider.vue';

export default {
    components: {
        ImageSlider,
    },
    props: {
        article: {
            type: Object,
            default: () => ({}),
        },
        modalRoute: {
            type: String,
            required: true,
        },
        favoriteInModal: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            favorite: false,
            showMsg: false,
            time: '',
        };
    },
    watch: {
        favoriteInModal(idString) {
            const id = idString.substr(4);
            if (id === this.article.id) {
                this.favorite = !this.favorite;
            }
        },
    },
    mounted() {
        /**
         * load all favorites as an array and loop thru it comparing ids
         * if they match the heart gets a different icon
         */
        const data = JSON.parse(localStorage.getItem('id'));

        data.forEach(favorit => {
            if (this.article.id === favorit) {
                this.favorite = true;
            }
        });
        this.time = new Date();
    },
    methods: {
        addFavorite() {
            /**
             * gets already favorited articles and converts to array add new favorite and saves as string to local storage
             */
            const oldFavorites = JSON.parse(localStorage.getItem('id'));
            oldFavorites.push(this.article.id);
            localStorage.setItem('id', JSON.stringify(oldFavorites));

            this.favorite = true;
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 4000);
        },
        removeFavorite() {
            /**
             * load all favorited ids
             */
            const data = JSON.parse(localStorage.getItem('id'));
            this.showMsg = false;

            /**
             * find the id of the removed aricle and remove it from local storage
             */
            data.forEach(unFavorite => {
                if (unFavorite === this.article.id) {
                    data.splice(data.indexOf(this.article.id), 1);
                }
            });

            /**
             * convert array to string and save it in local storage
             */
            localStorage.setItem('id', JSON.stringify(data));
            this.favorite = false;
        },
    },
};
</script>

<style lang="scss">
.content {
    height: 500px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: 0.2s;
    transform: scale(0.98);
    display: flex;
    flex-direction: column;
    background-color: var(--article-color);
    &:hover {
        transform: scale(1);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        cursor: pointer;
    }

    .text {
        overflow: hidden;
        margin: 10px;
        margin-bottom: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        display: flex;
        flex-direction: column;
        flex: 1;

        p {
            height: 100%;
            white-space: pre-wrap;
        }
    }

    .video {
        border: none;
        height: 45%;
    }

    footer {
        width: 100%;
        padding: 5px 10px 5px 10px;
        position: relative;
        color: var(--text-color);
        background-color: var(--article-footer-color);
        .time {
            line-height: normal;
        }

        .msg {
            position: absolute;
            top: -10px;
            right: 10px;
            background-color: black;
            border: 1px solid black;
            padding: 5px;
            border-radius: 2px;

            p {
                max-width: 100%;
                font-size: 13px;
                margin: 0;
                overflow: visible;
                font-weight: normal;
                line-height: normal;
            }

            .arrow-down {
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid black;
                position: absolute;
                right: 3px;
                bottom: -8px;
            }
        }

        p {
            margin: 0;
            font-size: 11px;
            max-width: 50%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            position: relative;
            display: inline-block;
            line-height: normal;
            font-weight: normal;
        }

        .favoriteIcon {
            float: right;
        }
    }
}
</style>
