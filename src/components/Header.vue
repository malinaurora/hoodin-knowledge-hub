<template>
  <div class="text-center m-3">
    <img
      :src="imgSrc"
      class="rounded logo"
      alt="logo"
    >
  </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            imgSrc: '/src/assets/images/hoodin-logo.png',
        };
    },
};

</script>

<style lang="scss">
.logo {
width: 200px;
height: 50px;
}
</style>
