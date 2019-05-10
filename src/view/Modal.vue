<template>
    <div class="modal">
        <router-link :to="this.$route.matched[0]">
            <div class="overlay" @click="enableScroll()" />
        </router-link>
        <div v-if="dataLoaded" class="modal_content">
            <router-link :to="this.$route.matched[0]">
                <img
                    class="exitBtn"
                    src="/src/assets/icons/baseline-close-24px.svg"
                    alt="closeModal"
                    @click="enableScroll()"
                />
            </router-link>
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
                <div v-if="showMsg === true" class="popupmsg">
                    <p>Favorites are only stored locally on this device!</p>
                    <div class="arrow-down" />
                </div>
                <img
                    v-if="favorite === false"
                    class="favoritesIcon"
                    src="/src/assets/icons/baseline-favorite-border.svg"
                    alt="Add to favorites."
                    @click="addFavorite()"
                />
                <img
                    v-if="favorite === true"
                    class="removeFavoriteIcon"
                    src="/src/assets/icons/baseline-favorite.svg"
                    alt="Remove from favorites."
                    @click="removeFavorite()"
                />
                <div class="footerLinks">
                    <div v-if="showShareMsg === true" class="shareMsg">
                        <p>Link copied!</p>
                        <div class="arrow-down" />
                    </div>
                    <a class="modalShare" @click="getShare()">Copy link</a>
                    <a
                        v-if="modalArticle.source_url !== null"
                        target="_blank"
                        class="modalOrginalArticle"
                        rel="noopener noreferrer"
                        :href="modalArticle.source_url"
                        >View original article</a
                    >
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data() {
        return {
            id: this.$route.params.id,
            slideIndex: 1,
            modalArticle: {},
            favorite: false,
            showMsg: false,
            dataLoaded: false,
            showShareMsg: false,
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
    mounted() {
        const data = JSON.parse(localStorage.getItem('id'));

        data.forEach(favorit => {
            if (this.modalArticle.id === favorit) {
                this.favorite = true;
            }
        });
    },
    methods: {
        getShare() {
            const url = document.createElement('input');
            const text = window.location.href;

            document.body.appendChild(url);
            url.value = text;
            url.select();
            document.execCommand('copy');
            document.body.removeChild(url);
            this.showShareMsg = true;
            setTimeout(() => {
                this.showShareMsg = false;
            }, 4000);
        },
        nextImage(next) {
            this.imageSlider((this.slideIndex += next));
        },
        imageSlider(next) {
            let i;
            const imageArray = document.getElementsByClassName(`${this.modalArticle.id}modalImage`);
            if (next > imageArray.length) {
                this.slideIndex = 1;
            }
            if (next < 1) {
                this.slideIndex = imageArray.length;
            }

            for (i = 0; i < imageArray.length; i += 1) {
                imageArray[i].style.display = 'none';
            }

            if (imageArray[this.slideIndex - 1] !== undefined) {
                imageArray[this.slideIndex - 1].style.display = 'block';
            }
        },
        enableScroll() {
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
        },
        addFavorite() {
            /* send id of favorited articel to parent component */
            this.favorite = true;
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 4000);
        },
        removeFavorite() {
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
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto+Slab:300,400');
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
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    max-width: 40%;
    display: flex;
    flex-direction: column;

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
        padding-top: 45px;
        padding-right: 20px;
        padding-left: 25px;
        padding-bottom: 25px;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .exitBtn {
        background-color: white;
        border-radius: 360%;
        position: absolute;
        top: -20px;
        right: -20px;
        width: 40px;
        cursor: pointer;
        transform: scale(0.8);
        transition: 0.2s;
        z-index: 9999;
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
            line-height: 25px;
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
    .removeFavoriteIcon {
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
        float: left;
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

.popupmsg {
    position: absolute;
    bottom: 60px;
    right: 17px;
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
.shareMsg {
    position: absolute;
    bottom: 63px;
    right: 80px;
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

@media only screen and (max-width: 480px) {
    .modal {
        .modal_content {
            max-width: 100%;
            height: 94%;
            max-height: 100%;
            margin-top: 20px;
            .modalImages {
                img {
                    width: 100%;
                }
            }
            .modalText {
                padding-top: 20px;
                padding-bottom: 0px;
                padding-left: 15px;
                padding-right: 15px;
                h1 {
                    font-size: 1.5em;
                }
            }
            footer {
                a {
                    font-size: 12px;
                    margin: 0 5px 0 0px !important;
                }
                p {
                    font-size: 12px;
                    margin: 0 0px 0 5px !important;
                }
                .modalAuthor {
                    width: 150px;
                }
            }
        }
    }
}

@media only screen and (max-width: 575.98px) {
    .modal_content {
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        .modalImages {
            img {
                max-height: 40%;
                height: 40%;
            }
        }
        footer {
            a {
                font-size: 12px;
                margin: 0 5px 0 0px !important;
            }
            p {
                font-size: 12px;
                margin: 0 0px 0 5px !important;
            }
            .footerInfo {
                width: 66px;
            }
        }
        .exitBtn {
            top: 0;
            right: 2px;
            width: 30px;
        }
    }
}

@media only screen and (max-width: 768px) {
    .modal_content {
        max-width: 80%;
    }
}
</style>
