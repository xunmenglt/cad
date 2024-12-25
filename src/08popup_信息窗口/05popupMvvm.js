const { message } = antd; // 第三方库用于消息提示
window.onload = async () => {
    const env = {
        serviceUrl: "https://vjmap.com/server/api/v1",
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MiwiVXNlcm5hbWUiOiJhZG1pbjEiLCJOaWNrTmFtZSI6ImFkbWluMSIsIkF1dGhvcml0eUlkIjoiYWRtaW4iLCJCdWZmZXJUaW1lIjo4NjQwMCwiZXhwIjo0ODEzMjY3NjM3LCJpc3MiOiJ2am1hcCIsIm5iZiI6MTY1OTY2NjYzN30.cDXCH2ElTzU2sQU36SNHWoTYTAc4wEkVIXmBAIzWh6M",
        exampleMapId: "sys_zp",
        assetsPath: "../../assets/",
        ...__env__ // 如果您已私有化部署，需要连接已部署的服务器地址和token，请打开js/env.js,修改里面的参数
    };
    try {
        // 在线效果查看地址: https://vjmap.com/demo/#/demo/map/popup/05popupMvvm
        // --Vue2创建信息窗口--
        // 地图服务对象
        let svc = new vjmap.Service(env.serviceUrl, env.accessToken)
        // 打开地图
        let res = await svc.openMap({
            mapid: env.exampleMapId, // 地图ID
            mapopenway: vjmap.MapOpenWay.GeomRender, // 以几何数据渲染方式打开
            style: vjmap.openMapDarkStyle() // div为深色背景颜色时，这里也传深色背景样式
        })
        if (res.error) {
            // 如果打开出错
            message.error(res.error)
        }
        // 根据地图范围建立几何投影坐标系
        let prj = new vjmap.GeoProjection(res.bounds);
        
        // 地图对象
        let map = new vjmap.Map({
            container: 'map', // DIV容器ID
            style: svc.rasterStyle(), // 样式，这里是栅格样式
            center: prj.toLngLat(prj.getMapExtent().center()), // 设置地图中心点
            zoom: 2, // 设置地图缩放级别
            pitch: 60,
            renderWorldCopies: false, // 不显示多屏地图
            doubleClickZoom: false // 不启用双击缩放
        });
        
        
        // 关联服务对象和投影对象
        map.attach(svc, prj);
        await map.onLoad()
        let mapBounds = map.getGeoBounds(0.4); // 得到地图地理范围
        
        
        // 加载vue2库
        if (typeof Vue !== "object" || Vue.version.substring(0, 1) != "2")  {
            // 如果没有环境
            await vjmap.addScript([{
                src: "../../js/vue@2.js"
            }])
        }
        // 如果要用 vue3，请参考 点标记 示例中的 vue3创建的Marker对象-
        const VuePopup = {
            data() {
                return {
                    count: 1
                }
            },
            methods: {
                add: function() {
                    this.count++;
                }
            },
            template : `
                  <div style="background: #7ec699">
                     <h4>count:{{count}}</h4>
                     <button @click="add">count加一</button>
                 </div>
              `
        }
        
        // 创建一个popup
        let popup = new vjmap.Popup({ offset: 0 })
        let popupEl = new Vue(VuePopup).$mount()
        
        popup.setLngLat(map.getCenter())
            .setDOMContent(popupEl.$el)
            .addTo(map);
        
        // 调试点位置，看位置是否与原生的Marker位置一样
        // let m = new vjmap.Marker();
        // m.setLngLat(map.getCenter())
        // m.addTo(map);
        
    }
    catch (e) {
        console.error(e);
        message.error({
            content: "catch error: " + (e.message || e.response || JSON.stringify(e).substr(0, 80)),
            duration: 60,
            key: "err"
        });
    }
};