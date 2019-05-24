<template>
    <div class="datePicker">
        start
        <input
            v-model="chosenStartDate"
            type="date"
            :max="maxDate"
            :on="getStartDate(chosenStartDate)"
        />
        end
        <input v-model="chosenEndDate" type="date" :max="maxDate" :on="getEndDate(chosenEndDate)" />
    <div class="datepicker">
        <v-date-picker
            v-model="chosenDate"
            :show-current="maxDate"
            :on="getDate(chosenDate)"
            :max="maxDate"
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
.v-picker__body {
    background-color: var(--dropdown-color) !important;
    -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696 !important;
    -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696 !important;
}
.v-btn__content {
    color: black !important;
}

.v-btn--flat {
    &:focus {
        outline: 0;
    }
}

.v-btn--active {
    background-color: grey;

    &:focus {
        outline: 0;
    }
}
.v-btn--disabled {
    .v-btn__content {
        color: rgb(156, 156, 156) !important;
    }
}

@media (max-width: 767.98px) {
    .v-picker__body {
        width: 100% !important;
    }
}
</style>
