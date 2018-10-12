import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/page/bookList'
import Catogories from '@/page/catogories'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/bookList',
    },
    {
      path: '/bookList',
      name: 'bookList',
      component: BookList
    },
    {
      path: '/catogories',
      name: 'catogories',
      component: Catogories
    }
  ]
})
