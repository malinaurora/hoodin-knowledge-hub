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
      <!-- Getting NavItems from component NavItems and sending isActive to NavItems-->
      <NavItems :is-active="isActive" />
    </div>
  </nav>
</template>

<script>
import NavItems from './NavItems.vue';

export default {
    name: 'NavBar',
    components: {
        NavItems,
    },
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
            transition: .4s;
        }
        .toggleSidebar{
            width:250px;
        }
    }
</style>
