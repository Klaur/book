<template>
  <div id="app">
    <el-container style="height:100%">
      <el-header style="background:red">Header</el-header>
      <el-container>
        <el-aside style="width:200px;">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
                <el-menu-item index="/booklist">图书列表</el-menu-item>
                <el-menu-item index="/bookgroup">图书分类</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="/bookList">
              <i class="el-icon-menu"></i>
              <span slot="title">图书列表</span>
            </el-menu-item>
            <el-menu-item index="/catogories">
              <i class="el-icon-document"></i>
              <span slot="title">图书分类</span>
            </el-menu-item>
            <el-menu-item index="/upload">
              <i class="el-icon-setting"></i>
              <span slot="title">上传组件</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="background:#eee">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  computed:{
  },
  data() {
    return {
      activeIndex: "/",
      search: ""
    };
  },
  mounted() {
  },
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
