<template>
  <div>
    <h2>处理流程</h2>
    <h4>科室回收信息</h4>
    <el-table :data="data[0]" border style="width: 100%; max-width: 1000px">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="classification" label="分类" width="180">
      </el-table-column>
      <el-table-column prop="department" label="科室"> </el-table-column>
      <el-table-column prop="weight" label="重量-kg"> </el-table-column>
      <el-table-column prop="recycleTime" label="接收时间">
        <template slot-scope="scope">
          {{ scope.row.recycleTime | timeTransfer }}
        </template>
      </el-table-column>
    </el-table>
    <h4>暂存间期间信息</h4>
    <el-table :data="data[1]" border style="width: 100%; max-width: 1000px">
      <el-table-column prop="receiveTime" label="接收时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.receiveTime | timeTransfer }}
        </template>
      </el-table-column>
      <el-table-column prop="receiveWeight" label="接收时重量-kg" width="180">
      </el-table-column>
      <el-table-column prop="receiverId" label="接收人员"> </el-table-column>
      <el-table-column prop="outTime" label="运出时间">
        <template slot-scope="scope">
          {{ scope.row.outTime | timeTransfer }}
        </template>
      </el-table-column>
      <el-table-column prop="outWeight" label="运出时重量-kg">
      </el-table-column>
    </el-table>
    <h4>转运信息</h4>
    <el-table
      :data="transferrecord"
      border
      style="width: 100%; max-width: 500px"
    >
      <el-table-column prop="transferPersonId" label="转运人员" width="180">
      </el-table-column>
      <el-table-column prop="transferVehicleId" label="车辆牌号">
      </el-table-column>
      <!-- <el-table-column prop="trackPoints" label="Points"> </el-table-column> -->
      <el-table-column label="路径轨迹">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      transferrecord: [],
      request: [],
      id: "1",
      isShow2: 0,
      isShow3: 0,
    };
  },
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    this.init();
  },
  filters: {
    timeTransfer(time) {
      if (!time) return "暂未运出";
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
  methods: {
    async getDisposeInfo() {
      const result = await this.$http.get("disposeinfo");
      this.showed = result.data;
    },
    async init() {
      let requests = [
        this.$http.get(`packageInfo/${this.id}`),
        this.$http.get(`tempstorageinfo/${this.id}`),
        this.$http.get(`disposeinfo/${this.id}`),
      ];
      let results = await Promise.all(requests);
      this.data = results.map((item) => item.data);
      let record = await this.$http.get(`transferrecord/${this.data[0][0].transferRecordId}`);
      this.transferrecord = record.data;
    },
    handleClick() {
      // console.log(this.$parent.$parent.$children[0].$children[0].activeIndex);
      this.$parent.$parent.$children[0].$children[0].activeIndex = '/map'
      this.$router.push("/map");
    },
  },
};
</script>

<style>
</style>