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

<style style lang="scss" scoped>
  div{
    width: 250px;
  }
  input{
    width: 65%;
    margin-left: 18px;
  }
      @media (max-width: 767.98px) {
          div{
    width: 100%;
  }
        input{
        width: 80%;
        }
      }

</style>
