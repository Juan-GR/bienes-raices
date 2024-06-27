import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useFirebaseAuth } from 'vuefire';
import { onAuthStateChanged } from 'firebase/auth';

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'propiedades',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: 'nueva',
          name: 'admin-new-property',
          component: () => import('../views/admin/NewPropertyView.vue')
        },
        {
          path: 'editar/:id',
          name: 'admin-edit-property',
          component: () => import('../views/admin/EditPropertyView.vue')
        }
      ]
    }
  ]
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth) {
      authenticateUser()
          .then(() => next())
          .catch(() => next({ name: 'login' }));
  } else {
    next();
  }
})

function authenticateUser () {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve();
      } else {
        reject();
      }
    })
  })
}

export default router
