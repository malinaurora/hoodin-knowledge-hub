<template>
  <div class="content">
    <div
      v-if="apiData.imageObjects.images.length > 0 && apiData.video === null"
      class="images"
    >
      <img
        :src="apiData.imageObjects.images[0].url"
        alt="Article picture."
      >
    </div>
    <iframe
      v-if="apiData.video != null"
      class="video"
      width="100%"
      height="50%"
      :src="'https://www.youtube.com/embed/' + apiData.video.video_id"
    />

    <section class="text">
      <h2 v-if="apiData.title != ''">
        {{ apiData.title }}
      </h2>
      <b v-if="apiData.section !=''">{{ apiData.section }}</b>
      <p>{{ apiData.text | striphtml }}</p>
    </section>

    <footer>
      <p>{{ apiData.author.name }}</p>
      <img
        src="/src/images/baseline-favorite-border.svg"
        alt="Navigation icon home"
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
