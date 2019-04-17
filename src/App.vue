<template>
  <div id="app">
    <NavBar />
    <Modal />
    <main class="container">
      <Start :api-data="apiData" />
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Start from './components/Start.vue';
import Modal from './components/Modal.vue';
import NavBar from './components/NavBar.vue';

export default {
    components: {
        Start,
        NavBar,
        Modal,
    },
    data() {
        return {
            apiData: null,
        };
    },
    mounted() {
        axios
            .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
        // eslint-disable-next-line no-return-assign
            .then(response => (this.apiData = response));
        setInterval(() => {
            axios
                .get('https://interns-test-channel.hoodin.com/api/v2/items?limit=15&&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9')
                // eslint-disable-next-line no-return-assign
                .then(response => (this.apiData = response));
        }, 60000);
    },
};

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat|Roboto+Slab:300,400");
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    letter-spacing: -0.05em;
}
h1 {
    font-size: 2em;
}
h2 {
    font-size: 1.5em;
}
h3 {
    font-size: 1.3em;
}
h4 {
    font-size: 1em;
}
h5 {
    font-size: 0.8em;
}
h6 {
    font-size: 0.7em;
}
nav{
    font-family: "Roboto Slab";
    font-size: 1.3em;
}
p {
    font-family: "Roboto Slab";
    line-height: 25px;
    font-weight: 100;
}
b{
    font-family: "Roboto Slab";
    line-height: 25px;
}

footer {
    font-weight: normal;
    line-height: normal;
}

.modal {
    background: #f3f3f3;
    box-shadow: 2px 6px 4px rgba(0, 0, 0, 0.25);
    p {
    font-size: 1.125em;
    }
}
</style>
