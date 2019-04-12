<template>
  <div id="app">
    <nav>
      <NavBar />
    </nav>
    <Api />
  </div>
</template>

<script>
import Api from './components/Api.vue';
import NavBar from './components/NavBar.vue';

export default {
    components: {
        Api,
        NavBar,
    },
};
</script>

<style lang="scss">

</style>
