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
        <main class="container">
            <router-view
                :search-string="searchString"
                :checked-categories-array="checkedCategoriesArray"
                :checked-sources-array="checkedSourcesArray"
                :unix-timestamp="unixTimestamp"
            />
        </main>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';
import FilterHeader from './components/FilterHeader.vue';
import config from './config.json';

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
body {
    font-family: var(--body-font);
    background-color: var(--primary-color);
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
