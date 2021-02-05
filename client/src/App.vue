<template>
  <div id="app">
    <Navbar/>
    <router-view class="container" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
<style>
</style>
