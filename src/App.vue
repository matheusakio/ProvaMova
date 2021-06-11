<template>
 <v-app>
    <Header/>
    <router-view :key="$route.fullPath"></router-view>
 </v-app>
</template>

<script>

import Header from './components/Header/Header';

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
  }),
  methods: {

  },
};
</script>
<style lang='scss' scoped>


</style>