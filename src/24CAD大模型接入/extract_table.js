function ExtractTableClient(map,svc){
    this.map=map
    this.svc=svc
    this.data={
        bounds:"",// 表格范围，为空表示此个图，否则为指定区域查询提取
        condition:"",//查询条件(默认为所有线)
        // debugInfo:{//调试信息
        //     lines:"",
        //     flags:"",
        //     cells:"",
        //     rects:"",
        //     noresult:"",
        //     childmapRect:"",
        // },
        debugInfo:"",
        tol:0,//误差值
        digit:4,//小数点计算精度
        seachTableMost:false,//表格数据允许重复
        tableEdgeMinPoint:12,//表格边框最少点
        tableTextMinCount:4,//表格文本最少数
        cellEmptyRatio:90,//空值所占最大比例
        unLinkLineRatio:20,//未关联线所占最大比例
        cellMaxArea:90,//单元格最大面积比
        tableMaxCellCount:100000,//单元格最大个数
        noHvLineSegCount:0,//线段中允许折线段数
    }
    this.drawDebugSourceIdSet = new Set();
    this.tables=null;
    this.currentTableIndex=-1
    this.geoDatas=[]
}

ExtractTableClient.prototype={
    constructor:ExtractTableClient,
    extractMapTable:async function(){
        let data = this.data;
        let map=this.map
        let bShowResult = data.debugInfo.indexOf("noresult") == -1 // 如果调试数据中没有不绘制结果这个选项，那输出结果
        let bDrawDebugLine = data.debugInfo.indexOf("lines") >= 0; // 输出调试线
        let bDrawDebugRect = data.debugInfo.indexOf("rects") >= 0; // 输出调试表格范围
        let bDrawDebugFlag = data.debugInfo.indexOf("flags") >= 0; // 输出调试位置标识
        let bDrawDebugCells = data.debugInfo.indexOf("cells") >= 0; // 输出单元格线位置标识 
        let bChildmapRect =  data.debugInfo.indexOf("childmapRect") >= 0; // 是否查找子图范围

        if (map.logInfo) map.logInfo("正在提取表格，请稍候...", 2000);
        let svc = map.getService();
        let result = await svc.execCommand("extractTable", {
            ...data,
            debug: bDrawDebugLine || bDrawDebugRect ||  bDrawDebugFlag || bDrawDebugCells,
            findChildMapRects: bChildmapRect,
            mapid: svc.currentMapParam()?svc.currentMapParam().mapid:null,
            version:  svc.currentMapParam()?svc.currentMapParam().version:null,
            layer: svc.currentMapParam()?svc.currentMapParam().layer:null,
            // 如果直接内存打开的话，用表达式查询，如果几何渲染打开，用空间查询
            geom: (svc.currentMapParam()?svc.currentMapParam().mapopenway:null) != vjmap.MapOpenWay.Memory
        }, "_null", "v1");

        if (result.error) {
            if (map.logInfo) map.logInfo("表格提取失败", "error",2000);
            return;
        }
        let drawDebugSourceIdSet = this.drawDebugSourceIdSet
        if (drawDebugSourceIdSet.size > 0) {
            for(let sId of drawDebugSourceIdSet) {
                // @ts-ignore
                map.removeSourceEx(sId);
            }
            drawDebugSourceIdSet.clear();
        }

        this.tables=result.tables
        console.log(this.tables)

        this.drawTables(this.map,this.tables)
        
        return this.tables;
    },
    addExtractTableButton:function(){
        const that = this
        // UI界面
        const App = () => {
            return (
                <div>
                    <div class="tool-item">
                        <div class="tool-name">表格工具</div>
                        <div class="tool">
                            <button id="tableextract-btn" className="btn btn-full mr0"
                                onClick={() => that.extractMapTable()}>抽取表格
                            </button>
                            <button id="nextTable-btn" className="btn btn-full mr0"
                                onClick={() => that.nextTable()}>展示下一个表格
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('tool-4'));
    },
    nextTable:function(){
        if(this.tables || this.tables.length<=0){
            this.map.logInfo("请先抽取表格",2000)
        }
        this.currentTableIndex=(this.currentTableIndex+1)%this.tables.length
        // 获取表格数据
        const table=this.tables[this.currentTableIndex]
        let text=""
        for(let row of table.datas){
            text+="|"
            for (let t of row){
                if(t==='' || t==null){
                    t="***"
                }
                text+=`${t}|`  
            }
            text+="\n"
        }
        // 向ui中填写表格数据
        document.getElementById('ai-table').innerText=text
        // 在map中划出表格数据
        let tableBounds = vjmap.GeoBounds.fromDataExtent(this.geoDatas.features[this.currentTableIndex].geometry.coordinates[0]);
        //prop.context.map.fitMapBounds(tableBounds, {padding: 200});
        this.map.setCenter(this.map.toLngLat(tableBounds.center()))
    },
    // 绘制提取到的表格内容
    drawTables:function(map, tables){

    let geoDatas = {
        "type": "FeatureCollection",
        "features": []
    }
    let maxArea = 0;
    let tableMaxAreaIdx = 0;
    for(let t = 0; t < tables.length; t++) {
        let rect = vjmap.GeoBounds.fromString(tables[t].rect);
        // 计算面积用于第一次显示面积最大的表格
        let area = rect.width() * rect.height();
        if (area > maxArea) {
            tableMaxAreaIdx  = t;
            maxArea = area;
        }
        let pts = rect.toPointArray();
        pts.push(pts[0]); // 闭合
        geoDatas.features.push(
            {
                "id": t,
                "type": "Feature",
                "properties": {
                    color: vjmap.randomColor(),
                    index: t
                },
                "geometry": {
                    "coordinates": [pts],
                    "type": "Polygon"
                }
            })
    }

    let polygons = new vjmap.Polygon({
        data: map.toLngLat(geoDatas),
        // 如果是hover状态时，用红色，非hover状态时，取属性中的'color'做为颜色值
        fillColor: ['get', 'color'],
        fillOpacity: ['case', ['to-boolean', ['feature-state', 'hover']], 0.4, 0.3],
        fillOutlineColor: "#f00",
        isHoverPointer: true,
        isHoverFeatureState: true
    });
    polygons.addTo(map);
    this.drawDebugSourceIdSet.add(polygons.sourceId);
    this.geoDatas=geoDatas
}
}