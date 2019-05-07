<template>
    <div class="text-center col-12 mb-4">
        <a class="load-more-btn btn" role="button" aria-disabled="true" @click="loadData">
            <img class="icon" src="/src/assets/icons/baseline-arrow.svg" alt="load more" />
        </a>
    </div>
</template>

<script>
export default {
    methods: {
        loadData() {
            this.$emit('showMore');
        },
    },
};
</script>

<style lang="scss">
.load-more-btn {
    background: rgb(255, 255, 255);
    &:hover {
        box-sizing: border-box;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
    }
}

.icon {
    width: 35px;
    height: 35px;
}
</style>
