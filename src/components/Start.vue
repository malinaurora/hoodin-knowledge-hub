
<template>
  <div class="row mb-5">
    <article
      v-for="data in apiData.data.data.items"
      :id="data.id"
      :key="data.id"
      class="col-lg-4 col-md-6 mt-5 mb-3"
    >
      <div class="content">
        <div
          v-if="data.imageObjects.images.length > 0 && data.video === null"
          class="images"
        >
          <img
            :src="data.imageObjects.images[0].url"
            alt="Article picture."
          >
        </div>
        <iframe
          v-if="data.video != null"
          class="video"
          width="100%"
          height="50%"
          :src="'https://www.youtube.com/embed/' + data.video.video_id"
        />

        <section class="text">
          <h2 v-if="data.title != ''">
            {{ data.title }}
          </h2>
          <b v-if="data.section !=''">{{ data.section }}</b>
          <p>{{ data.text | striphtml }}</p>
        </section>

        <footer>
          <p>{{ data.author.name }}</p>
          <img
            src="/src/assets/icons/baseline-favorite-border.svg"
            alt="Navigation icon home"
          >
        </footer>
      </div>
    </article>
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
    watch: {
    },
    mounted() {
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
            img{
                height: 100%;
                width: 100%;
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
