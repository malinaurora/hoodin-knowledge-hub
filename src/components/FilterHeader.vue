<template>
    <div class="container filter">
        <div class="row">
            <div v-for="category of checkedCategoriesArray" :key="category.id" class="test">
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
    .test {
        margin-left: 15px;
        transition: opacity 2s linear;
    }
    h2 {
        margin-left: 15px;
    }
}
</style>
