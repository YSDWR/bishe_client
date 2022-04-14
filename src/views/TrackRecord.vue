<template>
  <div>
    <h2>路径信息</h2>
    <ul v-for="(item, index) in showed" :key="index">
      <li>{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showed: [],
    };
  },
  created() {
    this.getTrackRecord();
  },
  methods: {
    async getTrackRecord() {
      const result = await this.$http.get("trackrecord/001");
      this.showed = result.data;
      let arrStr = result.data[0].points;
      let arr = JSON.parse(arrStr);
      console.log(arr);
    },
  },
};
</script>

<style>
</style>