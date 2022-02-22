<template lang="">
  <div class="app">
    <div class="header">
      <div class="top-wrap ">
        <ul>
          <li @click="back"><img src="../../static/images/返回.png" alt=""></li>
          <li @click="forward"><img src="../../static/images/返回2.png" alt=""></li>
          <li @click="ref"><img src="../../static/images/刷新.png" alt=""></li>
        </ul>
      </div>
      <!-- <div class="back_ref" @click="back"> <img src="../../static/images/返回.png" alt=""></div>
      <div class="back_ref" @click="forward"> <img src="../../static/images/返回2.png" alt=""></div>
      <div class="back_ref" @click="ref"> <img src="../../static/images/刷新.png" alt=""></div> -->


      <!-- <div class="menu-circle"></div> -->
      <div class="header-menu">
        <!-- <router-link to="/" class="menu-link is-active">音乐</router-link> -->
        <router-link to="/" class="menu-link" active-class="is-active">音乐</router-link>
        <router-link to="/newmv" class="menu-link" active-class="is-active">MV</router-link>
        <router-link to="/radio" class="menu-link" active-class="is-active">电台</router-link>
        <!-- <a class="menu-link" href="#">电台</a> -->
        <router-link to="./wallpaper" class="menu-link notify" active-class="is-active">二次元</router-link>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="搜索" @keyup.enter='toResult' v-model='searchvalue'>
      </div>
      <div class="header-profile">
        <div class="notification">
          <span class="notification-number">3</span>
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-bell">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path
            d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
        </svg>
        <img class="profile-img" src="../../static/images/头像.jpg" alt="">
      </div>
    </div>
    <Main></Main>

    <div class="overlay-app"></div>

  </div>

</template>
<script>

  import Main from "./main.vue";
  export default {
    data() {
      return {
        //搜索框的内容
        searchvalue: "",
      };
    },
    methods: {
      //搜索框Result的内容
      toResult() {
        if (this.searchsong == "") {
          alert("内容不能为空");
        } else {
          // this.$router.push("./search?q=" + this.searchvalue);
          this.$router.push({ path: '/search', query: { keyworks: this.searchvalue } })
        }
      },
      forward() {
        this.$router.go(1);
      },
      ref() {
        this.$router.go(0);
      },
      back() {
        this.$router.back();
      }
    },
    components: {
      Main,
    },
  };
</script>
<style lang="">
  #app {
    max-width: 1500px;
    width: 100%;
  }


  .top-wrap{
    margin-right: 105px;
    
  }
  .top-wrap ul{
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
  .top-wrap ul li{
    list-style: none;
    margin: 0 10px;
    cursor: pointer;
    width: 16px;
    height:16px;
  }
</style>