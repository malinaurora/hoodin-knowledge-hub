module.exports = {
    getData(queryStrings) {
        let queryString = '';
        Object.keys(queryStrings).forEach(key => {
            queryString += `&${key}=${queryStrings[key]}`;
        });
        fetch(
            `https://interns-test-channel.hoodin.com/api/v2/items?${queryString}&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
        )
            .then(response => response.json())
            .then(data => {
                this.apiData = data.data.items;
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
        fetch(
            `https://interns-test-channel.hoodin.com/api/v2/items?${apiQueryString}&token=eyJpdiI6IktJMXkwWllPdzJCSzl2RE9RMmNqQ3c9PSIsInZhbHVlIjoiQ3VQQXVOV1wvVEJidmhRR1lcL0pSUE5XUmdzdE1TK2J1VlZ6TUNwYWk1enlmaERYbzR2TlJ6enZCNUI2K2l6ejVlWlFWZFQ3NDhsY1crMzl5NHlLRzN3dz09IiwibWFjIjoiMjkxYzBjY2JkMDliNmY0YjVmY2E3NGI4NTVlMTZlNDYxMWUxZGY1NTk3ZGI4MzJkZjY2NWUwMGZmM2ExYjlhNiJ9`,
        )
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

        this.getData(this.queryString);

        this.queryString.offset = 0;
    },

    getCategories(categories) {
        document.body.scrollTop = 0;
        let categoryString = '';
        categories.forEach(category => {
            categoryString += `${category},`;
        });
        this.queryString.mediaCategories = categoryString;

        this.getData(this.queryString);

        this.queryString.offset = 0;
    },

    getSources(sources) {
        document.body.scrollTop = 0;
        let sourceString = '';
        sources.forEach(source => {
            sourceString += `${source.toLowerCase()},`;
        });
        this.queryString.sources = sourceString.slice(0, sourceString.length - 1);

        this.getData(this.queryString);

        this.queryString.offset = 0;
    },

    getDate(date) {
        document.body.scrollTop = 0;
        this.queryString.ondate = date;
        this.getData(this.queryString);
        this.queryString.offset = 0;
    },
};
