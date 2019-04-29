
<template>
  <div
    class="text-center col-md-12 .offset-md-3 m-3 fixed-bottom"
  >
    <a
      class=" btn btn-light btn-lg"
      role="button"
      aria-disabled="true"
      @click="loadData"
    >
      <img
        src="/src/assets/icons/baseline-arrow.svg"
        alt="load more"
      > </a>
  </div>
</template>


<script>
export default {
    data() {
        return {
            apiData: null,
            message: 'test',
            btn: false,
            articlesArray: [],
            limit: 15,
            offset: 0,
            token: 'eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9',
        };
    },
    mounted() {
        fetch(
            `https://interns-test-channel.hoodin.com/api/v2/items?&offset=${
                this.offset
            }&limit=${this.limit}&token=${this.token}`,
        )
            .then(response => response.json())
            .then((post) => {
                this.apiData = post.data.items;
            });
    },
    methods: {
        loadData() {
            this.btn = true;
            // const data = JSON.parse(localStorage.getItem('id'));
            console.log(data);

            // eslint-disable-next-line no-restricted-syntax
            for (const api of data) {
                api.articlesArray.push({
                    text: this.apiData[api].id,
                    // eslint-disable-next-line no-tabs
                });
            }
            this.btn = false;
            this.apiData.offset += this.apiData.limit;
        },
    },
};
</script>


<style>
</style>
