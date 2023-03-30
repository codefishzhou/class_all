<template>
  <div class="w-full">
    <schoolHead></schoolHead>
    <div class="container mx-auto grid-cols-6 grid gap-2 pointer mt-10">
      <div
        class=""
        v-for="menu in menuDataList"
        :key="menu.name"
        @click="changeTab(menu)"
      >
        {{ menu.title.slice(0, 10) }}
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepAliveList['iframe'] || []">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <div
      v-show="!$route.name"
      v-loading="appLoading"
      element-loading-text="加载页面中, 请稍后..."
    >
      <div
        v-for="item in tabsList"
        v-show="item.appName === activeTab.appName"
        :key="item.appName"
        :id="item.id"
      ></div>
    </div>
  </div>
</template>

<script>
import tabs from "./tabs.vue";
import { menuDataList } from "@/menuData/index.js";
import schoolHead from "./header.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    tabs,
    schoolHead,
  },
  data() {
    return {
      menuDataList,
    };
  },
  computed: {
    ...mapGetters({
      keepAliveList: "tabs/keepAliveList",
      activeTab: "tabs/activeTab",
      tabsList: "tabs/tabsList",
      appLoading: "tabs/appLoading",
    }),
  },
  setup() {},
  methods: {
    changeTab(item) {
      console.log(item);
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="scss" sopced>
.layout-box {
  height: 100%;
  width: 100%;
}
.layout-main {
  height: calc(100% - 64px);
  width: 100%;
}
.el-header {
  padding-left: 0 !important;
  height: 64px !important;
  background: #393d49;
  .logo {
    color: #fff;
    padding-left: 54px;
    background-size: 54px 54px;
    line-height: 64px;
    height: 64px;
    font-size: 20px;
    font-weight: 400;
  }
  .el-dropdown {
    cursor: pointer;
    margin-right: 6px;
    color: #fff;
    line-height: 64px;
    font-size: 16px;
    height: 64px;
    .el-icon {
      vertical-align: middle;
      font-size: 16px;
      margin-right: 5px;
    }
  }
}

.el-main {
  padding-top: 0 !important;
  position: relative;
}
</style>
