<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-layout row>
                        <v-flex xs12>
                        <v-card-title><span class="red--text ml-4">{{book.title}}</span>
                     
                        </v-card-title>
                    </v-flex>
                    </v-layout>
                    <v-img
                        class="white--text"
                        height="400px"
                        :src="book.imageUrl"
                        >
                    </v-img>
                    <div class="mt-3 ml-2">

                         Author of the book is <span class="primary--text">{{book.author}};</span>
                     </div>
                     <div class="mt-4 pb-4 ml-4 mb-3 green--text">
                         {{book.description}}
                     </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    book () {
      return this.$store.getters.loadBook(this.id)
    }

  },
  data () {
    return {
      title: null,
      author: null,
      description: null,
      imageUrl: null

    }
  }

}

</script>
