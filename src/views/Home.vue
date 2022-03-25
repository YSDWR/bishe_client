<template>
  <div>
    <h2>Home</h2>
    <button @click="getPackageInfo()">包裹初始信息</button>
    <button @click="getTempStorageInfo()">暂存间存储信息</button>
    <button @click="getTransferRecord()">转运信息</button>
    <button @click="getTrackRecord()">转运路径</button>
    <button @click="getDisposeInfo()">处理厂接受信息</button>
    <ul v-for="(item, index) in showed" :key="index">
      <li>{{item}}</li>
    </ul>
    <router-link to="map">MAP</router-link>
    <br>
    <!-- <router-link to="test">Test</router-link> -->
    <!-- <Map name="map"></Map> -->
  </div>
</template>
<script>
  // import Map from '../components/MapContainer.vue'
  export default {
    name: 'Home',
    components: {
      // Map
    },
    data() {
      return {
        showed: []
      }
    },
    created() {
      this.getPackageInfo()
    },
    methods: {
      async getPackageInfo() {
        const result = await this.$http.get('packageInfo')
        this.showed = result.data
      },
      async getTempStorageInfo() {
        const result = await this.$http.get('tempstorageinfo')
        this.showed = result.data
      },
      async getTransferRecord() {
        const result = await this.$http.get('transferrecord')
        this.showed = result.data
      },
      async getTrackRecord() {
        const result = await this.$http.get('trackrecord/001')
        this.showed = result.data
        let arrStr = (result.data)[0].points
        let arr = JSON.parse(arrStr)
        console.log(arr);
      },
      async getDisposeInfo() {
        const result = await this.$http.get('disposeinfo')
        this.showed = result.data
      },
    },
  }
</script>
<style scoped>

</style>