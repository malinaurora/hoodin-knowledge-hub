<template>
    <div class="datePicker">
        <input v-model="chosenDate" type="date" :max="maxDate" :on="getDate(chosenDate)" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            chosenDate: '',
            maxDate: '',
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
.datepicker {
    width: 250px;
    input {
        width: 65%;
        margin-left: 15px;
        padding-left: 3px;
        height: 35px;
        border: 0.5px solid lightgray;
        font-size: 18px;
    }
}
::-webkit-inner-spin-button {
    display: none;
}
::-webkit-calendar-picker-indicator {
    padding: 5px;
    margin-right: 3px;
}
@media (max-width: 767.98px) {
    .datepicker {
        width: 100%;
        input {
            width: 80%;
        }
    }
}
</style>
