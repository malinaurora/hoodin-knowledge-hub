
<template>
  <div
    class="modal"
    :class="customClass"
    :style="{ display: show ? 'block' : 'none' }"
  >
    <img
      class="exitBtn"
      src="/src/assets/icons/baseline-close-24px.svg"
      alt="closeModal"
      @click="closeCallback()"
    >
    <div
      class="overlay"
      @click="closeCallback()"
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
          v-if="modalArticle.source_url !=null"
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
        show: Boolean,
        // eslint-disable-next-line vue/require-default-prop
        customClass: String,
        // eslint-disable-next-line vue/require-default-prop
        closeCallback: Function,
        modalArticle: Object,
    },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.modal_content {
  position: relative;
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

.exitBtn {
  position: absolute;
  top: 5%;
  left: 85%;
  z-index: 9999;
  cursor: pointer;
}
</style>
