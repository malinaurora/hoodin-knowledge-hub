<template>
    <div class="filterLabel">
        <span>{{ category }}</span>
        <img
            src="/src/assets/icons/baseline-close-24px.svg"
            :alt="'unfilter category ' + category"
            @click="removeFilter"
        />
    </div>
</template>
<script>
export default {
    props: {
        category: {
            type: String,
            default: '',
        },
    },
    methods: {
        removeFilter() {
            this.$emit('removeFilter', this.category);
        },
    },
};
</script>
<style lang="scss">
.filterLabel {
    border: 1px solid black;
    border-radius: 3px;
    padding: 5px;
    margin: 0 5px 0 5px;
    cursor: pointer;
    span {
        margin: 5px;
    }
    img {
        float: right;
        width: 20px;
        margin-top: 2px;
    }
}
</style>
