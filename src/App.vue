<template>
 <v-app>
      <div>
        <v-toolbar class="red white--text">
          <v-toolbar-title @click="home" style="cursor:pointer">Library</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn text to="/book/new" class="white--text">Add Book</v-btn>
            <v-btn  text to="/login" class="white--text">Login</v-btn>
            <v-btn  text  v-if="isUserAuthenticated" class="white--text" @click="signOut">Logout</v-btn>
            <v-btn text to="/register" class="white--text">Register</v-btn>


          </v-toolbar-items>
        </v-toolbar>
   </div>
   <v-content>
     <router-view></router-view>
   </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
    home () {
      return this.$router.push('/')
    },
    signOut() {
      
      this.$store.dispatch('logout')
     
    }
  },
  computed: {
    isUserAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }

  }
}
</script>
