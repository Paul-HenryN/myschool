
import type { NavigationGuard, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

const requireAuth: NavigationGuard = (to, from, next) => {
  const token = localStorage.getItem('token');

  if (!token) {
    next({ name: 'login' });
  } else {
    next();
  }
};

export default requireAuth;