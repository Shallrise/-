<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/vue.svg" class="logo"
          /></el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu default-active="1" class="el-menu-vertical-demo" router>
            <el-sub-menu index="1">
              <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>课程</span>
              </template>
              <el-menu-item :index="item.path"
              v-for="item in list"
              :key="item.path">{{item.meta.title}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const list = router.getRoutes().filter((v) => v.meta.isShow);
</script>

<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: #666;
  .logo {
    height: 80px;
  }
}
.el-aside {
  width: 200px;
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
