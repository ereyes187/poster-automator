import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/Home.vue";
import ContactView from "@/Contact.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/contact", component: ContactView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
