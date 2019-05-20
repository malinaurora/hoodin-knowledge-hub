<template>
    <div id="app">
        <Header />
        <NavBar
            :removed-filter="removedFilter"
            :removed-source="removedSource"
            @search="search($event)"
            @checkedCategories="checkedCategories($event)"
            @checkedSources="checkedSources($event)"
            @chosenDate="chosenDate($event)"
        />
        <FilterHeader
            :checked-categories-array="checkedCategoriesArray"
            :checked-sources-array="checkedSourcesArray"
            @removeFilter="removeFilter($event)"
        />
        <div>
            <main class="container">
                <router-view
                    :search-string="searchString"
                    :checked-categories-array="checkedCategoriesArray"
                    :checked-sources-array="checkedSourcesArray"
                    :unix-timestamp="unixTimestamp"
                />
            </main>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';
import FilterHeader from './components/FilterHeader.vue';
import config from './config.json';
import language from './language.json';

export default {
    components: {
        Header,
        NavBar,
        FilterHeader,
    },
    data() {
        return {
            json: config,
            searchString: '',
            checkedCategoriesArray: [],
            checkedSourcesArray: [],
            removedFilter: '',
            removedSource: '',
            unixTimestamp: '',
        };
    },
    created() {
        if (localStorage.id === undefined) {
            localStorage.id = '[]';
        }
        this.stylingFromJson();
    },
    methods: {
        search(searchString) {
            this.searchString = searchString;
        },
        checkedCategories(checkedCategories) {
            this.checkedCategoriesArray = checkedCategories;
        },
        checkedSources(checkedSources) {
            this.checkedSourcesArray = checkedSources;
        },
        removeFilter(filter) {
            this.removedFilter = filter;
        },
        chosenDate(date) {
            this.unixTimestamp = date;
        },
        stylingFromJson() {
            const jsonStyle = this.json.styling;
            Object.keys(jsonStyle).forEach(key => {
                document.documentElement.style.setProperty(key, jsonStyle[key]);
            });
        },
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto+Slab|Roboto:300,400');

*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    font-family: var(--body-font);
    background-color: var(--primary-color);
    margin: 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

@media screen and (max-width: 1300px) {
    .container {
        max-width: 850px;
    }
}

@media screen and (max-width: 765px) {
    .container {
        max-width: 500px;
    }
}

.row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.column {
    box-sizing: border-box;
    margin-bottom: 30px;
    margin-left: 15px;
    margin-right: 15px;
    width: calc(33.333% - 30px);
}

@media screen and (max-width: 1300px) {
    .column {
        width: calc(50% - 30px);
    }
}

@media screen and (max-width: 765px) {
    .column {
        width: calc(100% - 30px);
    }
}

input {
    font-family: var(--filter-box-font);
    font-size: 1em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: var(--heading-font);
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    letter-spacing: -0.05em;
}
h1 {
    font-size: 2em;
}
h2 {
    font-size: 1.5em;
}
h3 {
    font-size: 1.3em;
}
h4 {
    font-size: 1em;
}
h5 {
    font-size: 0.8em;
}
h6 {
    font-size: 0.7em;
}
nav {
    font-size: 1.3em;
}
p {
    line-height: 25px;
    font-weight: 100;
    font-size: 18px;
}
b {
    line-height: 25px;
}
footer {
    font-weight: normal;
    line-height: normal;
}
.filter {
    font-family: var(--filter-box-font);
}
</style>
