
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
      <p
        class="closeBtn"
        @click="closeCallback()"
      >
        X
      </p>
      <slot>
        <h1>Harnessing microorganisms for smart microsystems</h1>
        <p />A research team has developed a method to construct a biohybrid system that incorporates Vorticella microorganisms. The method allows movable structures to be formed in a microchannel and harnessed to Vorticella. The biohybrid system demonstrates the conversion of motion from linear motion to rotation. These fundamental technologies help researchers to create wearable smart microsystems by using autonomous microorganisms.
      </slot>
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
  overflow: auto;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  padding: 80px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.7);
  border-radius: 4px;
  max-width: 80%;
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

</style>
