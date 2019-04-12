
<template>
  <div class="row">
    <div
      v-for="data in apiData.data.data.items"
      :key="data.id"
      class="col-12 mt-5"
    >
      <div>
        {{ data }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
    props: ['apiData'],
};
</script>

<style>
</style>
