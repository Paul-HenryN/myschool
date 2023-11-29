import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import requireAuth from '../auth/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      beforeEnter: requireAuth // Appliquez la fonction de garde ici
    },
    {
      path: '/admin/ajoutEns',
      name: 'ajoutEns',
      component: () => import('../views/enseignantView/AjouterEnseignantView.vue'),
      beforeEnter: requireAuth // Appliquez la fonction de garde ici
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFoundView.vue'),
    }
  ]
})


export default router
