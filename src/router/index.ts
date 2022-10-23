import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/class",
        meta:{
            isShow:true,
            title:"课程"
        },
        component:()=>import("../views/Class.vue")
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
