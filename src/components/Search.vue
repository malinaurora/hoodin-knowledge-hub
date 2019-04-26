<template>
  <div>
    <div class="search-wrapper">
      <input
        v-model="search"
        type="text"
        placeholder="Search title.."
        @click="searchFunc"
      >
    </div>
    <div class="wrapper">
      <div>
        <ul id="myUL">
          <li>{{ apiData.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            apiData: {},
            articlesList: [],


        };
    },
    mounted() {
        this.$http
            .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
            .then((response) => {
                this.apiData = response.body.data.items;
            });
    },
    methods: {
        searchFunc() {
            // return this.articlesList.filter(
            //     search: () => {
            // 		this.apiData.title.toLowerCase().includes(
            // 		this.search.toLowerCase(),


            // 	),
            // 	}
            // );
        },

    },
};


</script>

<style>

</style>
