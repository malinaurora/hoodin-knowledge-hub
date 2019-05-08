<template>
    <div class="datePicker">
        <input
            id="start"
            v-model="chosenDate"
            type="date"
            :max="maxDate"
            :on="getDate(chosenDate)"
        />
    </div>
</template>
<script>
export default {
    data() {
        return {
            chosenDate: '',
            maxDate: '',
            test: {},
        };
    },
    mounted() {
        this.maxDate = new Date().toLocaleDateString();
    },
    methods: {
        getDate(chosenDate) {
            let unixTimestamp = +new Date(chosenDate);
            unixTimestamp /= 1000;
            if (Number.isNaN(unixTimestamp)) {
                this.$emit('chosenDate');
            } else {
                this.$emit('chosenDate', unixTimestamp.toString());
            }
        },
    },
};
</script>
<style lang="scss">
.datePicker {
    margin-left: 7.5px;
}
</style>
