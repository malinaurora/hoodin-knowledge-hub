<template>
    <div class="content">
        <div v-if="apiData.imageObjects.images.length > 0 && apiData.video === null" class="images">
            <router-link :to="{ name: modalRoute, params: { id: apiData.id } }">
                <img
                    v-for="image of apiData.imageObjects.images"
                    :key="image.url"
                    :src="image.url"
                    alt="Article picture."
                    :class="apiData.id + 'Image'"
                />
            </router-link>
            <button
                v-if="apiData.imageObjects.images.length > 1"
                class="nextImageLeft"
                @click="nextImage(-1)"
            >
                &#10094;
            </button>
            <button
                v-if="apiData.imageObjects.images.length > 1"
                class="nextImageRight"
                @click="nextImage(1)"
            >
                &#10095;
            </button>
        </div>
        <iframe
            v-if="apiData.video !== null"
            class="video"
            width="100%"
            height="50%"
            :src="'https://www.youtube.com/embed/' + apiData.video.video_id"
        />
        <router-link
            v-if="apiData.title !== ''"
            :to="{ name: modalRoute, params: { id: apiData.id } }"
        >
            <h2 class="text">
                {{ apiData.title }}
            </h2>
            <b v-if="apiData.section !== ''">{{ apiData.section }}</b>
            <p>{{ apiData.text | striphtml }}</p>
        </router-link>
        <footer>
            <p class="time">
                {{ apiData.published | moment }}
            </p>
            <br />
            <p>
                {{ apiData.author.name }}
            </p>
            <div v-if="showMsg === true" class="msg">
                <p>Favorites are only stored locally on this device!</p>
                <div class="arrow-down" />
            </div>
            <img
                v-if="favorite === false"
                class="favoriteIcon"
                src="/src/assets/icons/baseline-favorite-border.svg"
                alt="Add to favorites."
                @click="addFavorite()"
            />
            <img
                v-if="favorite === true"
                class="favoriteIcon"
                src="/src/assets/icons/baseline-favorite.svg"
                alt="Remove from favorites."
                @click="removeFavorite()"
            />
        </footer>
    </div>
</template>

<script>
export default {
    props: {
        apiData: {
            type: Object,
            default() {
                return { message: 'Api Data' };
            },
        },
        modalRoute: {
            type: String,
            default: 'modalStart',
        },
    },
    data() {
        return {
            slideIndex: 1,
            favorite: false,
            showMsg: false,
            time: '',
        };
    },
    mounted() {
        this.imageSlider(this.slideIndex);
        /* load all favorites as an array and loop thru it comparing ids
        if they match the heart gets a different icon */
        const data = JSON.parse(localStorage.getItem('id'));

        data.forEach(favorit => {
            if (this.apiData.id === favorit) {
                this.favorite = true;
            }
        });
        this.time = new Date();
    },
    methods: {
        /* next image in slider */
        nextImage(n) {
            this.imageSlider((this.slideIndex += n));
        },

        /* if the article contains more than one picture it shows a slider */
        imageSlider(n) {
            let i;
            const x = document.getElementsByClassName(`${this.apiData.id}Image`);
            if (n > x.length) {
                this.slideIndex = 1;
            }
            if (n < 1) {
                this.slideIndex = x.length;
            }

            for (i = 0; i < x.length; i += 1) {
                x[i].style.display = 'none';
            }

            if (x[this.slideIndex - 1] !== undefined) {
                x[this.slideIndex - 1].style.display = 'block';
            }
        },
        addFavorite() {
            /* send id of favorited articel to parent component */
            this.$emit('saveArticleId', this.apiData.id);
            this.favorite = true;
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 4000);
        },
        removeFavorite() {
            this.$emit('removeArticleId', this.apiData.id);
            /* load all favorited ids */
            const data = JSON.parse(localStorage.getItem('id'));
            let index = 0;
            this.showMsg = false;

            /* find the id of the removed aricle and remove it from local storage */
            data.forEach(unFavorite => {
                if (unFavorite === this.apiData.id) {
                    data.splice(index, 1);
                }
                index += 1;
            });

            /* convert array to string and save it in local storage */
            localStorage.setItem('id', JSON.stringify(data));
            this.favorite = false;
        },
    },
};
</script>

<style lang="scss">
.content {
    height: 500px;
    box-shadow: 0px 0px 15px gray;
    transition: 0.2s;
    transform: scale(0.98);
    display: flex;
    flex-direction: column;
    &:hover {
        transform: scale(1);
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
    }
    .video {
        border: none;
        height: 45%;
    }
    .images {
        height: 45%;
        position: relative;
        img {
            height: 100%;
            width: 100%;
        }
        .nextImageRight {
            position: absolute;
            right: 0;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            padding: 0px 10px 0px 10px;
            border: none;
            background: none;
            font-size: 25px;
            background-color: rgba(255, 255, 255, 0.5);
            transition: 0.2s;
            &:hover {
                background-color: rgba(211, 211, 211, 0.85);
            }
            &:focus {
                outline: 0;
            }
        }
        .nextImageLeft {
            position: absolute;
            left: 0px;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            padding: 0px 10px 0px 10px;
            border: none;
            background: none;
            font-size: 25px;
            background-color: rgba(255, 255, 255, 0.5);
            transition: 0.2s;
            &:hover {
                background-color: rgba(211, 211, 211, 0.85);
            }
            &:focus {
                outline: 0;
            }
        }
    }
    footer {
        background-color: white;
        width: 100%;
        padding: 5px 10px 5px 10px;
        position: relative;
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
                color: white;
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
