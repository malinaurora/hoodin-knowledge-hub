<template>
    <div v-if="show === true" class="modal">
        <div class="modal_content">
            <img
                class="closeBtn"
                src="/src/assets/icons/baseline-close-24px.svg"
                alt="closeModal"
                @click="closeShare()"
            />
            <div class="urlContent">
                <p>Link to article</p>
                <input id="myCopy" type="text" class="urlPlacholder" :value="url" />
            </div>
            <button class="copyBtn" Copy < button/@click="copyText()">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Share',
    data() {
        return {
            url: '',
            show: true,
        };
    },
    mounted() {
        // Takes the url from the browser.
        this.url = window.location.href;
    },
    methods: {
        closeShare() {
            this.show = !this.show;
            this.$emit('close', this.show);
        },
        // Copy text from the input field.
        copyText() {
            const copy = document.getElementById('myCopy');
            copy.select();
            document.execCommand('copy');
        },
    },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto+Slab:300,400');
.modal {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.modal_content {
    max-width: 85%;
    height: 70%;
    .closeBtn {
        position: absolute;
        right: 5px;
        width: 40px;
        cursor: pointer;
        transform: scale(0.8);
        transition: 0.2s;
        &:hover {
            transform: scale(1);
        }
    }
    .urlContent {
        padding-top: 80px;
        padding-left: 60px;
        .urlPlacholder {
            box-shadow: 0 0 2px;
            width: 85%;
            &:focus {
                outline: none;
            }
        }
    }
    .copyBtn {
        width: 70px;
        border-radius: 10px;
        margin-top: 30px;
        margin-left: 60px;
        p {
            font-family: 'Roboto Slab';
            line-height: 25px;
            font-weight: 100;
        }
    }
}
</style>
