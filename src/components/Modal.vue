
<template>
  <div>
    <b-button
      v-b-modal.modal-xl
      variant="primary"
    >
      xl modal
    </b-button>
    <b-modal
      id="modal-xl"
      hide-footer
      size="xl"
      title="Extra Large Modal"
    >
      Hello Extra Large Modal!
    </b-modal>
  </div>
</template>

<script>
export default {
    name: 'Modal',
};
</script>

<style lang="sass" scoped>

</style>
