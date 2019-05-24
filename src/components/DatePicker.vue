<template>
    <div class="datePicker">
        From:
        <input
            v-model="chosenStartDate"
            type="date"
            :max="maxDate"
            :on="getStartDate(chosenStartDate)"
        />
        To:
        <input v-model="chosenEndDate" type="date" :max="maxDate" :on="getEndDate(chosenEndDate)" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            chosenStartDate: '',
            chosenEndDate: '',
            maxDate: '',
        };
    },
    mounted() {
        this.maxDate = new Date().toLocaleDateString();
    },
    methods: {
        getStartDate(chosenStartDate) {
            let unixTimestamp = +new Date(chosenStartDate);
            unixTimestamp /= 1000;

            if (Number.isNaN(unixTimestamp)) {
                this.$emit('chosenStartDate');
            } else {
                this.$emit('chosenStartDate', unixTimestamp.toString());
            }
        },
        getEndDate(chosenEndDate) {
            let unixTimestamp = +new Date(chosenEndDate);
            unixTimestamp /= 1000;
            unixTimestamp += 86400;

            if (Number.isNaN(unixTimestamp)) {
                this.$emit('chosenEndDate');
            } else {
                this.$emit('chosenEndDate', unixTimestamp.toString());
            }
        },
    },
};
</script>
<style lang="scss">
.datepicker {
    background-color: #e6e6e6;
    -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    overflow: hidden;
    width: 100%;
    input {
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 30px;
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
