import Vue from 'vue';
import VueI18n from 'vue-i18n';
import config from '../config.json';

Vue.use(VueI18n);

const messages = {
    sv: {
        navitemHome: 'Hem',
        navitemFavorites: 'Favoriter',
        navitemSearch: 'Sök...',
        navitemSearchDotFree: 'Sök',
        navitemFilter: 'Filtrering',
        navitemCategories: 'Kategorier',
        navitemSources: 'Källor',
        navitemDate: 'Datum',
        favoritText: 'Inga artiklar sparade i favoriter.',
        articlesfound: 'Kunde inte hitta några artiklar.',
        errormsg:
            'Något gick fel, försök gärna igen eller kontakta våran support om felet kvarstår.',
        likedmsg: 'Artiklar sparas endast på den här enheten.',
    },
    en: {
        navitemHome: 'Home',
        navitemFavorites: 'Favorite',
        navitemSearch: 'Search...',
        navitemSearchDotFree: 'Search',
        navitemFilter: 'Filters',
        navitemCategories: 'Categories',
        navitemSources: 'Sources',
        navitemDate: 'Date',
        favoritText: 'No articles saved to favorites.',
        articlesfound: 'No articles found.',
        errormsg:
            'Somthing went wrong, please try again or contact our support if the error continuous.',
        likedmsg: 'Favorites is only stored locally on this device.',
    },
};
const i18n = new VueI18n({
    locale: config.lang, // set locale
    messages, // set locale messages
});

export default i18n;
