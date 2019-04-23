
<template>
  <div
    class="modal"
    :class="customClass"
  >
    <div
      class="overlay"
      @click="$router.go(-1)"
    />
    <div class="modal_content">
      <div
        v-if="modalArticle.imageObjects.images.length > 0 && modalArticle.video === null"
        class="modalImages"
      >
        <img
          :src="modalArticle.imageObjects.images[0].url"
          alt="Article picture."
        >
      </div>
      <iframe
        v-if="modalArticle.video != null"
        class="modalVideo"
        width="100%"
        height="50%"
        :src="'https://www.youtube.com/embed/' + modalArticle.video.video_id"
      />

      <section class="modalText">
        <h1>{{ modalArticle.title }}</h1>
        <p>{{ modalArticle.text | striphtml }}</p>
      </section>
      <footer class="modalFooter">
        <p class="modalTime">
          {{ modalArticle.published }}
        </p>
        <p class="modalAuthor">
          {{ modalArticle.author.name }}
        </p>
        <a
          v-if="modalArticle.source_url != null"
          class="modalOrginalArticle"
          :href="modalArticle.source_url"
        >
          Se Orginal artikeln
        </a>
        <img
          src="/src/assets/icons/baseline-favorite-border.svg"
          alt="Add to favorites."
        >
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        // eslint-disable-next-line vue/require-default-prop
        customClass: String,
        // eslint-disable-next-line vue/require-default-prop
        closeCallback: Function,
    },
    data() {
        return {
            id: this.$route.params.id,
            modalArticle: {},
        };
    },
    created() {
        this.$http.get(`https://interns-test-channel.hoodin.com/api/v2/items/${this.id}?&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`)
            .then((res) => {
                this.modalArticle = res.body.data.item;
            });
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
  height: 100%
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.modal_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  max-width: 80%;
  overflow: auto;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  width: 950px;
  height: 1000px;
}

.modal_content > h2 {
  font-size: 28px;
  font-weight: 200;
  margin: 20px 0 40px;
  text-align: center;
}

.closeBtn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.modalImages {
    height: auto;
    position: relative;
}

.modalVideo {
    border:none;
    height: 45%;
}

.modalImages > img {
    height: 45%;
    width: 100%;
}

.modalText {
    padding-top: 50px;
    padding-right: 80px;
    padding-left: 80px;
    padding-bottom: 50px;
}

.modalFooter > .modalAuthor {
  padding-left: 80px;
  position: absolute;
  bottom: 0px;
  margin-bottom: 20px;
}

.modalFooter > .modalTime {
  padding-left: 80px;
  position: absolute;
  bottom: 30px;
}

.modalFooter > img {
  position: absolute;
  bottom: 20px;
  right: 80px;
  width: 50px;
}
</style>
