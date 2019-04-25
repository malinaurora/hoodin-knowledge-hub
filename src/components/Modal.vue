<template>
  <div
    class="modal"
  >
    <div
      class="overlay"
      @click="$router.go(-1)"
    />
    <div class="modal_content">
      <img
        class="exitBtn"
        src="/src/assets/icons/baseline-close-24px.svg"
        alt="closeModal"
        @click="$router.go(-1)"
      >
      <div
        v-if="modalArticle.imageObjects.images.length > 0 && modalArticle.video === null"
        class="modalImages"
      >
        <img
          :src="modalArticle.imageObjects.images[0].url"
          alt="Modal picture."
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
        <h1 v-if="modalArticle.title != ''">
          {{ modalArticle.title }}
        </h1>
        <b v-if="modalArticle.section !=''">{{ modalArticle.section }}</b>
        <p>{{ modalArticle.text | striphtml }}</p>
      </section>
      <footer
        class="modalFooter"
        @click="formatDate()"
      >
        <p class="modalTime">
          {{ modalArticle.published.split('T')[0] }}
        </p>
        <p class="modalAuthor">
          {{ modalArticle.author.name }}
        </p>
        <a
          v-if="modalArticle.source_url !=null"
          class="modalOrginalArticle"
          :href="modalArticle.source_url"
        >
          View original article
        </a>
        <a
          href=""
          class="modalShare"
        >
          Copy link
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
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
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
  height: 100%;
}

.modal_content > h2 {
  font-size: 28px;
  font-weight: 200;
  margin: 20px 0 40px;
  text-align: center;
}

.modalImages {
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
    padding-top: 30px;
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 30px;
}

.modalFooter > .modalAuthor {
  padding-left: 50px;
  position: absolute;
  bottom: 0px;
  margin-bottom: 10px;
}

.modalFooter > .modalTime {
  padding-left: 50px;
  position: absolute;
  bottom: 20px;
}

.modalFooter > img {
  position: absolute;
  bottom: 15px;
  right: 25px;
  width: 40px;
}

.exitBtn {
  position: absolute;
  top: -5px;
  right: -40px;
  width: 35px;
  z-index: 9999;
  cursor: pointer;
  border: 2px solid grey;
  transform: scale(0.99);
    &:hover{
      transform: scale(1.2);
    }
}

.modalFooter > .modalOrginalArticle {
  right: 90px;
  position: absolute;
  bottom: 0px;
  margin-bottom: 10px;
}

.modalFooter > .modalShare {
  right: 90px;
  position: absolute;
  bottom: 20px;
  margin-bottom: 16px;
}
</style>
