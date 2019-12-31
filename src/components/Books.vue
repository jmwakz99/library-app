<template>
   <v-container>
       <v-layout row wrap>
           <v-flex xs12>
               <v-card class="white mb-4" v-for=" book in books" :key="book.id">
                   <v-layout row>
                     <v-flex xs12 sm2 class="m-5 p-3">
                             <v-img
                             style="cursor:pointer"
                             @click="details(book.title)"
                             height="300px"
                            :src="book.imageUrl"
                            >
                            </v-img>
                      </v-flex>
                       <v-flex xs6 sm6 class="ml-4 pl-4 pt-3">
                         <div  class="red--text" title="dobleclick to edit">
                              {{book.title}}
                         </div>
                            <template>
                              <v-spacer></v-spacer>
                                <app-edit-book-dialog v-if="isUserAuthenticated"  :book="book"></app-edit-book-dialog>
                              </template>
                          <v-card-actions>
                               <v-btn text @click="details(book.title)">
                                   <v-icon left>mdi-arrow-right</v-icon>
                                   View Book
                                </v-btn>
                          </v-card-actions>
                             <v-spacer></v-spacer>
                             <v-flex xs12 class="mt-4 pt-3">
                                <v-btn v-if="isUserAuthenticated" :disabled="book.borrowerId !== null"  text class="black--text" @click="checkIfBorrowed(book)">Borrow This Book</v-btn>
                                <span></span>
                                </v-flex>
                            </v-flex>
                            <v-flex xs12>
                               <div class="text-center mt-3 ml-4" v-if="book.borrowerId !== null && isUserAuthenticated">
                              <v-badge
                                color="green"
                                left
                                
                              >
                                <template v-slot:badge>
                                  <v-icon>
                                    mdi-check
                                  </v-icon>
                                </template>
                                <span>Borrowed by userId: {{book.borrowerId}}</span>
                              </v-badge>
                            </div>

                            </v-flex>
                            
                    </v-layout>
               </v-card>
               </v-flex>
       </v-layout>
   </v-container>
</template>
<script>
export default {
  computed: {

    books () {
      return this.$store.getters.loadBooks
    }, 

    user () {
      return this.$store.getters.user
    },
    
    isUserAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
   
  },

  data () {
    return {

      title: ''

    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }

  },

  methods: {

     checkIfBorrowed(book) {
      this.$store.dispatch('isBookAvailable', book)
     
    },

   
    details(id) {
      this.$router.push('/books/' + id)

    }


    }
}

</script>
