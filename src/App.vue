<template>
  <div id="app">
    <NavBar />
    <main class="container">
      <Start />
    </main>
  </div>
</template>

<script>
import Start from './components/Start.vue';
import NavBar from './components/NavBar.vue';

export default {
    components: {
        Start,
        NavBar,
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

</style>
