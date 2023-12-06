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

    /////////////////****************Routes /admin*******************//////////////////////

    //Routes pour l'administrateur*************************************************************
    
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/AdminView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/modifier-mot-de-passe',
      name: 'modAdmin',
      component: () => import('../views/Admin/AdministrateurView/AdminMDPView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/ajout-administrateur',
      name: 'ajoutAdmin',
      component: () => import('../views/Admin/AdministrateurView/AdminAddView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/liste-administrateurs',
      name: 'ListAdmin',
      component: () => import('../views/Admin/AdministrateurView/AdminListView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/suprimer-administrateur',
      name: 'SupAdmin',
      component: () => import('../views/Admin/AdministrateurView/AdminSupView.vue'),
      beforeEnter: requireAuth 
    },

    //routes pour l'enseignant******************************************************************
    
    {
      path: '/admin/ajout-enseignant',
      name: 'ajoutEns',
      component: () => import('../views/Admin/TeacherView/TeacherAddView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/liste-enseignants',
      name: 'ListEns',
      component: () => import('../views/Admin/TeacherView/TeacherListView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/suprimer-enseignant',
      name: 'SupEns',
      component: () => import('../views/Admin/TeacherView/TeacherSupView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/modifier-enseignant',
      name: 'modEns',
      component: () => import('../views/Admin/TeacherView/TeacherMDPView.vue'),
      beforeEnter: requireAuth 
    },
    
    //routes pour l'élève******************************************************************
    
    {
      path: '/admin/ajout-eleve',
      name: 'ajoutEle',
      component: () => import('../views/Admin/StudentView/StudentAddView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/liste-eleves',
      name: 'ListEle',
      component: () => import('../views/Admin/StudentView/StudentListView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/suprimer-eleve',
      name: 'SupEle',
      component: () => import('../views/Admin/StudentView/StudentSupView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/admin/modifier-eleve',
      name: 'modEle',
      component: () => import('../views/Admin/StudentView/StudentMDPView.vue'),
      beforeEnter: requireAuth 
    },

    /////////////////****************Routes /enseignant*******************//////////////////////

    {
      path: '/enseignant',
      name: 'Ens',
      component: () => import('../views/Teach/TeacherView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/enseignant/ajouter-note',
      name: 'addNot',
      component: () => import('../views/Teach/NoteView/AddNoteView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/enseignant/modifier-note',
      name: 'modNot',
      component: () => import('../views/Teach/NoteView/ModNoteView.vue'),
      beforeEnter: requireAuth 
    },
    {
      path: '/enseignant/liste',
      name: 'list',
      component: () => import('../views/Teach/NoteView/ListView.vue'),
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
