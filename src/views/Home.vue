<template>
  <el-container style="height: 100vh">
    <el-header style="font-size: 14px">
      <div class="h_l">
        <span style="">系统系统系统系统</span>
      </div>
      <div class="h_r">
        <span>王小虎</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-left: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="logout()">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: rgb(241, 241, 241)">
        <el-menu
          :default-openeds="['1', '2']"
          :default-active="currentmenu"
          class="el-menu-vertical-demo"
          background-color="#DBDBDB"
          text-color="#000"
          active-text-color="#4169E1"
          router
          @select="menuClick"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>医废溯源</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/packageinfo" >医废信息表</el-menu-item>
              <el-menu-item index="/disposeinfo/1">医废处理流程</el-menu-item>
              <el-menu-item index="/map">转运车辆路径</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>医废统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/collects">收集统计</el-menu-item>
              <el-menu-item index="/disposels">处理统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/">
            <i class="el-icon-warning"></i>
            <span slot="title">医废重量异常</span>
          </el-menu-item>
          <el-menu-item index="/add">
            <i class="el-icon-info"></i>
            <span slot="title">添加数据接口</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          
          @tab-remove="removeTab"
          @tab-click="handlePanelClick"
        >
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closable"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: "/packageinfo",
      currentmenu: '/packageinfo',
      editableTabs: [
        {
          title: "信息表",
          name: "/packageinfo",
          closable: false
        },
      ],
      tabTitleMap: {
        "/packageinfo": "信息表",
        "/disposeinfo/1": "处理流程",
        "/map": "车辆路径",
        "/disposels": "处理统计",
        "/collects": "收集统计"
      }
    };
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("login");
      this.$message("成功注销");
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;  //添加
              this.$router.push(activeName)
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    handlePanelClick(tabInst) {
      // console.log(tabInst.name, this.$route.path);
      if(this.$route.path != tabInst.name){  
        this.$router.push(tabInst.name)
        this.currentmenu = tabInst.name
      }
    },
    menuClick(index) {
      const isTabsHas = this.editableTabs.some(item => item.name == index)
      if(!isTabsHas) {
        this.editableTabs.push({
          title: this.tabTitleMap[index],
          name: index,
          closable: true
        })
      }
      this.editableTabsValue = index
    },
  },
};
</script>
<style>
.el-header {
  background-color: rgb(94, 135, 176);
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background-color: rgb(219, 219, 219);
  color: #333;
  box-shadow: 0 0px 2px #888888;
  margin-right: 1px;
}

.el-main {
  background-color: rgb(241, 241, 241);
  margin: 0;
  padding: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
			border: none;
		}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: rgb(241, 241, 241);
    font-weight:bold;
    background-color: rgb(248, 248, 248);
    color: #333;
}

</style>