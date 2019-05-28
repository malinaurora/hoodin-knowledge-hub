<template>
    <div class="dropdown">
        <li v-for="categories in apiCategories" :key="categories.id" class="dropdownItems">
            <input
                :id="categories.id"
                v-model="checkedCategories"
                :value="categories.name"
                type="checkbox"
            />
            <label :for="categories.id">{{ categories.name }}</label>
        </li>
    </div>
</template>

<script>
import config from '../config.json';

export default {
    props: {
        removedFilter: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            apiCategories: [],
            checkedCategories: [],
        };
    },
    watch: {
        checkedCategories() {
            this.$emit('checkedCategories', this.checkedCategories);
        },
        removedFilter(removedFilter) {
            this.checkedCategories.forEach(category => {
                if (category === removedFilter) {
                    this.checkedCategories.splice(this.checkedCategories.indexOf(category), 1);
                }
            });
        },
    },
    mounted() {
        fetch(`https://${config.baseRoute}/api/v2/categories/media?token=${config.token}`)
            .then(response => response.json())
            .then(categories => {
                this.apiCategories = categories.data.items;
            });
    },
};
</script>

<style style lang="scss">
.dropdown {
    background-color: var(--dropdown-color);
    -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    max-height: 180px;
    overflow: auto;
    width: 100%;
    .dropdownItems {
        margin-top: 5px;
        margin: 5px 0px 0px 30px;
        position: relative;
    }
    input {
        float: right;
        margin: 5px 35px 0px 0px;
        width: 18px;
        height: 18px;
        position: absolute;
        top: 0px;
        right: 0px;
    }
    label {
        margin-bottom: 0rem;
        font-size: 18px;
        display: block;
        cursor: pointer;
        user-select: none;
    }
    li {
        color: var(--text-color);
    }
}
</style>
