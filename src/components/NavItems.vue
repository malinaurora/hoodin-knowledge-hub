<template>
    <ul class="mt-5">
        <!-- Looping out all data from menuLinks -->
        <li v-for="items in menuLinks" :key="items.id">
            <!-- Condition for the tooltip -->
            <router-link :to="items.to">
                <img
                    v-if="!isActive"
                    v-b-tooltip.hover.html.left="items.text"
                    :src="items.url"
                    :alt="items.alt"
                    @click="stayClosed()"
                />

                <img v-else :src="items.url" :alt="items.alt" />
            </router-link>

            <!-- Added two more classes to fix router-link styling -->
            <router-link
                class="anchorFix"
                :class="{ navLable: !isActive, removeNavLable: isActive }"
                :to="items.to"
            >
                {{ items.text }}
            </router-link>
        </li>
        <!-- Looping out all data from menuSort-->
        <li @click="stayClosed()">
            <img v-if="!isActive" v-b-tooltip.hover.left="'Search'" :src="searchImg.url" />
            <img v-else :src="searchImg.url" />
            <Search :style="{ display: isActive ? 'block' : 'none' }" @search="search($event)" />
        </li>
        <li @click="stayClosed()">
            <img v-if="!isActive" v-b-tooltip.hover.left="'Filters'" :src="filtersImgAndText.url" />
            <img v-else :src="filtersImgAndText.url" />
            <span v-if="isActive" class="removeNavLable animationFix" @click="toggle = !toggle">
                {{ filtersImgAndText.text }}
                <img v-if="!toggle" class="arrowFix" :src="arrowRight.url" />
                <img v-else-if="toggle" class="arrowFix" :src="arrowDown.url" />
            </span>
            <FilterCategories
                :removed-category="removedCategory"
                :style="{ display: isActive && toggle ? 'block' : 'none' }"
                @checkedCategories="checkedCategories($event)"
            />
        </li>
        <li @click="stayClosed()">
            <span
                v-if="isActive"
                class="removeNavLable animationFix"
                @click="toggleSources = !toggleSources"
            >
                Sources
                <img v-if="!toggleSources" class="arrowFix" :src="arrowRight.url" />
                <img v-else-if="toggleSources" class="arrowFix" :src="arrowDown.url" />
            </span>
            <FilterSources
                :removed-source="removedSource"
                :style="{ display: isActive && toggleSources ? 'block' : 'none' }"
                @checkedSources="checkedSources($event)"
            />
        </li>
        <li @click="stayClosed()">
            <span
                v-if="isActive"
                class="removeNavLable animationFix"
                @click="toggleDate = !toggleDate"
            >
                Date
                <img v-if="!toggleDate" class="arrowFix" :src="arrowRight.url" />
                <img v-else-if="toggleDate" class="arrowFix" :src="arrowDown.url" />
            </span>
            <DatePicker
                :style="{ display: isActive && toggleDate ? 'block' : 'none' }"
                @click="stayClosed()"
                @chosenDate="chosenDate($event)"
            />
        </li>
    </ul>
</template>

<script>
import Search from './Search.vue';
import FilterCategories from './FilterCategories.vue';
import FilterSources from './FilterSources.vue';
import DatePicker from './DatePicker.vue';

export default {
    // Getting isActive props
    components: {
        Search,
        FilterCategories,
        FilterSources,
        DatePicker,
    },
    props: {
        isActive: {
            type: Boolean,
        },
        removedCategory: {
            type: String,
            default: '',
        },
        removedSource: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            menuLinks: [
                {
                    text: 'Home',
                    to: '/',
                    url: '/src/assets/icons/baseline-home.svg',
                    alt: 'Home navigation icon',
                },
                {
                    text: 'Favorite',
                    to: '/favorite',
                    url: 'src/assets/icons/baseline-favorite-border.svg',
                    alt: 'Favorite navigation icon',
                },
            ],
            searchImg: {
                url: 'src/assets/icons/baseline-search.svg',
                alt: 'Search navigation icon',
            },
            filtersImgAndText: {
                url: 'src/assets/icons/filter-outline.svg',
                alt: 'Filters navigation icon',
                text: 'Categories',
            },
            filterSourceText: {
                text: 'Sources',
            },
            arrowRight: {
                url: 'src/assets/icons/baseline-keyboard_arrow_right.svg',
            },
            arrowDown: {
                url: 'src/assets/icons/baseline-arrow.svg',
            },
            close: true,
            toggle: false,
            toggleDate: false,
            toggleSources: false,
        };
    },
    methods: {
        stayClosed() {
            this.$emit('close', this.close);
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
        chosenDate(date) {
            this.$emit('chosenDate', date);
        },
    },
};
</script>

<style lang="scss">
ul {
    padding: 0;
    margin: 0;
    .animationFix {
        width: 250px;
    }
    li {
        list-style-type: none;
        margin-top: 15px;
        overflow: hidden;
        .navLable {
            position: absolute;
            visibility: hidden;
        }
        .removeNavLable {
            padding-left: 60px;
            color: #000;
        }
        img {
            margin: auto;
            width: 35px;
            margin-left: 7.5px;
            float: left;
        }
        .anchorFix {
            text-decoration: none;
            display: block;
            &:hover {
                color: #7b7b7b;
            }
        }
        span {
            display: block;
            cursor: pointer;
        }
        .arrowFix {
            float: right;
            margin: 4px 20px 0px 0px;
            width: 26px;
        }
        .slide-enter-active {
            -moz-transition-duration: 0.1s;
            -webkit-transition-duration: 0.1s;
            -o-transition-duration: 0.1s;
            transition-duration: 0.1s;
            -moz-transition-timing-function: ease-in;
            -webkit-transition-timing-function: ease-in;
            -o-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
        }

        .slide-leave-active {
            -moz-transition-duration: 0.1s;
            -webkit-transition-duration: 0.1s;
            -o-transition-duration: 0.1s;
            transition-duration: 0.1s;
            -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
            -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
            -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
            transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        }

        .slide-enter-to,
        .slide-leave {
            max-height: 100px;
            overflow: hidden;
        }

        .slide-enter,
        .slide-leave-to {
            overflow: hidden;
            max-height: 0;
        }
    }
    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #e6e6e6;
        border-radius: 5px;
        -moz-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
        -webkit-box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
        box-shadow: inset 0 -5px 5px -5px #969696, inset 0 5px 5px -5px #969696;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>
