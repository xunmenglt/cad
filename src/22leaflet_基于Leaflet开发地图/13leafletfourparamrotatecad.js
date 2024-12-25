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
        // 在线效果查看地址: https://vjmap.com/demo/#/demo/map/leaflet/13leafletfourparamrotatecad
        // --CAD图与互联网地图旋转叠加[CAD为底图]--
        
        // leaflet 官网地址 https://leafletjs.com/
        // leaflet 源码地址 https://github.com/Leaflet/Leaflet
        if (typeof L !== "object") {
            // 如果没有leaflet环境
            await vjmap.addScript([{
                src: "../../js/leaflet2.0/leaflet.js"
            },{
                src: "../../js/leaflet2.0/leaflet.css"
            }]);
        }
        
        let initZoom = 8;
        let style = {
            backcolor: 0, // div为深色背景颜色时，这里也传深色背景样式
            clipbounds: Math.pow(2, initZoom) // 只传值，不传范围，表示之前的范围放大多少倍
        }
        let svc = new vjmap.Service(env.serviceUrl, env.accessToken)
        let res = await svc.openMap({
            mapid: "sys_zp",
            mapopenway: vjmap.MapOpenWay.GeomRender, // 以几何数据渲染方式打开
            style:  style
        })
        if (res.error) {
            message.error(res.error)
        }
        // 获取地图范围
        let mapBounds = vjmap.GeoBounds.fromString(res.bounds);
        let prj = new vjmap.GeoProjection(mapBounds);
        let center = mapBounds.center();
        
        // 建立一个基于CAD图范围的坐标系
        let CadCRS = L.Class.extend({
            includes: L.CRS.Simple,
            initialize: function (bounds) {
                // 当前CAD图的范围
                this.bounds = bounds;
                // 投影
                this.projection = L.Projection.LonLat;
                // 计算分辨率
                let r = (256 / Math.abs(this.bounds.getEast() - this.bounds.getWest()));
                // 设置转换参数 一个仿射变换:一组系数a, b, c, d，用于将一个形式为(x, y)的点变换为 (ax + b, cy + d)并做相反的变换
                this.transformation = new L.Transformation(r, -r * this.bounds.getWest(),  - r,  r * this.bounds.getNorth());
            }
        });
        
        // leaflet中坐标是反的，如果要用L.latLng传入坐标的时候要传[y,x]，如果要传[x,y]，官网建议如下方案
        // https://leafletjs.com/examples/crs-simple/crs-simple.html
        L.XY = function(x, y) {
            if (L.Util.isArray(x)) {    // When doing XY([x, y]);
                return L.latLng(x[1], x[0]);
            }
            return L.latLng(y, x);  // When doing XY(x, y);
        };
        
        // 当前CAD地图范围
        let bounds = new L.LatLngBounds([L.XY(mapBounds.min.toArray()), L.XY(mapBounds.max.toArray())]);
        
        // 创建leaflet的地图对象
        let map = L.map('map', {
            // 坐标系
            crs: new CadCRS(bounds),
            attributionControl: false
        }).setView(L.XY([center.x, center.y]), 9); // 设置初始中心点和缩放级别
        // 如果要用L.latLng设置的话，x,y应写反进行设置。如
        // map.setView(L.latLng([center.y, center.x]), 9);
        
        // 增加一个栅格瓦片图层
        let layer = L.tileLayer(
            svc.rasterTileUrl(),  // 唯杰地图服务提供的cad的栅格瓦片服务地址
            {
                bounds: bounds // 当前CAD地图范围
            }
        ).addTo(map);
        // 把图层增加至地图中
        layer.addTo(map);
        
        document.getElementById("map").style.background = "#ffffff00"; // 把地图背景色设置为透明，用document之前设置的背景色
        map.on('click', (e) => message.info({content: `您点击的坐标为： ${e.latlng.lng}, ${e.latlng.lat}}`, key: "info", duration: 3}));
        
        
        // 如果需要手动拾取对应点，请至唯杰地图云端管理平台 https://vjmap.com/app/cloud/#/ 点击图打开后，在更多功能，选择 与互联网地图四参数叠加
        
        // cad上面的点坐标
        let cadPoints = [
            vjmap.geoPoint([587464448.8435847, 3104003685.208651,]),
            vjmap.geoPoint([587761927.7224838, 3104005967.655292]),
            vjmap.geoPoint([587463688.0280377, 3103796743.3798513]),
            vjmap.geoPoint([587760406.0913897, 3103793700.1176634])
        ];
        
        
        // 在互联网图上面拾取的与上面的点一一对应的坐标(wgs84坐标)
        let webPoints = [
            vjmap.geoPoint([116.4849310885225,  39.960672361810566]),
            vjmap.geoPoint([116.48571466352934, 39.96016690545824]),
            vjmap.geoPoint([116.48440741215745, 39.96016393217476]),
            vjmap.geoPoint([116.48517547082753, 39.95968523181088])
        ]
        
        // 通过坐标参数求出四参数
        let epsg3857Points = webPoints.map(w => vjmap.geoPoint(vjmap.Projection.lngLat2Mercator(w)));
        let param = vjmap.coordTransfromGetFourParamter(cadPoints, epsg3857Points, false); // 这里考虑旋转
        let fourparam = [param.dx, param.dy, param.scale, param.rotate]
        
        // 如果旋转，需要把地图旋转一个角度，使互联网地图是正的
        // leaflet不支持旋转，如果需要旋转，可以用leaflet的一个分支 https://github.com/Leaflet/Leaflet/tree/rotate
        
        // 增加高德地图底图
        let gdlayer;
        const addGaodeMap = async (isRoadway) => {
            let b = mapBounds;
            const tileUrl = svc.webMapUrl({
                tileCrs: "gcj02",
                tileUrl: isRoadway ? [
                        "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
                    ] :
                    /* 如果用影像 */
                    [
                        "https://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}",
                        "https://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
                    ],
                tileSize: 256,
                tileRetina: 1,
                // @ts-ignore
                tileMaxZoom: 18,
                tileShards: "1,2,3,4",
                tileToken: "",
                tileFlipY: false,
                mapbounds: JSON.stringify([b.min.x,b.min.y,b.max.x,b.max.y]),
                srs: "EPSG:3857",
                // 如果图x只有6位，没有带系。需要在坐标转换前平移下带系  https://blog.csdn.net/thinkpang/article/details/124172626
                fourParameterBefore: fourparam
            })
        
            gdlayer = L.tileLayer(
                tileUrl,
                {
                    zIndex: 0
                }
            );
            gdlayer.addTo(map);
        }
        
        const removeMapLayer = ()=> {
            // 删除source及source下面的所有图层
            if (gdlayer) gdlayer.remove();
        }
        
        
        addGaodeMap(true);
        
        
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