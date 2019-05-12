<template>
    <div class="dropdown">
        <li v-for="source in sourcesArray" :key="source.id" class="dropdownItems">
            <input :id="source.id" v-model="checkedSources" type="checkbox" />
            <label :for="source.id">{{ source }}</label>
        </li>
    </div>
</template>

<script>
export default {
    props: {
        removedSource: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            sourcesArray: ['user', 'scraper', 'Facebook', 'twitter', 'instagram', 'youtube'],
            apiSources: [],
            checkedSources: [],
        };
    },
    watch: {
        checkedSources() {
            this.$emit('checkedSources', this.checkedSources);
        },
        removedSource(removedSource) {
            let index = 0;
            this.checkedSources.forEach(source => {
                if (source === removedSource) {
                    this.checkedSources.splice(index, 1);
                }
                index += 1;
            });
        },
    },
};
</script>

<style style lang="scss">
.dropdown {
    background-color: #e6e6e6;
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
        color: #000;
    }
}
</style>
