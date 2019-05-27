<template>
    <div>
        <input v-model="search" :placeholder="$t('navitemSearch')" @input="sendSearch(search)" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            offset: 15,
        };
    },
    methods: {
        sendSearch(string) {
            if (string === '') {
                this.$emit('search', string, this.offset);
            } else {
                this.$emit('search', string);
            }
        },
    },
};
</script>

<style style lang="scss" scoped>
div {
    width: 250px;
}
input {
    width: 65%;
    margin-left: 15px;
    padding-left: 3px;
    height: 35px;
    background-color: white;
    border: 1px solid gray;
}
@media (max-width: 767.98px) {
    div {
        width: 100%;
    }
    input {
        width: 80%;
    }
}
</style>
