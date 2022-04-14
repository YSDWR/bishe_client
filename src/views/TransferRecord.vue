<template>
  <div>
    <h2>转运信息</h2>
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
    this.getTransferRecord();
  },
  methods: {
   async getTransferRecord() {
        const result = await this.$http.get('transferrecord')
        this.showed = result.data
      },
  }
};
</script>

<style>
</style>