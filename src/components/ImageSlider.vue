<template>
    <div class="images">
        <router-link v-if="modalRoute" :to="{ name: modalRoute, params: { id: articleId } }">
            <img
                v-for="image of images"
                :key="image.url"
                :src="image.url"
                alt="Article picture."
                :class="articleId + imageLocation"
            />
        </router-link>
        <img
            v-for="image of images"
            v-else
            :key="image.url"
            :src="image.url"
            alt="Article picture."
            :class="articleId + imageLocation"
        />
        <button v-if="images.length > 1" class="nextImageLeft" @click="previousImage()">
            &#10094;
        </button>
        <button v-if="images.length > 1" class="nextImageRight" @click="nextImage()">
            &#10095;
        </button>
    </div>
</template>
<script>
export default {
    props: {
        articleId: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        modalRoute: {
            type: String,
            default: '',
        },
        imageLocation: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            slideIndex: 1,
        };
    },
    mounted() {
        this.imageSlider(this.slideIndex);
    },
    methods: {
        /**
         * Next image in slider
         */
        nextImage() {
            this.imageSlider((this.slideIndex += 1));
        },
        /**
         * Previous image in slider
         */
        previousImage() {
            this.imageSlider((this.slideIndex += -1));
        },

        /**
         *  if the article contains more than one picture it shows a slider
         */
        imageSlider(next) {
            const imageArray = document.getElementsByClassName(
                `${this.articleId + this.imageLocation}`,
            );
            if (next > imageArray.length) {
                this.slideIndex = 1;
            }
            if (next < 1) {
                this.slideIndex = imageArray.length;
            }

            for (let i = 0; i < imageArray.length; i += 1) {
                imageArray[i].style.display = 'none';
            }

            if (imageArray[this.slideIndex - 1] !== undefined) {
                imageArray[this.slideIndex - 1].style.display = 'block';
            }
        },
    },
};
</script>
<style lang="scss">
.images {
    max-height: 60%;
    position: relative;
    overflow: hidden;

    img {
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
</style>
