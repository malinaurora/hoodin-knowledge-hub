
<template>
  <div class="modal">
    <div
      class="modal_content"
    >
      <img
        class="closeBtn"
        src="/src/assets/icons/baseline-close-24px.svg"
        alt="closeModal"
        @click="$router.go(-1)"
      >
      <div class="urlContent">
        <p>Link for article</p>
        <input
          type="url"
          class="urlPlacholder"
          :value="url"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Share',
    data() {
        return {
            url: '',
        };
    },
    mounted() {
        this.url = window.location.href;
    },
};
</script>

<style lang="scss" scoped>

.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}

.modal_content {
  max-width: 80%;
  height: 20%;
    .closeBtn {
    position: absolute;
    right: 5px;
    width: 40px;
    cursor: pointer;
    transform: scale(0.8);
    transition: 0.2s;
      &:hover{
        transform: scale(1);
      }
    }
  .urlContent {
    .urlPlacholder {
      box-shadow: 0 0 2px;
      width: 85%;
      &:focus{
        outline: none;
      }

    }
  }
}
</style>
