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
    //Routes pour l'administrateur*************************************************************
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdministrateurView/AdminView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/modifier-mot-de-passe',
      name: 'modAdmin',
      component: () => import('../views/AdministrateurView/AdminMDPView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/ajout-administrateur',
      name: 'ajoutAdmin',
      component: () => import('../views/AdministrateurView/AdminAddView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/liste-administrateurs',
      name: 'ListAdmin',
      component: () => import('../views/AdministrateurView/AdminListView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/suprimer-administrateur',
      name: 'SupAdmin',
      component: () => import('../views/AdministrateurView/AdminSupView.vue'),
      beforeEnter: requireAuth 
    },
    //routes pour l'enseignant******************************************************************
    {
      path: '/admin/ajoutEns',
      name: 'ajoutEns',
      component: () => import('../views/enseignantView/AjouterEnseignantView.vue'),
      beforeEnter: requireAuth 
    },
    
    /*{
      path: '/Teacher',
      name: 'teacher',
      component: () => import('../views/TeacherView.vue'),
      beforeEnter: requireAuth // Appliquez la fonction de garde ici
    },*/
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFoundView.vue'),
    }
  ]
})


export default router
