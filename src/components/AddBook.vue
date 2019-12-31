<template>

    <v-container>
        <h1 class="text-center red--text">Add Book</h1>
    <v-form ref="form" @submit.prevent="addBook">
        <v-layout row>
          <v-flex xs12 sm6 offset-3>
                <v-text-field
                label="Title"
                :rules="inputRules"
                v-model="title"
                >
              </v-text-field>
              </v-flex>
            <v-flex xs12 sm6 offset-3>
                <v-text-field
                label="Author"
                :rules="inputRules"
                v-model="author"
                >
                </v-text-field>
                </v-flex>
            <v-flex xs12 sm6 offset-3>
                <v-text-field
                label="ImageUrl"
                :rules="inputRules"
                v-model="imageUrl"
                >
                </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 offset-3>
                <v-textarea
                label="Description"
                :rules="inputRules"
                v-model="description"
                >
                </v-textarea>
                </v-flex>
            <v-flex xs12 sm6 offset-3>
               <img :src="imageUrl">
            </v-flex>
            <v-flex xs12 sm6 offset-3>
                <v-btn large class="red" type="button"  @click="addBook">Submit</v-btn>
                <v-spacer></v-spacer>
            </v-flex>
          </v-layout>
      </v-form>
    </v-container>
</template>

<script>

export default {

  computed: {
    books () {
      return this.$store.getters.loadBooks
    }
  },

  data () {
    return {
      title: '',
      author: '',
      imageUrl: '',
      editing: false,
      borrowed: false,
      description: '',
      inputRules: [
        v => v.length >= 3 || 'Minimum length is 3 characters'

      ]

    }
  },


  methods: {
    addBook () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addBook', {title: this.title, 
        author: this.author, 
        imageUrl: this.imageUrl, 
        description: this.description, 
        editing: this.editing, 
        borrowed: this.borrowed})
        }
      return this.$router.push('/')
    }
    }

}
</script>
