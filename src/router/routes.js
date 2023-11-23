const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard.vue") },
      {
        path: "/policies",
        component: () => import("pages/InsurancePolicies.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/StartLayout.vue"),
    children: [
      { path: "/login", component: () => import("pages/Login.vue") },
      { path: "/register", component: () => import("pages/Register.vue") },
      {
        path: "/forgot_password",
        component: () => import("src/pages/ForgotPassword.vue"),
      },
      {
        path: "/reset_password/:token",
        component: () => import("src/pages/ResetPassword.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
