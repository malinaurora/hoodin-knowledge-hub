<template>
    <div class="container filter mt-4">
        <div class="row">
            <div v-for="category of checkedCategoriesArray" :key="category.id" class="mt-2">
                <FilterLabel :category="category" @removeFilter="removeFilter($event)" />
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
}
</style>
