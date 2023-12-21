import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


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
    },
    {
      path: '/admin/modifier-mot-de-passe',
      name: 'modAdmin',
      component: () => import('../views/Admin/UserView/UserMDPView.vue'),
    },
    {
      path: '/admin/ajout-administrateur',
      name: 'ajoutAdmin',
      component: () => import('../views/Admin/UserView/UserAddView.vue'),
    },
    {
      path: '/admin/liste-administrateurs',
      name: 'ListAdmin',
      component: () => import('../views/Admin/UserView/UserListView.vue'),
    },
    {
      path: '/admin/suprimer-administrateur',
      name: 'SupAdmin',
      component: () => import('../views/Admin/UserView/UserSupView.vue'),
    },

    //routes pour l'enseignant******************************************************************
    
    {
      path: '/admin/liste-enseignants',
      name: 'ListEns',
      component: () => import('../views/Admin/TeacherView/TeacherListView.vue'),
    },
    {
      path: '/admin/suprimer-enseignant',
      name: 'SupEns',
      component: () => import('../views/Admin/TeacherView/TeacherSupView.vue'),
    },
    {
      path: '/admin/modifier-enseignant',
      name: 'modEns',
      component: () => import('../views/Admin/TeacherView/TeacherMDPView.vue'),
    },
    
    //routes pour l'élève******************************************************************
    
    {
      path: '/admin/liste-eleves',
      name: 'ListEle',
      component: () => import('../views/Admin/StudentView/StudentListView.vue'),
    },
    {
      path: '/admin/suprimer-eleve',
      name: 'SupEle',
      component: () => import('../views/Admin/StudentView/StudentSupView.vue'),
    },
    {
      path: '/admin/modifier-eleve',
      name: 'modEle',
      component: () => import('../views/Admin/StudentView/StudentMDPView.vue'),
    },

    //routes pour l'élève******************************************************************

    {
      path: '/admin/ajout-cours',
      name: 'ajoutcours',
      component: () => import('../views/Admin/CourseView/CourseAddView.vue'),
    },
    {
      path: '/admin/liste-cours',
      name: 'Listcours',
      component: () => import('../views/Admin/CourseView/CourseListView.vue'),
    },
    {
      path: '/admin/suprimer-cours',
      name: 'Supcours',
      component: () => import('../views/Admin/CourseView/CourseSupView.vue'),
    },
    {
      path: '/admin/modifier-cours',
      name: 'modcours',
      component: () => import('../views/Admin/CourseView/CourseModView.vue'),
    },

    /////////////////****************Routes /enseignant*******************//////////////////////

    {
      path: '/enseignant',
      name: 'Ens',
      component: () => import('../views/Teach/TeacherView.vue'),
    },
    {
      path: '/enseignant/ajouter-note',
      name: 'addNot',
      component: () => import('../views/Teach/NoteView/AddNoteView.vue'),
    },
    {
      path: '/enseignant/modifier-note',
      name: 'modNot',
      component: () => import('../views/Teach/NoteView/ModNoteView.vue'),
    },
    {
      path: '/enseignant/liste',
      name: 'list',
      component: () => import('../views/Teach/NoteView/ListView.vue'),
    },

    /////////////////****************Routes /eleve*******************//////////////////////

    {
      path: '/eleve',
      name: 'eleve',
      component: () => import('../views/Student/NotesView.vue'),
    },
    {
      path: '/eleve/notes',
      name: 'notes',
      component: () => import('../views/Student/ListView.vue'),
    },

    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFoundView.vue'),
    }
  ]
})


export default router
