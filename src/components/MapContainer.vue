<template>
    <div class="home_div">
        <div class="map_title">
            <h3>JSAPI Vue2地图组件示例</h3>
        </div>
        <div id="container"></div>
    </div>
</template>
<script>
    import AMapLoader from '@amap/amap-jsapi-loader';

    export default {
        name: "Mapview",
        data() {
            return {
                map: null,
                polyline: null,
                passedPolyline: null,
                marker: null,
                lineArr:[[118.716201,30.908126],[118.719479,30.907173],
                        [118.721565,30.906561],[118.725197,30.909686],
                        [118.749262,30.930478],[118.750217,30.930653]]
            }
        },
        created() {

        },
        mounted() {
            this.initAMap();
        },
        methods: {

            initAMap() {
                AMapLoader.load({
                    key: 'f1c624710ca5e04f8431d0855e0138b9',  //设置您的key
                    version: "2.0",
                    plugins: ['AMap.ToolBar', 'AMap.Driving'],
                    AMapUI: {
                        version: "1.1",
                        plugins: [],

                    },
                    Loca: {
                        version: "2.0"
                    },
                }).then((AMap) => {
                    this.map = new AMap.Map("container", {
                        viewMode: "3D",
                        zoom: 5,
                        zooms: [2, 22],
                        center: [118.716201,30.908126],
                    });
                    this.polyline = new AMap.Polyline({
                        map: this.map,
                        path: this.lineArr,
                        showDir: true,
                        strokeColor: "#28F",  //线颜色
                        // strokeOpacity: 1,     //线透明度
                        strokeWeight: 6,      //线宽
                        // strokeStyle: "solid"  //线样式
                    });
                    this.marker = new AMap.Marker({
                        map: this.map,
                        position: [118.716201,30.908126],
                        icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                        offset: new AMap.Pixel(-13, -26),
                    });
                    this.passedPolyline = new AMap.Polyline({
                        map: this.map,
                        strokeColor: "#AF5",  //线颜色
                        strokeWeight: 6,      //线宽
                    });
                    this.marker.on('moving', function (e) {
                        this.passedPolyline.setPath(e.passedPath);
                        this.map.setCenter(e.target.getPosition(), true)
                    });

                    this.map.setFitView();
                }).catch(e => {
                    console.log(e);
                })
            },

        }
    }
</script>
<style scoped>
    .home_div {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        position: relative;
    }

    #container {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .map_title {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 50px;
        background-color: rgba(27, 25, 27, 0.884);

    }

    h3 {
        position: absolute;
        left: 10px;
        z-index: 2;
        color: white;
    }
</style>