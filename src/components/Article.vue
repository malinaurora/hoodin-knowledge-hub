<template>
  <div class="content">
    <div
      v-if="apiData.imageObjects.images.length > 0 && apiData.video === null"
      class="images"
    >
      <router-link :to="{name: 'Modal', params: {id: apiData.id}}">
        <img
          v-for="image of apiData.imageObjects.images"
          :key="image.url"
          :src="image.url"
          alt="Article picture."
          :class="apiData.id +'Image'"
        >
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
      v-if="apiData.video != null"
      class="video"
      width="100%"
      height="50%"
      :src="'https://www.youtube.com/embed/' + apiData.video.video_id"
    />
    <router-link
      :to="{name: 'Modal', params: {id: apiData.id}}"
      class="text"
    >
      <h2 v-if="apiData.title != ''">
        {{ apiData.title }}
      </h2>
      <b v-if="apiData.section !=''">{{ apiData.section }}</b>
      <p>{{ apiData.text | striphtml }}</p>
    </router-link>
    <footer>
      <p>{{ apiData.author.name }}</p>
      <img
        src="/src/assets/icons/baseline-favorite-border.svg"
        alt="Add to favorites."
      >
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
        nextImage(n) {
            this.imageSlider(this.slideIndex += n);
        },
        imageSlider(n) {
            let i;
            const x = document.getElementsByClassName(`${this.apiData.id}Image`);
            if (n > x.length) { this.slideIndex = 1; }
            if (n < 1) { this.slideIndex = x.length; }
            // eslint-disable-next-line no-plusplus
            for (i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
            }

            if (x[this.slideIndex - 1] !== undefined) {
                x[this.slideIndex - 1].style.display = 'block';
            }
        },
    },
};
</script>

<style lang="scss">
    .content{
        height: 500px;
        box-shadow: 0px 0px 15px gray;
        overflow: hidden;
        transition: 0.2s;
        transform: scale(0.98);
        display: flex;
        flex-direction: column;
        &:hover{
            transform: scale(1);
            cursor: pointer;
        }
        .text{
            margin: 10px;
            margin-bottom: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-word;
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .video{
            border:none;
            height: 45%;
        }
        .images{
            height: 45%;
            position: relative;
            img{
                height: 100%;
                width: 100%;
            }
            .nextImageRight{
              position: absolute;
              right:0;
              top: 50%;
              -ms-transform: translateY(-50%);
              transform: translateY(-50%);
              padding: 0px 10px 0px 10px;
              border: none;
              background: none;
              font-size: 25px;
              background-color: rgba(255, 255, 255, 0.5);
              transition: 0.2s;
              &:hover{
                background-color: rgba(211, 211, 211, 0.85);
              }
              &:focus{
                outline:0;
              }
            }
            .nextImageLeft{
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
              &:hover{
                background-color: rgba(211, 211, 211, 0.85);
              }
              &:focus{
                outline:0;
              }
            }
        }
        footer{
            background-color: white;
            width: 100%;
            padding:5px 10px 5px 10px;
            p{
                margin:0;
                font-size: 11px;
                max-width: 50%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                position: relative;
            }
            img{
                position: absolute;
                bottom:5px;
                right:10px;
            }
        }
    }
</style>
