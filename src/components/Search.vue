<template>
  <div>
    <input
      v-model="search"
      placeholder="Search..."
      @input="sendSearch(search)"
    >
  </div>
</template>

<script>

export default {
    data() {
        return {
            search: '',
        };
    },
    methods: {
        sendSearch(string) {
            this.$emit('search', string);
        },
    },
};
</script>

<style>
</style>
