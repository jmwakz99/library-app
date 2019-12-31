import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase'
import * as firebase from "firebase/app"


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    books: [],
    user: null
  },

  mutations: {
    setBooks (state, payload) {
      state.books = payload
    },

    setUser (state, payload) {
      state.user = payload
    }, 

    editBook (state, payload) {
      const updateObj = {}
       if (payload.title) {
         updateObj.title = payload.title
       }
       if (payload.author) {
        updateObj.author = payload.author
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl
      }
    },

    addBook(state, payload) {
      state.books.push(payload)
    },

    borrowedBook(state, payload) {
      state.books.forEach(kitabu => {
        if (kitabu.title === payload.title) {
             kitabu = payload 
            }
          })
        }
      },


  actions: {
    async loadedBooks ({ commit , getters}, payload) {
      const vitabu = []
      await db.collection('books').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'id': doc.id,
              'title': doc.data().title,
              'imageUrl': doc.data().imageUrl,
              'author': doc.data().author,
              'description': doc.data().description,
              'borrowerId': doc.data().borrowerId,
              }
              vitabu.push(data)
              commit('setBooks', vitabu)
            })
        }).catch(err => {
          console.log(err)
        })
      },

    async addBook({commit, getters}, payload) {
       const newBook = {
        title: payload.title,
        imageUrl: payload.imageUrl,
        editing: payload.editing,
        borrowed: payload.borrowed,
        description: payload.description,
        author: payload.author,
        borrowerId: null,
      }
      await db.collection('books').add(newBook)
      commit('addBook', newBook)
      },
    async signUserUp ({ commit }, payload) {
      await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          let newUser = {
            id: user.user.user.uid,
            borrowedBooks: []
          }
         commit('setUser', newUser)
        })
        .catch(err => {
          console.log(err)
        })
    },

    async signUserIn({commit}, payload) {
      await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
       .then(
         user => {
          const newUser = {
            id: user.user.uid,
            borrowedBooks: []
          }
          commit('setUser', newUser)
        }).catch( err => {
          console.log(err)
       })
  
     },

     autoSignIn({commit}, payload) {
       commit('setUser', {id:payload.uid, borrowedBooks:{}})
      },

     async logout ({commit}) {
       commit('setUser', null)
      await firebase.auth().signOut()
      alert('You have successifully logged out!!')

     },

     async isBookAvailable({commit, getters}, payload) {
       await db.collection('books').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().borrowerId === null && doc.data().title === payload.title) {
              doc.ref.update({
                borrowerId: getters.user.id
              })
            }
            commit('borrowedBook', doc.data())
         
           })
          }).catch(err => {
          console.log(err)
          })
        },
      
     async editedBook({commit}, payload) {
       const updateObj = {}
       if (payload.title) {
         updateObj.title = payload.title
       }
       if (payload.author) {
        updateObj.author = payload.author
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl
      }
     await db.collection('books').doc(`${payload.id}`).update(updateObj)
       .then(() => {
         commit('editBook', updateObj)

       }).catch(err => {
         
       })
       }
      },


  getters: {
    loadBooks (state) {
      return state.books
    },

    loadBook (state) {
      return (bookId) => {
        return state.books.find((book) => {
          return book.title === bookId
        })
      }
    },

    user (state) {
      return state.user
    },

    userInfo(state) {
      return (userEmail) => {
        return state.user.find((person) => {
          return person.email === userEmail
        })
      }
    }

  }

})
