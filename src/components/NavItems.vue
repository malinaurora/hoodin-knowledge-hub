<template>
    <ul>
        <!-- Looping out all data from menuLinks -->
        <li>
            <!-- Condition for the tooltip -->
            <router-link :to="home.to" class="navLink">
                <img :src="home.url" :alt="home.alt" @click="stayClosed()" />
                <div v-if="!isActive" class="tooltip">
                    <p>{{ $t('navitemHome') }}</p>
                    <div class="arrow-down" />
                </div>
            </router-link>
            <router-link
                class="anchorFix"
                :class="{ navLable: !isActive, removeNavLable: isActive }"
                :to="home.to"
            >
                {{ $t('navitemHome') }}
            </router-link>

            <!-- Added two more classes to fix router-link styling -->
        </li>
        <li>
            <router-link :to="favorites.to" class="navLink">
                <img :src="favorites.url" :alt="favorites.alt" @click="stayClosed()" />
                <div v-if="!isActive" class="tooltip">
                    <p>{{ $t('navitemFavorites') }}</p>
                    <div class="arrow-down" />
                </div>
            </router-link>
            <router-link
                class="anchorFix"
                :class="{ navLable: !isActive, removeNavLable: isActive }"
                :to="favorites.to"
            >
                {{ $t('navitemFavorites') }}
            </router-link>
        </li>
        <!-- Looping out all data from menuSort-->
        <li class="navLink">
            <img :src="searchImg.url" />
            <div v-if="!isActive" class="tooltip">
                <p>{{ $t('navitemSearchDotFree') }}</p>
                <div class="arrow-down" />
            </div>
            <div @click="stayClosed()">
                <Search
                    :style="{ display: isActive ? 'block' : 'none' }"
                    @search="search($event)"
                />
            </div>
        </li>
        <li class="navLink">
            <img :src="filtersImgAndText.url" />
            <div v-if="!isActive" class="tooltip">
                <p>{{ $t('navitemFilter') }}</p>
                <div class="arrow-down" />
            </div>
            <div @click="stayClosed()">
                <span v-if="isActive" class="removeNavLable animationFix" @click="toggle = !toggle">
                    {{ $t('navitemCategories') }}
                    <img v-if="!toggle" class="arrowFix" :src="arrowRight.url" />
                    <img v-else-if="toggle" class="arrowFix" :src="arrowDown.url" />
                </span>
                <FilterCategories
                    :removed-filter="removedFilter"
                    :style="{ display: isActive && toggle ? 'block' : 'none' }"
                    @checkedCategories="checkedCategories($event)"
                />
            </div>
        </li>
        <li @click="stayClosed()">
            <span
                v-if="isActive"
                class="removeNavLable animationFix"
                @click="toggleSources = !toggleSources"
            >
                {{ $t('navitemSources') }}
                <img v-if="!toggleSources" class="arrowFix" :src="arrowRight.url" />
                <img v-else-if="toggleSources" class="arrowFix" :src="arrowDown.url" />
            </span>
            <FilterSources
                :removed-filter="removedFilter"
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
                {{ $t('navitemDate') }}
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
        removedFilter: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            home: {
                to: '/',
                url: '/src/assets/icons/baseline-home.svg',
                alt: 'Home navigation icon',
            },
            favorites: {
                to: '/favorite',
                url: 'src/assets/icons/baseline-favorite-border.svg',
                alt: 'Favorite navigation icon',
            },
            searchImg: {
                url: 'src/assets/icons/baseline-search.svg',
                alt: 'Search navigation icon',
            },
            filtersImgAndText: {
                url: 'src/assets/icons/filter-outline.svg',
                alt: 'Filters navigation icon',
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
    margin-top: 50px;
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
            color: var(--text-color);
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
                color: var(--text-hover-color);
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
    .navLink {
        &:hover {
            .tooltip {
                opacity: 1;
                transition: 0.25s;
            }
        }
    }
    .tooltip {
        opacity: 0;
        position: absolute;
        left: 45px;
        background-color: black;
        border: 1px solid black;
        padding: 3px;
        border-radius: 3px;
        margin-top: 5px;

        p {
            max-width: 100%;
            font-size: 11px;
            margin: 0;
            color: white;
            overflow: visible;
            font-weight: normal;
            line-height: normal;
        }

        .arrow-down {
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;

            border-right: 5px solid black;
            position: absolute;
            left: -5px;
            top: 50%;
            transform: translate(0, -50%);
        }
    }
}
</style>
