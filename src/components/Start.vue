
<template>
  <div class="row">
    <div
      v-for="data in apiData.data.data.items"
      :key="data.id"
      class="col-md-4 mt-3 mb-3"
    >
      <article>
        <div>
          <iframe
            v-if="data.video != null"
            width="100%"
            height="50%"
            :src="'https://www.youtube.com/embed/' + data.video.video_id"
          />
          <section class="text">
            <h2>{{ data.title }}</h2>
            {{ data.text }}
          </section>
          <footer>
            {{ data.author.name }}
          </footer>
        </div>
      </article>
    </div>
    <div
      class="text-center col-md-12 .offset-md-3
 m-3"
    >
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="button"
        aria-pressed="false"
        autocomplete="off"
      >
        Single toggle
      </button>
    </div>
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
    article{
        height: 400px;
        overflow: hidden;
        box-shadow: 0px 0px 10px gray;
        .text{
            padding: 5%;
        }
        iframe{
            border:none;
        }
    }
</style>
