<template>
  <a-layout class="navi">
    <a-layout-header class="header">
      <router-link to="/">
        <div class="logo" />
      </router-link>
      <a-menu
        class="header-menu"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="list">
          <router-link to="/list">列表</router-link>
        </a-menu-item>
        <a-menu-item key="create">
          <router-link to="/create">新增</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content class="content">
      <router-view> </router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { Layout, Menu } from "ant-design-vue";
import { router } from "./main";

export default {
  name: "App",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    AMenu: Menu,
    AMenuItem: Menu.Item,
  },
  computed: {
    selectedKeys() {
      const routeName = router.resolve(window.location).name;
      return [routeName];
    },
  },
};
</script>

<style scoped>
.navi {
  --headerHeight: calc(var(--l) * 4);
}

.ant-layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;

  position: fixed;
  z-index: 1;
  width: 100%;

  background-color: var(--white);
}

.logo {
  width: calc(var(--l) * 3);
  height: calc(var(--l) * 3);
  background-size: contain;
  background-image: url("./assets/logo.jpg");
  border-radius: 50%;
  float: left;
  margin-right: calc(var(--l) * 2);
}

.header-menu {
  line-height: var(--headerHeight);
}

.content {
  margin-top: var(--headerHeight);
  padding: var(--xl);
}
</style>
