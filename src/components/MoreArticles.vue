<template>
    <div class="moreArticles">
        <a @click="loadData">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
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
    svg {
        border-radius: 4px;
        fill: var(--show-more-articles-svg);
        &:hover {
            box-sizing: border-box;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
        }
    }
}
</style>
