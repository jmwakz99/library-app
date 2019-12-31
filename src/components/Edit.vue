<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn fab accent v-on="on">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
       <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title>Edit Book</v-card-title> 
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-form ref="form" @submit.prevent="submit">
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-text>
                         <v-text-field
                          label="Title"
                          :rules="inputRules"
                          v-model="book.title"
                         >
                         </v-text-field>
                        <v-text-field
                          label="Author"
                          :rules="inputRules"
                           v-model="book.author"
                        >
                       </v-text-field>
                        <v-text-field
                          label="Image Url"
                          v-model="book.imageUrl"
                        >
                        </v-text-field>
                        <v-text-field
                          label="Borrower Id"
                          :rules="inputRules"
                           v-model="book.borrowerId"
                        >
                        </v-text-field>
                        <v-textarea
                        label="Description"
                        :rules="inputRules"
                        v-model="book.description"
                        ></v-textarea>
                       </v-card-text>
                       </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                   <v-spacer></v-spacer>
                     <v-card-actions>
                    <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="red darken-1"  type="submit" text @click="submit(book)">Submit</v-btn>
                  </v-card-actions>
                  </v-flex>
                  </v-layout>
              </v-form>
          </v-container>
     </v-card>
    </v-dialog>
</template>

<script>
  export default {

    props: ['book'],
    
    data () {
       return {
          dialog: false,
          inputRules: [
              v => v.length >= 3 || 'Minimum length is 3 characters',

             ],
        }
      },
   
     methods: {
      submit(book) {
        this.$store.dispatch('editedBook', book)
        this.dialog = false
             
       
      }
    }
  }
</script>

