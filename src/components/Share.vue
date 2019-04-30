
<template>
  <div
    v-if="show === true"
    class="modal"
  >
    <div
      class="overlay"
      @click="closeShare()"
    />
    <div class="modal_content">
      <img
        class="closeBtn"
        src="/src/assets/icons/baseline-close-24px.svg"
        alt="closeModal"
        @click="closeShare()"
      >
      <div class="urlContent">
        <p>Link to article</p>
        <input
          id="myCopy"
          type="text"
          class="urlPlacholder"
          :value="url"
        >
      </div>
      <button
        class="copyBtn"
        @click="copyText()"
      >
        Copy
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Share',
    data() {
        return {
            url: '',
            show: true,
        };
    },
    mounted() {
        // Takes the url from the browser.
        this.url = window.location.href;
    },
    methods: {
        closeShare() {
            this.show = !this.show;
            this.$emit('close', this.show);
        },
        // Copy text from the input field.
        copyText() {
            const copy = document.getElementById('myCopy');
            copy.select();
            document.execCommand('copy');
        },
    },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat|Roboto+Slab:300,400");
.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.modal_content {
  max-width: 85%;
  padding: 40px;
  p{
    font-weight: normal;
  }
  .closeBtn {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    cursor: pointer;
    transform: scale(0.8);
    transition: 0.2s;
    &:hover {
      transform: scale(1);
    }
  }
  .urlContent {
    .urlPlacholder {
      width: 100%;
      margin-top: 30px;
      margin-bottom: 30px;
      height: 40px;
      border: 1px solid black;
      &:focus {
        outline: none;
      }
    }
  }
.copyBtn {
    background-color:#c4c4c4;
    border:none;
    display:inline-block;
    cursor:pointer;
    color:#000000;
    font-family:Arial;
    font-size:15px;
    padding:5px;
    text-decoration:none;
    width: 70px;
    height: 40px;
}
.copyBtn:hover {
    background-color:#949494;
}
.copyBtn:active {
    position:relative;
    top:1px;
}
}
</style>
