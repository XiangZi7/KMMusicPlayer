<template>
  <div id="app">
   <Backround></Backround>
    <Top></Top>
    <aplayer></aplayer>
  </div>
</template>

<script>
import Backround from './components/backround.vue';
import Top from './components/top.vue';
import aplayer from './components/aplayer.vue'
export default {
  name: 'App',
  components:{
    Top,
    Backround,
    aplayer
  },

}
</script>

<style>


</style>
