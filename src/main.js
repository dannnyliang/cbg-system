import "./styles/index.css";

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Create from "./pages/Create.vue";
import Home from "./pages/Home.vue";
import Item from "./pages/Item.vue";
import List from "./pages/List.vue";
import constantPlguin from "./plugins/constantPlguin";
import { createApp } from "vue";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "list", path: "/list", component: List },
  { name: "create", path: "/create", component: Create },
  { name: "item", path: "/item/:id", component: Item },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(constantPlguin);
app.mount("#app");
