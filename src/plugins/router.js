import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/Home/Home.vue'
import Países from "@/pages/Países/Países.vue";

Vue.use(Router);

export default new Router({
  mode: "history", 
  base: process.env.BASE_URL, 
  routes: [
    {
      path: "/", 
      name: "Home", 
      component: Home ,
    },
    {
      path: "/Paises",
      name: "Paises",
      component: Países,
    },
  ]
});