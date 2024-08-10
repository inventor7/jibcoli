import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import DefaultLayout from "@/layouts/AnonymousLayout.vue";
import AuthLayout from "@/layouts/Authenticated.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/welcome",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        name: "Welcome",
        path: "",
        component: () =>
          import("@/modules/anonymous/welcome/views/welcome.vue"),
      },
    ],
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        name: "Login",
        path: "/auth/login",
        component: () => import("@/modules/anonymous/auth/views/Login.vue"),
      },
      {
        name: "Register",
        path: "/auth/register",
        component: () => import("@/modules/anonymous/auth/views/Register.vue"),
      },
      {
        path: "",
        name: "Home",
        component: () => import("@/modules/authenticated/home/views/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// guard
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const isAuthenticated = false;

//   if (requiresAuth && !isAuthenticated) {
//     next({ name: "welcome" });
//   } else {
//     next();
//   }
// });

export default router;
