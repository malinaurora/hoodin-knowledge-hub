<template>
    <div class="text-center mt-4">
        <img :src="'/src/assets/logo/' + jsonLogo.logo" class="rounded logo" alt="logo" />
    </div>
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
.logo {
    width: 20%;
}
@media (max-width: 767.98px) {
    .logo {
        margin-top: 45px;
    }
}
</style>
