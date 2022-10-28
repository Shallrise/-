import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/class",
        meta: {
          isShow: true,
          title: "课程管理",
        },
        component: () => import("../views/Class.vue"),
      },
      {
        path: "/chapter",
        meta: {
          isShow: true,
          title: "章节管理",
        },
        component: () => import("../views/Chapter.vue"),
      },
      {
        path:"/teacher",
        meta:{
          show:true,
          title:"讲师管理"
        },
        component:() => import("../views/Teacher.vue")
      },
      {
        path:"/grade",
        meta:{
          show:true,
          title:"课程管理"
        },
        component:() =>import("../views/Grades.vue")
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
