import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import HomeView from '../views/Home/index.vue'
import ProductView from '../views/Product/index.vue'
import NewProduct from "@/views/Product/NewProduct.vue";
import EditProduct from "@/views/Product/EditProduct.vue";
import NotFound from "@/views/404"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: HomeView
      },
      {
        path: '/new',
        name: 'NewProduct',
        component: NewProduct
      },
      {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductView
      },
      {
        path: '/edit/:id',
        name: 'EditProduct',
        component: EditProduct
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
