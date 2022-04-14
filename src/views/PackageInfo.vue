<template>
  <div>
    <h2>包裹信息</h2>
    <el-table :data="show" border style="width: 100%; max-width: 1200px">
      <el-table-column prop="id" label="编号" width="180" sortable>
      </el-table-column>
      <el-table-column prop="classification" label="分类" width="180">
      </el-table-column>
      <el-table-column prop="department" label="科室"> </el-table-column>
      <el-table-column prop="weight" label="重量-kg"> </el-table-column>
      <el-table-column prop="recycleTime" label="接收时间" sortable>
        <template slot-scope="scope">
          {{ scope.row.recycleTime | timeTransfer }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small"
            >查看详细</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="packageInfo.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      packageInfo: [],
      show: []
    };
  },
  filters: {
    timeTransfer(time) {
      const ntime = new Date(
        new Date(+new Date(time) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "")
      );
      let year = ntime.getFullYear();
      let month = ntime.getMonth() + 1;
      let day = ntime.getDate();
      let hour = ntime.getHours();
      let minute = ntime.getMinutes();
      return "" + year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
  },
  created() {
    this.getPackageInfo();
  },
  methods: {
    async getPackageInfo() {
      const result = await this.$http.get("packageInfo");
      this.packageInfo = result.data;
      this.show = this.packageInfo.slice(0, 5)
    },
    handleClick(id) {
      this.$parent.$parent.$children[0].$children[0].activeIndex = '/disposeinfo/1'
      this.$router.push(`/disposeInfo/${id}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.show = this.packageInfo.slice(0, val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.show = this.packageInfo.slice((val-1)*5, val*5)
    },
  },
};
</script>

<style>
</style>