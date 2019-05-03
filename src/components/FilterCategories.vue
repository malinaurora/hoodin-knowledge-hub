<template>
    <div>
        <div v-for="categories in apiCategories" :key="categories.id">
            <input
                :id="categories.id"
                v-model="checkedCategories"
                :value="categories.name"
                type="checkbox"
            />
            <label :for="categories.id">{{ categories.name }}</label>
        </div>
        <span>Checked : {{ checkedCategories }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            apiCategories: [],
            checkedCategories: [],
        };
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
    methods: {
        sendCheckedCategories() {
            this.$emit('checkedCategories', this.checkedCategories);
        },
    },
};
</script>

<style style lang="scss" scoped></style>
