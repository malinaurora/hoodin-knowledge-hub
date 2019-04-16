<template>
  <nav>
    <div class="sidebar">
      <ul class="mt-5">
        <li>
          <img
            src="/src/images/baseline-home.svg"
            alt="Navigation icon home"
          >
          <div>Home</div>
        </li>
        <li>
          <img
            src="/src/images/baseline-favorite-border.svg"
            alt="Navigation icon home"
          >
          <div>Favorite</div>
        </li>
        <li>
          <img
            src="/src/images/baseline-search.svg"
            alt="Navigation icon home"
          >
          <div>Search</div>
        </li>
        <li>
          <img
            src="/src/images/filter-outline.svg"
            alt="Navigation icon home"
          >
          <div>Filters</div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style lang="scss">
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
        ul{
            padding: 0;
            margin:0;
            li{
                margin-top: 20px;
                &:hover div{
                    visibility: visible;
                }
                 div{
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
