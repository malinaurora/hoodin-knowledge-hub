<template>
    <div class="moreArticles">
        <a @click="loadData">
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
.moreArticles {
    margin-bottom: 40px;
    width: 100%;
    align-content: center;
    display: flex;
    a {
        margin: auto;
        cursor: pointer;
    }
    img {
        border-radius: 4px;
        &:hover {
            box-sizing: border-box;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
        }
    }

    .icon {
        width: 35px;
        height: 35px;
    }
}
</style>
