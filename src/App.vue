<template>
  <div id="app">
    <Start :api-data="apiData" />
  </div>
</template>

<script>
import axios from 'axios';
import Start from './components/Start.vue';

export default {
    components: {
        Start,
    },
    data() {
        return {
            apiData: null,
        };
    },
    mounted() {
        axios
            .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=50&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
            // eslint-disable-next-line no-return-assign
            .then(response => (this.apiData = response));
    },
};

</script>

<style lang="scss">

</style>
