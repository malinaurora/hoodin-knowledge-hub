<template>
    <div class="container filter mt-4">
        <h2 v-if="checkedCategoriesArray.length > 0" class="mt-4 row">Filter on Category</h2>
        <div class="row">
            <div v-for="category of checkedCategoriesArray" :key="category.id" class="mt-2">
                <FilterLabel :filter="category" @removeFilter="removeFilter($event)" />
            </div>
        </div>
        <h2 v-if="checkedSourcesArray.length > 0" class="mt-4 row">Filter on Sources</h2>
        <div class="row">
            <div v-for="source of checkedSourcesArray" :key="source.id" class="mt-2">
                <FilterLabel :filter="source" @removeFilter="removeFilter($event)" />
            </div>
        </div>
    </div>
</template>
<script>
import FilterLabel from './FilterLabel.vue';

export default {
    components: {
        FilterLabel,
    },
    props: {
        checkedCategoriesArray: {
            type: Array,
            default: Array,
        },
        checkedSourcesArray: {
            type: Array,
            default: Array,
        },
    },
    methods: {
        removeFilter(category) {
            this.$emit('removeFilter', category);
        },
    },
};
</script>
<style lang="scss">
.filter {
    .row {
        padding: 0px 15px 0px 15px;
    }
    .FilterLabel {
        &:hover {
            box-sizing: border-box;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
            color: #7b7b7b;
        }
    }
}
</style>
