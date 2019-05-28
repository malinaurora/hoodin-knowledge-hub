<template>
    <div class="modal">
        <router-link :to="this.$route.matched[0]">
            <div class="overlay" @click="enableScroll()" />
        </router-link>
        <div
            v-if="dataLoaded"
            class="modal_content"
            :class="modalArticle.imageObjects.images.length ? '' : 'noImages'"
        >
            <router-link :to="this.$route.matched[0]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    class="exitBtn"
                    alt="closeModal"
                    @click="enableScroll()"
                >
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </router-link>
            <iframe
                v-if="modalArticle.video"
                class="modalVideo"
                width="100%"
                height="100%"
                :src="'https://www.youtube.com/embed/' + modalArticle.video.video_id"
            />
            <ImageSlider
                v-else-if="modalArticle.imageObjects.images"
                :article-id="modalArticle.id"
                image-location="modal"
                :images="modalArticle.imageObjects.images"
            />
            <section class="modalText" :class="modalArticle.text.length > 400 ? '' : 'flexContent'">
                <div class="styleText">
                    <h1 v-if="modalArticle.title">{{ modalArticle.title }}</h1>
                    <b v-if="modalArticle.section">{{ modalArticle.section }}</b>
                    <p>{{ modalArticle.text | striphtml }}</p>
                </div>
            </section>
            <footer class="modalFooter">
                <div class="footerInfo">
                    <img
                        v-if="modalArticle.author.avatar"
                        class="avatarImage"
                        :src="modalArticle.author.avatar.url"
                        alt="Author avatar picture."
                    />
                    <div class="timeAndAuthor">
                        <p class="modalTime">{{ modalArticle.published.split('T')[0] }}</p>
                        <p class="modalAuthor">{{ modalArticle.author.name }}</p>
                    </div>
                </div>
                <div v-if="showMsg" class="popupmsg">
                    <p>{{ $t('likedmsg') }}</p>
                    <div class="arrow-down" />
                </div>
                <div class="footerLinks">
                    <div v-if="showShareMsg" class="shareMsg">
                        <p>{{ $t('copy') }}</p>
                        <div class="arrow-down" />
                    </div>
                    <div class="links">
                        <a class="modalShare" @click="getShare()">{{ $t('copyLink') }}</a>
                        <a
                            v-if="modalArticle.source_url"
                            target="_blank"
                            class="modalOrginalArticle"
                            rel="noopener noreferrer"
                            :href="modalArticle.source_url"
                            >{{ $t('originalArticle') }}</a
                        >
                    </div>
                    <div class="favIcon">
                        <svg
                            v-if="favorite"
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            class="favoritesIcon"
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
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            class="empty"
                            alt="Add to favorites."
                            @click="addFavorite()"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                            />
                        </svg>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import ImageSlider from '../components/ImageSlider.vue';

import config from '../config.json';

export default {
    name: 'Modal',
    components: {
        ImageSlider,
    },
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
        await fetch(`https://${config.baseRoute}/api/v2/items/${this.id}?&&token=${config.token}`)
            .then(response => response.json())
            .then(data => {
                this.modalArticle = data.data.item;
                this.dataLoaded = true;
            });
        const data = JSON.parse(localStorage.getItem('id'));
        data.forEach(favorit => {
            if (this.modalArticle.id === favorit) {
                this.favorite = true;
            }
        });
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        this.$emit('toggleNav', false);
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
        enableScroll() {
            document.getElementsByTagName('html')[0].style.overflowY = 'auto';
            this.$emit('toggleNav', true);
        },
        addFavorite() {
            this.$emit('favoriteAddedInModal', this.id);
            /* send id of favorited articel to parent component */
            const oldFavorites = JSON.parse(localStorage.getItem('id'));
            oldFavorites.push(this.modalArticle.id);
            localStorage.setItem('id', JSON.stringify(oldFavorites));
            this.favorite = true;
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 4000);
        },
        removeFavorite() {
            this.$emit('favoriteRemovedInModal', this.id);
            /* load all favorited ids */
            const data = JSON.parse(localStorage.getItem('id'));
            let index = 0;
            this.showMsg = false;
            /* find the id of the removed aricle and remove it from local storage */
            data.forEach(unFavorite => {
                if (unFavorite === this.modalArticle.id) {
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
    height: 100%;
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
    background: white;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90%;
    background: var(--article-color);
    box-sizing: border-box;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    max-width: 40%;
    h2 {
        font-size: 28px;
        font-weight: 200;
        margin: 20px 0 40px;
        text-align: center;
    }
    .images {
        img {
            width: 100%;
        }
    }
    iframe {
        height: 400px;
        border: none;
    }
    .modalText {
        overflow: auto;
        max-height: 180px;
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        .styleText {
            margin-top: 20px;
            margin-right: 25px;
            margin-left: 25px;
            h1 {
                margin-bottom: 20px;
            }
            p {
                margin: 0;
            }
            b {
                padding-bottom: 10px;
            }
        }
    }
    .exitBtn {
        background-color: white;
        border-radius: 360%;
        position: absolute;
        top: -20px;
        right: -20px;
        fill: var(--navbar-close-and-hamburger);
        width: 40px;
        cursor: pointer;
        transform: scale(0.8);
        transition: 0.2s;
        z-index: 9999;
        &:hover {
            transform: scale(1);
        }
    }
    ::-webkit-scrollbar {
        width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #e6e6e6;
        border-radius: 5px;
        -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
        -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
        box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
.noImages {
    max-width: 60%;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    h1 {
        font-size: 2em;
        line-height: 30px;
        margin-bottom: 30px !important;
    }

    .modalText {
        max-height: 700px;
    }

    .styleText {
        padding: 30px;
        b {
            font-size: 1.5em;
            line-height: 30px;
        }
        p {
            font-size: 1.5em;
            line-height: 30px;
            margin-top: 15px !important;
        }
    }
}

.modalFooter {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .footerInfo {
        display: flex;
        align-self: flex-end;
        color: var(--text-color);
        p {
            margin: 0 15px 0 15px;
            font-size: 15px;
        }
        .modalAuthor {
            display: flex;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 200px;
        }
        .timeAndAuthor {
            flex-direction: column;
        }
    }
    .footerLinks {
        display: flex;
        .links {
            flex-direction: column;
            align-self: flex-end;
            display: flex;
            a {
                line-height: 25px;
                font-size: 15px;
                align-self: flex-end;
                margin: 0 15px 0 15px;
                color: #007bff;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                    color: #007bff;
                    cursor: pointer;
                }
            }
        }
        .modalShare {
            align-self: flex-end;
            color: #007bff;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
        .favIcon {
            cursor: pointer;
            display: flex;
            align-self: flex-end;
            .empty {
                fill: var(--favorite-svg-empty-color);
            }
            .favoritesIcon {
                fill: var(--favorite-svg-fill-color);
            }
        }
    }
    .avatarImage {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0px 0px 10px gray;
        display: flex;
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
.onlyShare {
    position: absolute;
    bottom: 40px;
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
            display: flex;
            flex-direction: column;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            background-color: var(--article-color);

            .styleText {
                margin: 0;
            }
            .modalImages {
                img {
                    height: 50%;
                    object-fit: cover;
                    width: 100%;
                }
            }
            .flexContent {
                display: flex;
                flex: 1 1 auto;
                flex-direction: column;
                justify-content: space-around;
            }
            .modalText {
                padding-top: 20px;
                padding-bottom: 0px;
                padding-left: 15px;
                padding-right: 15px;
                max-height: none;
                h1 {
                    margin-bottom: 20px;
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
            .exitBtn {
                margin: 3px;
            }
        }
    }
}
@media only screen and (max-width: 575.98px) {
    .modal_content {
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        .modalImages {
            img {
                width: 100%;
            }
        }
        .flexContent {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
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
@media only screen and (min-width: 576px) and (max-width: 850px) {
    .modal_content {
        max-width: 80%;
        .img {
            height: 50%;
        }
    }
}
@media only screen and (min-width: 851px) and (max-width: 1200px) {
    .modal_content {
        max-width: 65%;
        .img {
            height: 50%;
        }
    }
}
</style>
