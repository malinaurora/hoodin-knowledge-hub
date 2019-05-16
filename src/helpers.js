const config = require('./config.json');

module.exports = {
    getData(queryStrings) {
        let queryString = '';
        Object.keys(queryStrings).forEach(key => {
            queryString += `&${key}=${queryStrings[key]}`;
        });
        fetch(`https://${config.baseRoute}/api/v2/items?${queryString}&token=${config.token}`)
            .then(response => response.json())
            .then(data => {
                this.apiData = data.data.items;
                if (data.data.items.length >= this.queryString.limit) {
                    this.moreArticlesToLoad = true;
                }
            })
            .catch(err => {
                console.error(err);
                this.error = true;
            });
    },

    showMoreData(queryStrings) {
        this.queryString.offset += this.queryString.limit;
        let apiQueryString = '';
        Object.keys(queryStrings).forEach(key => {
            apiQueryString += `&${key}=${queryStrings[key]}`;
        });
        fetch(`https://${config.baseRoute}/api/v2/items?${apiQueryString}&token=${config.token}`)
            .then(response => response.json())
            .then(data => {
                this.apiData = this.apiData.concat(data.data.items);
                if (data.data.items.length < this.queryString.limit) {
                    this.moreArticlesToLoad = false;
                }
            })
            .catch(err => {
                console.error(err);
                this.errorMsg = err;
            });
    },

    getSearchString() {
        document.body.scrollTop = 0;
        this.queryString.searchString = this.searchString;
        this.queryString.offset = 0;

        this.getData(this.queryString);
    },

    getCategories(categories) {
        document.body.scrollTop = 0;
        let categoryString = '';
        categories.forEach(category => {
            categoryString += `${category},`;
        });
        this.queryString.mediaCategories = categoryString;
        this.queryString.offset = 0;

        this.getData(this.queryString);
    },

    getSources(sources) {
        document.body.scrollTop = 0;
        let sourceString = '';
        sources.forEach(source => {
            sourceString += `${source.toLowerCase()},`;
        });
        this.queryString.sources = sourceString.slice(0, sourceString.length - 1);
        this.queryString.offset = 0;

        this.getData(this.queryString);
    },

    getDate(date) {
        document.body.scrollTop = 0;
        this.queryString.ondate = date;
        this.queryString.offset = 0;
        this.getData(this.queryString);
    },
};
