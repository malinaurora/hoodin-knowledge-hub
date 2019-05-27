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
            <svg
                v-if="isActive"
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                class="closeNavBarImage"
                @click="!toggleState"
            >
                <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <!-- Getting NavItems from component NavItems and sending isActive to NavItems-->
            <NavItems
                :removed-filter="removedFilter"
                :is-active="isActive"
                @close="toggleState($event)"
                @search="search($event)"
                @checkedCategories="checkedCategories($event)"
                @checkedSources="checkedSources($event)"
                @chosenStartDate="chosenStartDate($event)"
                @chosenEndDate="chosenEndDate($event)"
            />
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
    props: {
        removedFilter: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isActive: false,
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
        checkedCategories(checkedCategories) {
            this.$emit('checkedCategories', checkedCategories);
        },
        checkedSources(checkedSources) {
            this.$emit('checkedSources', checkedSources);
        },
        chosenStartDate(date) {
            this.$emit('chosenStartDate', date);
        },
        chosenEndDate(date) {
            this.$emit('chosenEndDate', date);
        },
    },
};
</script>

<style lang="scss">
.toggleSidebar {
    overflow: auto;
    width: 250px;
}
nav {
    float: left;
    height: 80%;
    width: 50px;
    top: 0;
    .sidebar {
        top: 0;
        background-color: var(--secondary-color);
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
        bottom: 0;
        left: 0;
        width: 50px;
        position: fixed;
        transition: 0.4s;
    }
    /* width */
    ::-webkit-scrollbar {
        width: 0px;
    }
    .toggleSidebar {
        width: 250px;
    }
    .closeNavBarImage {
        float: right;
        margin: 5px 2px 0px 0px;
        width: 35px;
        cursor: pointer;
        fill: var(--navbar-close-and-hamburger);
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
        height: 39px;
        z-index: 9999999;
        background-color: var(--secondary-color);
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
        .sidebar {
            width: 0px;
            transition: none;
        }
        .toggleSidebar {
            width: 100vw;
        }
        .responsiveMenu {
            display: block;
            margin: 10px;
            div {
                width: 33px;
                border-radius: 1.5px;
                height: 3px;
                background-color: var(--navbar-close-and-hamburger);
                margin: 5px 0;
            }
        }
        .removeResponsiveMenu {
            display: none;
        }
        .closeNavBarImage {
            margin: 0px;
            fill: var(--navbar-close-and-hamburger);
        }
    }
}
</style>
