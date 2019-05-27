<template>
    <div class="loader"></div>
</template>
<style lang="scss" scoped>
.loader {
    border: 5px solid #f3f3f3;
    border-top: 5px solid var(--navbar-svg);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
    transform: translateY(-50%) translateX(-50%);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
