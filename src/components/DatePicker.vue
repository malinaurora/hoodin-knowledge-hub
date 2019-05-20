<template>
    <div class="datepicker">
        <v-date-picker
            v-model="chosenDate"
            :show-current="maxDate"
            :on="getDate(chosenDate)"
            no-title
            scrollable
            width="250px"
        />
    </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';

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
.v-picker__body {
    background-color: var(--dropdown-color) !important;
    -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696 !important;
    -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696 !important;
}
.v-btn__content {
    color: black !important;
}
@media (max-width: 767.98px) {
    .v-picker__body {
        width: 100% !important;
    }
}
</style>
