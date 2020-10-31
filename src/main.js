import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Create from "./pages/Create.vue";
import Home from "./pages/Home.vue";
import List from "./pages/List.vue";
import { createApp } from "vue";

const routes = [
  { path: "/", component: Home },
  { path: "/list", component: List },
  { path: "/create", component: Create },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

console.log(router);

const app = createApp(App);
app.use(router);
app.mount("#app");
