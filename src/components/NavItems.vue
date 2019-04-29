<template>
  <ul class="mt-5">
    <!-- Looping out all data from menuLinks -->
    <li
      v-for="items in menuLinks"
      :key="items.id"
    >
      <!-- Condition for the tooltip -->
      <img
        v-if="!isActive"
        v-b-tooltip.hover.html.left="items.text"
        :src="items.url"
        :alt="items.alt"
      >
      <img
        v-else
        :src="items.url"
        :alt="items.alt"
      >

      <!-- Added two more classes to fix router-link styling -->
      <router-link
        class="anchorFix"
        :class="{navLable: !isActive, removeNavLable: isActive,}"
        :to="items.to"
      >
        {{ items.text }}
      </router-link>
    </li>
    <!-- Looping out all data from menuSort-->
    <li
      v-for="sortItems in menuSort"
      :key="sortItems.id"
    >
      <!-- Condition for the tooltip. -->
      <img
        v-if="!isActive"
        v-b-tooltip.hover.html.left="sortItems.text"
        :src="sortItems.url"
        :alt="sortItems.alt"
      >
      <img
        v-else
        :src="sortItems.url"
        :alt="sortItems.alt"
      >
      <div
        :class="{navLable: !isActive, removeNavLable: isActive}"
      >
        {{ sortItems.text }}
      </div>
    </li>
    <li v-if="isActive">
      <Search />
    </li>
  </ul>
</template>

<script>
import Search from './Search.vue';

export default {
    // Getting isActive props
    components: {
        Search,
    },
    props: {
        isActive: {
            type: Boolean,
        },
    },
    data() {
        return {
            menuLinks: [
                {
                    text: 'Home', to: '/', url: '/src/assets/icons/baseline-home.svg', alt: 'Home navigation icon',
                },
                {
                    text: 'Favorite', to: '/favorite', url: 'src/assets/icons/baseline-favorite-border.svg', alt: 'Favorite navigation icon',
                },
            ],
            menuSort: [
                {
                    text: 'Search', url: 'src/assets/icons/baseline-search.svg', alt: 'Search navigation icon',
                },
                {
                    text: 'Filter', url: 'src/assets/icons/filter-outline.svg', alt: 'Filter navigation icon',
                },
            ],
        };
    },

};

</script>

<style lang="scss">
        ul{
            padding: 0;
            margin:0;
            li{
                list-style-type: none;
                margin-top: 15px;
                overflow:hidden;
                 .navLable{
                    position: absolute;
                    visibility: hidden;
                }
                 .removeNavLable{
                    padding-left: 70px;
                    color:#000;
                }
                img{
                    margin: auto;
                    width: 35px;
                    margin-left: 7.5px;
                    float: left;
                }
                .anchorFix{
                    text-decoration: none;
                    display: block;
                         &:hover{
                            color:#7b7b7b;
                    }
                }
            }
        }
</style>
