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
            image-location="article"
            :images="article.imageObjects.images"
        />
        <router-link
            v-if="article.imageObjects.images.length"
            :to="{ name: modalRoute, params: { id: article.id } }"
            class="text"
        >
            <h2 v-if="article.title">
                {{ article.title }}
            </h2>
            <b v-if="article.section">{{ article.section }}</b>
            <p>{{ article.text | striphtml }}</p>
        </router-link>
        <router-link
            v-else-if="article.title"
            :to="{ name: modalRoute, params: { id: article.id } }"
            class="noImage"
        >
            <h2 v-if="article.title">
                {{ article.title }}
            </h2>
            <b v-if="article.section">{{ article.section }}</b>
            <p>{{ article.text | striphtml }}</p>
        </router-link>
        <router-link
            v-else
            :to="{ name: modalRoute, params: { id: article.id } }"
            :class="article.text.length < 200 ? 'noTitle' : 'noTitleFill'"
        >
            <p>{{ article.text | striphtml }}</p>
        </router-link>
        <footer>
            <div class="footer-content">
                <p class="time">
                    {{ article.published | moment }}
                </p>
                <br />
                <p>
                    {{ source }}
                </p>
            </div>
            <div v-if="showMsg" class="msg">
                <p>{{ $t('likedmsg') }}</p>
                <div class="arrow-down" />
            </div>
            <svg
                v-if="favorite"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="favoriteIcon"
                alt="Remove from favorites."
                @click="removeFavorite()"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="favoriteIcon empty"
                alt="Add to favorites."
                @click="addFavorite()"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                />
            </svg>
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
            source: 'instagram',
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
    created() {
        if (this.article.text.length > 249) {
            this.article.text = this.article.text.slice(0, 249);
            this.article.text += '...';
        }
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

        this.getSource();
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
        getSource() {
            const url = this.article.source_url;
            if (url === null) {
                this.source = this.article.author.name;
            } else {
                const source = url
                    .replace('http://www.', '')
                    .replace('https://www.', '')
                    .split(/[/?#.]/)[0];
                this.source = source.charAt(0).toUpperCase() + source.slice(1);
            }
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
    color: var(--text-color);
    &:hover {
        transform: scale(1);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        cursor: pointer;
    }

    a {
        text-decoration: none;
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

    .noImage {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin: 35px;
        flex: 1;
        white-space: pre-line;
        overflow: hidden;
        color: var(--text-color);

        h2 {
            font-size: 1.7em;
            margin-bottom: 25px;
            width: 100%;
        }
        b {
            width: 100%;
        }
        p {
            width: 100%;
            line-height: 27px;
        }
    }

    .noTitle {
        display: flex;
        justify-content: space-evenly;
        margin: 30px;
        margin-top: 40px;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
        white-space: pre-wrap;
        p {
            font-size: 1.5em;
            line-height: 29px;
        }
    }
    .noTitleFill {
        display: flex;
        justify-content: flex-start;
        margin: 30px;
        margin-top: 40px;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
        white-space: pre-wrap;
        p {
            font-size: 1.5em;
            line-height: 29px;
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
        display: flex;
        justify-content: space-between;

        .footer-content {
            width: 90%;
        }

        .time {
            line-height: normal;
        }

        .msg {
            position: absolute;
            top: -20px;
            right: 10px;
            background-color: black;
            border: 1px solid black;
            padding: 5px;
            border-radius: 2px;

            p {
                max-width: 100%;
                font-size: 13px;
                margin: 0;
                color: white;
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
            margin-top: 10px;
        }

        .empty {
            fill: var(--favorite-svg-empty-color);
        }

        svg {
            fill: var(--favorite-svg-fill-color);
        }
    }
}
</style>
