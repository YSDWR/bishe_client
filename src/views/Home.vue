<template>
  <div>
    <h2>Home</h2>
    <button @click="getPackageInfo()">包裹初始信息</button>
    <button @click="getTempStorageInfo()">暂存间存储信息</button>
    <button @click="getTransferRecord()">转运信息</button>
    <button @click="getTrackRecord()">转运路径</button>
    <button @click="getDisposeInfo()">处理厂接受信息</button>
    <button @click="wsTest()">ws in Get</button>
    <ul v-for="(item, index) in showed" :key="index">
      <li>{{item}}</li>
    </ul>
    <router-link to="map">MAP</router-link>
    <br>
    <input type="text" v-model="input">
    <button @click="websocketSend()">wsSend</button>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    components: {
      // Map
    },
    data() {
      return {
        showed: [],
        socket: null,
        path: 'ws://localhost:3001',
        input: '',
      }
    },
    created() {
      this.getPackageInfo()
      this.websocketInit()
      // setTimeout(()=> {
      //   this.websocketSend()
      // }, 1000)
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
      websocketInit() {
        if (typeof (WebSocket) === 'undefined') {
          alert('你的浏览器不支持websocket')
        } else {
          this.socket = new WebSocket(this.path)
          this.socket.onopen = () => {
            console.log('Connection open ...')
            this.socket.send("Hello WebSockets!")
          }
          this.socket.onmessage = (e) => {
            console.log(e.data);
          }
        }
      },
      websocketSend() {
        // console.log(this.input);
        this.socket.send(this.input)
      },
      wsTest() {
        this.$http.get('/')
      }
    },
  }
</script>
<style scoped>

</style>