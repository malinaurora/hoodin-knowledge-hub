<template>
    <header>
        <img :src="'/src/assets/logo/' + jsonLogo.logo" class="rounded logo" alt="logo" />
    </header>
</template>

<script>
import config from '../config.json';

export default {
    name: 'Header',
    data() {
        return {
            jsonLogo: config,
        };
    },
};
</script>

<style lang="scss">
header {
    margin-top: 30px;
    text-align: center;
    .logo {
        width: 80%;
        max-width: 300px;
    }
}
@media (max-width: 767.98px) {
    header {
        margin-top: 70px;
    }
}
</style>
