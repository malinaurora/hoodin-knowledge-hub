<template>
    <nav :class="{ toggleSidebar: isActive }">
        <div
            class="responsiveMenu"
            :class="{ removeResponsiveMenu: isActive }"
            @click="toggleState"
        >
            <div />
            <div />
            <div />
        </div>

        <!-- When clicking the sidebar it will make the isActive true
     and change the DOM element class to toggled -->
        <div class="sidebar" :class="{ toggleSidebar: isActive }" @click="toggleState">
            <img v-if="isActive" class="closeNavBarImage" :src="closeImg" @click="!toggleState" />
            <!-- Getting NavItems from component NavItems and sending isActive to NavItems-->
            <NavItems :is-active="isActive" @close="toggleState($event)" @search="search($event)" />
        </div>
    </nav>
</template>

<script>
import NavItems from './NavItems.vue';

export default {
    name: 'NavBar',
    components: {
        NavItems,
    },
    data() {
        return {
            isActive: false,
            closeImg: 'src/assets/icons/baseline-close.svg',
            menuImg: 'src/assets/icons/baseline-menu.svg',
        };
    },
    methods: {
        toggleState(stayClosed) {
            if (stayClosed !== false) {
                this.isActive = !this.isActive;
            }
        },
        search(searchString) {
            this.$emit('search', searchString);
        },
    },
};
</script>

<style lang="scss">
.toggleSidebar {
    width: 250px;
}
nav {
    float: left;
    height: 90%;
    bottom: 0;
    top: 0;
    width: 50px;
    .sidebar {
        top: 0;
        background-color: #f6f6f6;
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
        bottom: 0;
        width: 50px;
        position: fixed;
        transition: 0.4s;
    }
    .toggleSidebar {
        width: 250px;
    }
    .closeNavBarImage {
        float: right;
        margin: 5px 2px 0px 0px;
        width: 35px;
        cursor: pointer;
    }
    .responsiveMenu {
        display: none;
    }
}
@media (max-width: 767.98px) {
    .toggleSidebar {
        width: 100vw;
        height: 100vh;
    }
    nav {
        position: fixed;
        width: 100vw;
        height: 40px;
        z-index: 9999999;
        background-color: #f6f6f6;
        box-shadow: 2px 2px #f6f6f6;
        .sidebar {
            width: 0px;
            transition: none;
        }
        .toggleSidebar {
            width: 100vw;
        }
        .responsiveMenu {
            display: block;
            margin: 5px;
            div {
                width: 35px;
                height: 4px;
                border-radius: 3px;
                background-color: #000;
                margin: 6px 0;
            }
        }
        .removeResponsiveMenu {
            display: none;
        }
        .closeNavBarImage {
            width: 45px;
            margin: 0px;
        }
    }
}
</style>
