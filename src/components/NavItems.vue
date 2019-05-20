<template>
    <ul>
        <!-- Looping out all data from menuLinks -->
        <li>
            <!-- Condition for the tooltip -->
            <router-link :to="home.to" class="navLink">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35  "
                    viewBox="0 0 24 24"
                    @click="stayClosed()"
                >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    @click="stayClosed()"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                    />
                </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="35"
                height="35"
                viewBox="0 0 24 24"
            >
                <path
                    d="M15,19.88C15.04,20.18 14.94,20.5 14.71,20.71C14.32,21.1 13.69,21.1 13.3,20.71L9.29,16.7C9.06,16.47 8.96,16.16 9,15.87V10.75L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L15,10.75V19.88M7.04,5L11,10.06V15.58L13,17.58V10.05L16.96,5H7.04Z"
                />
            </svg>
            <div v-if="!isActive" class="tooltip">
                <p>{{ $t('navitemFilter') }}</p>
                <div class="arrow-down" />
            </div>
            <div @click="stayClosed()">
                <span v-if="isActive" class="removeNavLable animationFix" @click="toggle = !toggle">
                    {{ $t('navitemCategories') }}
                    <svg
                        v-if="!toggle"
                        class="arrowFix"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                        <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
                    <svg
                        v-else
                        class="arrowFix"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                    >
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
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
                <svg
                    v-if="!toggleSources"
                    class="arrowFix"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
                <svg
                    v-else
                    class="arrowFix"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
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
                <svg
                    v-if="!toggleDate"
                    class="arrowFix"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
                <svg
                    v-else
                    class="arrowFix"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
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
            },
            favorites: {
                to: '/favorite',
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
        svg {
            margin: auto;
            margin-left: 7.5px;
            float: left;
            fill: var(--navbar-svg);
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

            &:hover {
                color: var(--text-hover-color);
            }
        }
        .arrowFix {
            float: right;
            margin: 4px 20px 0px 0px;
            fill: var(--text-color);
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
