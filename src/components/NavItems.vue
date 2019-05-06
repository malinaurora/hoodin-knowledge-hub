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
            <span v-if="isActive" @click="toggle = !toggle">{{ filtersImgAndText.text }}</span>
            <img v-if="!isActive" v-b-tooltip.hover.left="'Filters'" :src="filtersImgAndText.url" />
            <img v-else :src="filtersImgAndText.url" />
            <FilterCategories
                v-if="toggle"
                :style="{ display: isActive ? 'block' : 'none' }"
                :removed-category="removedCategory"
                @checkedCategories="checkedCategories($event)"
            />
        </li>
        <li>heeej</li>
    </ul>
</template>

<script>
import Search from './Search.vue';
import FilterCategories from './FilterCategories.vue';

export default {
    // Getting isActive props
    components: {
        Search,
        FilterCategories,
    },
    props: {
        isActive: {
            type: Boolean,
        },
        removedCategory: {
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
            close: true,
            toggle: false,
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
    },
};
</script>

<style lang="scss">
ul {
    padding: 0;
    margin: 0;
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
            padding-left: 15px;
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
