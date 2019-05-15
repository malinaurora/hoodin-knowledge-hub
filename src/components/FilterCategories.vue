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
            let index = 0;
            this.checkedCategories.forEach(category => {
                if (category === removedFilter) {
                    this.checkedCategories.splice(index, 1);
                }
                index += 1;
            });
        },
    },
    mounted() {
        fetch(
            'https://interns-test-channel.hoodin.com/api/v2/categories/media?token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9',
        )
            .then(response => response.json())
            .then(categories => {
                this.apiCategories = categories.data.items;
            });
    },
};
</script>

<style style lang="scss">
@import 'src/assets/styles/sass/_variables.scss';
.dropdown {
    background-color: $dropdown-color;
    -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    max-height: 180px;
    overflow: auto;
    width: 100%;
    .dropdownItems {
        margin-top: 5px;
        margin: 5px 0px 0px 30px;
    }
    input {
        float: right;
        margin: 5px 35px 0px 0px;
        width: 18px;
        height: 18px;
    }
    label {
        margin-bottom: 0rem;
        font-size: 18px;
    }
    li {
        color: $text-color;
    }
}
</style>
