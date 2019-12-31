<template>
<v-container>
    <form @submit.prevent="editBook">
        <v-layout row>
            <v-flex xs12>
                 <v-text-field
                    label="Borrower"
                    required
                    v-model="borrower"

                    >
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                 <v-layout align-center>
                    <v-flex xs12 >
                    <v-select
                      :items="books"
                      label="Select a Book"
                      v-model="title"
                      item-text="title"
                      required
                    ></v-select>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-btn class="red" type="submit">Borrow</v-btn>
            </v-flex>
       </v-layout>
     </form>
    </v-container> 
</template>
<script>
export default {

    computed: {

        books () {
            return this.$store.getters.loadBooks
        }
    },

    data() {
        return {
            borrowerName: '',
           

        }
    },


    methods: {
        editBook() {
            this.$store.dispatch('',)
            }
        }
  
}

     

    
        
</script>
