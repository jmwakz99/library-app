import Vue from 'vue'
import App from './App.vue'
import * as firebase from "firebase/app"


import router from './router'

import store from './store'
import vuetify from './plugins/vuetify'
import Edit from './components/Edit.vue'
Vue.component('app-edit-book-dialog', Edit)


Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)

      }

    })


   

    this.$store.dispatch('loadedBooks')
  },

  render: h => h(App)

}).$mount('#app')
