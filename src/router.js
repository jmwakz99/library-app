import Vue from 'vue'
import Router from 'vue-router'
import Books from '@/components/Books.vue'
import Addbook from '@/components/AddBook.vue'
import Borrow from '@/components/Borrow.vue'
import BookDetails from '@/components/BookDetails.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/book/new',
      name: 'AddBook',
      component: Addbook,
      beforeEnter: AuthGuard
    },
    {
      path: '/books/borrow',
      name: 'Borrow',
      component: Borrow
    },
    {
      path: '/books/:id',
      name: 'BookDetails',
      props: true,
      component: BookDetails
    }

  ]
})
