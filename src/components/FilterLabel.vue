<template>
    <div class="filterLabel" @click="removeFilter">
        <span class="filter">{{ filter }}</span>
        <div class="removeFilter">
            <div class="closeRight" />
            <div class="closeLeft" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        filter: {
            type: String,
            default: '',
        },
    },
    methods: {
        removeFilter() {
            this.$emit('removeFilter', this.filter);
        },
    },
};
</script>
<style lang="scss">
.filterLabel {
    padding: 7px 5px 7px 5px;
    margin: 0 5px 0 5px;
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
    .filter {
        display: inline-block;
        font-size: 15px;
        height: 12px;
        line-height: 12px;
        margin-right: 5px;
        margin-left: 5px;
    }
    .removeFilter {
        display: inline-block;
        margin-bottom: -2px;
        margin-right: 5px;
        height: 15px;
        width: 15px;
        position: relative;
        .closeRight {
            position: absolute;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            height: 1.5px;
            background-color: black;
            width: 15px;
            transform: rotate(45deg);
        }
        .closeLeft {
            position: absolute;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            height: 1.5px;
            background-color: black;
            width: 15px;
            transform: rotate(135deg);
        }
    }
}
</style>
