<template>
  <nav
    :class="{toggleSidebar:isActive}"
  >
    <!-- When clicking the aside it will make the isActive true
     and change the DOM class to toggled -->
    <div
      class="sidebar"
      :class="{toggleSidebar:isActive}"
      @click="toggleState"
    >
      <ul class="mt-5">
        <li>
          <img
            src="/src/images/baseline-home.svg"
            alt="Home navigation icon"
          >
          <div
            class="navLable"
            :class="{noHover:isActive}"
          >
            Home
          </div>
        </li>
        <li>
          <img
            src="/src/images/baseline-favorite-border.svg"
            alt="Favorite navigation icon"
          >
          <div
            class="navLable"
            :class="{noHover:isActive}"
          >
            Favorite
          </div>
        </li>
        <li>
          <img
            src="/src/images/baseline-search.svg"
            alt="Seach navigation icon"
          >
          <div
            class="navLable"
            :class="{noHover:isActive}"
          >
            Search
          </div>
        </li>
        <li>
          <img
            src="/src/images/filter-outline.svg"
            alt="Filter navigtion icon"
          >
          <div
            class="navLable"
            :class="{noHover:isActive}"
          >
            Filters
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
        };
    },
    methods: {
        toggleState() {
            this.isActive = !this.isActive;
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
        height: 100vh;
        width: 50px;
        .sidebar{
            background-color: #F6F6F6;
            box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
            height: 100vh;
            width: 50px;
            position: fixed;
        }
        .toggleSidebar{
            width:250px;
        }
        ul{
            padding: 0;
            margin:0;
            li{
                margin-top: 20px;
                //Will not hover when element got the class "noHover"
                &:hover .navLable:not(.noHover) {
                    visibility: visible;
                }
                 .navLable{
                    position: absolute;
                    background-color: #000;
                    padding: 2px 6px;
                    margin-left:40px;
                    color:#fff;
                    visibility: hidden;
                }
                img{
                    margin: auto;
                    width: 35px;
                    margin-left: 7.5px
                }
            }
        }
    }
</style>
