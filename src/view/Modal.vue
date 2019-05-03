<template>
    <div class="modal">
        <div class="overlay" @click="$router.go(-1), enableScroll()" />
        <div v-if="dataLoaded" class="modal_content">
            <img
                class="exitBtn"
                src="/src/assets/icons/baseline-close-24px.svg"
                alt="closeModal"
                @click="$router.go(-1), enableScroll()"
            />
            <div
                v-if="modalArticle.imageObjects.images.length > 0 && modalArticle.video === null"
                class="modalImages"
            >
                <img
                    v-for="image of modalArticle.imageObjects.images"
                    :key="image.url"
                    :src="image.url"
                    alt="Article picture."
                    :class="modalArticle.id + 'modalImage'"
                />
                <button
                    v-if="modalArticle.imageObjects.images.length > 1"
                    class="nextImageLeftModal"
                    @click="nextImage(-1)"
                >
                    &#10094;
                </button>
                <button
                    v-if="modalArticle.imageObjects.images.length > 1"
                    class="nextImageRightModal"
                    @click="nextImage(1)"
                >
                    &#10095;
                </button>
            </div>
            <iframe
                v-if="modalArticle.video !== null"
                class="modalVideo"
                width="100%"
                height="100%"
                :src="'https://www.youtube.com/embed/' + modalArticle.video.video_id"
            />

            <section class="modalText">
                <h1 v-if="modalArticle.title !== ''">{{ modalArticle.title }}</h1>
                <b v-if="modalArticle.section !== ''">{{ modalArticle.section }}</b>
                <p>{{ modalArticle.text | striphtml }}</p>
            </section>
            <share v-if="show === true" @close="close($event)" />
            <footer class="modalFooter">
                <img
                    v-if="modalArticle.author.avatar !== null"
                    class="avatarImage"
                    :src="modalArticle.author.avatar.url"
                    alt="Author avatar picture."
                />
                <div class="footerInfo">
                    <p class="modalTime">{{ modalArticle.published.split('T')[0] }}</p>
                    <p class="modalAuthor">{{ modalArticle.author.name }}</p>
                </div>
                <img
                    class="favoritesIcon"
                    src="/src/assets/icons/baseline-favorite-border.svg"
                    alt="Add to favorites."
                />
                <div class="footerLinks">
                    <a class="modalShare" @click="getShare()">Copy link</a>
                    <a
                        v-if="modalArticle.source_url !== null"
                        class="modalOrginalArticle"
                        :href="modalArticle.source_url"
                        >View original article</a
                    >
                </div>
            </footer>
        </div>
        <img
            class="favoritesIcon"
            src="/src/assets/icons/baseline-favorite-border.svg"
            alt="Add to favorites."
        />
        <div class="footerLinks">
            <a class="modalShare" @click="getShare()">Copy link</a>
            <a
                v-if="modalArticle.source_url !== null"
                class="modalOrginalArticle"
                target="_blank"
                rel="noopener noreferrer"
                :href="modalArticle.source_url"
                >View original article</a
            >
        </div>
    </div>
</template>

<script>
import Share from '../components/Share.vue';

export default {
    name: 'Modal',
    components: {
        Share,
    },
    data() {
        return {
            id: this.$route.params.id,
            slideIndex: 1,
            modalArticle: {},
            show: false,
            dataLoaded: false,
        };
    },
    async created() {
        // fetch the data from the api.
        await fetch(
            `https://interns-test-channel.hoodin.com/api/v2/items/${
                this.id
            }?&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
        )
            .then(response => response.json())
            .then(data => {
                this.modalArticle = data.data.item;
                this.dataLoaded = true;
            });
        this.imageSlider(this.slideIndex);
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    },
    methods: {
        getShare() {
            this.show = !this.show;
        },
        close(val) {
            this.show = val;
        },
        nextImage(next) {
            this.imageSlider((this.slideIndex += next));
        },
        imageSlider(next) {
            let i;
            const picture = document.getElementsByClassName(`${this.modalArticle.id}modalImage`);
            if (next > picture.length) {
                this.slideIndex = 1;
            }
            if (next < 1) {
                this.slideIndex = picture.length;
            }

            for (i = 0; i < picture.length; i += 1) {
                picture[i].style.display = 'none';
            }

            if (picture[this.slideIndex - 1] !== undefined) {
                picture[this.slideIndex - 1].style.display = 'block';
            }
        },
        enableScroll() {
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
        },
    },
};
</script>

<style lang="scss">
.modal {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
}

.overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
}

.modal_content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90%;
    max-width: 80%;
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    max-width: 35%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1195px) {
        max-width: 60%;
    }
    @media screen and (max-width: 800px) {
        max-width: 90%;
    }
    @media screen and (max-width: 500px) {
        footer {
            a {
                font-size: 12px;
                margin: 0 5px 0 0px !important;
            }
            p {
                font-size: 12px;
                margin: 0 0px 0 5px !important;
            }
        }
    }
    .nextImageLeftModal {
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
    .nextImageRightModal {
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
    h2 {
        font-size: 28px;
        font-weight: 200;
        margin: 20px 0 40px;
        text-align: center;
    }
    .modalImages {
        position: relative;
        img {
            max-height: 60%;
            height: 60%;
            width: 100%;
        }
    }
    iframe {
        height: 400px;
        border: none;
    }
    .modalText {
        padding-top: 50px;
        padding-right: 60px;
        padding-left: 60px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .exitBtn {
        position: absolute;
        top: -8px;
        right: -45px;
        width: 40px;
        cursor: pointer;
        transform: scale(0.8);
        transition: 0.2s;
        &:hover {
            transform: scale(1);
        }
    }
}

.modalFooter {
    padding: 10px;
    .footerInfo {
        float: left;
        vertical-align: bottom;
        p {
            display: block;
            margin: 0 15px 0 15px;
        }
        .modalAuthor {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            width: 200px;
            &:hover {
                overflow: visible;
            }
        }
    }
    .footerLinks {
        float: right;
        vertical-align: bottom;
        a {
            display: block;
            margin: 0 15px 0 15px;
            color: #007bff;
            text-align: right;
            &:hover {
                text-decoration: underline;
                color: #007bff;
                cursor: pointer;
            }
        }
    }
    .favoritesIcon {
        margin-top: 5px;
        vertical-align: bottom;
        width: 40px;
        float: right;
    }
    .avatarImage {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0px 0px 10px gray;
    }
}
</style>
