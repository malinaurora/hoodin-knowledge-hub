
<template>
  <div
    class="modal"
    :class="customClass"
    :style="{ display: show ? 'block' : 'none' }"
  >
    <div
      class="overlay"
      @click="closeCallback()"
    />
    <div class="modal_content">
      <div />
      <slot>
        <h1>{{ modalArticle.title }}</h1>
        <p>{{ modalArticle.text | striphtml }}</p>
      </slot>
      <button
        title="Close"
        class="close_modal"
        @click="closeCallback()"
      >
        <i class="fas fa-times" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        show: Boolean,
        customClass: String,
        closeCallback: Function,
        modalArticle: Object,
    },
};
</script>

<style>
  .modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.modal .overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.modal .modal_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  overflow: auto;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  padding: 80px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.7);
  border-radius: 4px;
  max-width: 80%;
}

.modal .modal_content > h2 {
  font-size: 28px;
  font-weight: 200;
  margin: 20px 0 40px;
  text-align: center;
}

.modal .modal_content .buttons_wrapper {
  padding: 20px;
}

.modal .close_modal {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.5;
  background: none;
  border: none;
  transition: opacity 0.2s ease;
}

.modal .close_modal:hover {
  opacity: 0.9;
}
</style>
