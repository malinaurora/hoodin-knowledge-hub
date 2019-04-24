<template>
  <nav
    :class="{toggleSidebar:isActive}"
  >
    <!-- When clicking the sidebar it will make the isActive true
     and change the DOM element class to toggled -->
    <div
      class="sidebar"
      :class="{toggleSidebar:isActive}"
      @click="toggleState"
    >
      <ul class="mt-5">
        <li
          v-for="(items, index) in menuItems"
          :key="index"
        >
          <img
            :src="items.url"
            :alt="items.alt"
          >
          <div :class="{navLable:notActive, removeNavLable:isActive}">
            {{ items.text }}
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            isActive: false,
            notActive: true,
            menuItems: [
                { text: 'Home', url: '/src/assets/icons/baseline-home.svg', alt: 'Home navigation icon' },
                { text: 'Favorite', url: 'src/assets/icons/baseline-favorite-border.svg', alt: 'Favorite navigation icon' },
                { text: 'Search', url: 'src/assets/icons/baseline-search.svg', alt: 'Search navigation icon' },
                { text: 'Filter', url: 'src/assets/icons/filter-outline.svg', alt: 'Filter navigation icon' },
            ],
        };
    },
    methods: {
        toggleState() {
            this.isActive = !this.isActive;
            this.notActive = !this.notActive;
        },
    },
};
</script>

<style lang="scss">
    .toggleSidebar{
        width:250px;
    }
    nav{
        float:left;
        height: 90%;
        bottom:0;
        top:0;
        width: 50px;
        .sidebar{
            top:0;
            background-color: #F6F6F6;
            box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
            bottom:0;
            width: 50px;
            position: fixed;
            transition: .4s;
        }
        .toggleSidebar{
            width:250px;
        }
        ul{
            padding: 0;
            margin:0;
            width:250px;
            li{
                margin-top: 15px;
                overflow:hidden;
                //Will not hover when element got the class "noHover"
                &:hover .navLable {
                    visibility: visible;
                }
                 .navLable{
                    position: absolute;
                    background-color: #000;
                    padding: 2px 6px;
                    margin-left:40px;
                    color:#fff;
                    font-size: 14px;
                    visibility: hidden;
                }
                 .removeNavLable{
                    margin-left: 25px;
                    display:inline;
                }
                img{
                    margin: auto;
                    width: 35px;
                    margin-left: 7.5px;
                    position: relative;

                }
            }
        }
    }
</style>
