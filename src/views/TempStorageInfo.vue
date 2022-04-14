<template>
  <div>
    <h2>暂存信息</h2>
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
    this.getTempStorageInfo();
  },
  methods: {
    async getTempStorageInfo() {
        const result = await this.$http.get('tempstorageinfo')
        this.showed = result.data
      },
  }
};
</script>

<style>
</style>