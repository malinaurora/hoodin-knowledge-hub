
<template>
  <div>
    <Modal
      v-bind="{ closeCallback: toggleModal, show, customClass: 'custom_modal_class'}"
      :modal-article="modalArticle"
    />
    <div class="row mb-5">
      <article
        v-for="api of apiData.data.data.items"
        :key="api.id"
        class="col-lg-4 col-md-6 mt-3 mb-3"
        @click="toggleModal(), getArticle(api)"
      >
        <Article :api-data="api" />
      </article>
    </div>
    <div
      class="text-center col-md-12 .offset-md-3 m-3"
    >
      <a
        href="#"
        class="btn btn-light btn-lg"
        role="button"
        aria-disabled="true"
        @click="showMoreArtickels()"
      >
        <img
          src="/src/assets/icons/baseline-arrow.svg"
          alt="arrow icon"
        > </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Article from './Article.vue';
import Modal from './Modal.vue';

export default {
    components: {
        Article,
        Modal,
    },
    data() {
        return {
            apiData: null,
            show: false,
            modalArticle: null,
        };
    },
    mounted() {
        axios
            .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
        // eslint-disable-next-line no-return-assign
            .then(response => (this.apiData = response));
        setInterval(() => {
            axios
                .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
                .then((response) => { this.apiData = response; });
        }, 60000);
    },
    methods: {
        toggleModal() {
            this.show = !this.show;
        },
        getArticle(articleData) {
            this.modalArticle = articleData;
        },
    },
};
</script>

<style lang="scss">
</style>
