<template>
  <div id="app">
        <div class="search">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <nav>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="/">首页</el-menu-item>
            <!-- <el-submenu index="2">
                            <template slot="title">我的工作台</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu> -->
            <el-menu-item index="2" disabled>玄幻奇幻</el-menu-item>
            <el-menu-item index="3" disabled>武侠仙侠</el-menu-item>
          </el-menu>
        </nav>
        <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/",
      search: ""
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
</style>
