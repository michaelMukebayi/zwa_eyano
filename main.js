import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueOnlinePlugin from 'vue-navigator-online'
import { ToastPlugin } from 'bootstrap-vue'
import { SidebarPlugin } from 'bootstrap-vue'
// import VueImgLazyload from 'vue-lazyload-images'
import UniqueId from 'vue-unique-id';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(SidebarPlugin)
Vue.use(ToastPlugin)

Vue.use(VueOnlinePlugin)
// Vue.directive('imglazyload', VueImgLazyload)
Vue.use(UniqueId);

Vue.use(VueRouter)

Vue.config.productionTip = false;

import Resultat from './components/Resultat.vue'
import Accueil from './components/Accueil.vue'
// Vue.component('Resultat',require('./components/Resultat.vue').default);

const routes = [

    {
      path:'/',
      component:Accueil
    },
    {
      path: '/Resultat',
      name : 'Resultat',
      component:Resultat
    },
    {
      path: '*',
      redirect : '/'
    }

];

const router = new VueRouter({mode:'history',routes});

new Vue({
  render: h => h(App),
  router : router,
}).$mount('#app')
