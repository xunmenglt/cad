const { message } = antd; // 第三方库用于消息提示


function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}


function getMinDistance(bounds1,bounds2){
    // 获取顶点与顶点之间的距离
    const x1=bounds1.min.x
    const y1=bounds1.min.y
    const x2=bounds1.max.x
    const y2=bounds1.max.y
    // ----
    const x3=bounds2.min.x
    const y3=bounds2.min.y
    const x4=bounds2.max.x
    const y4=bounds2.max.y
    const points1 = [
        [x1, y1], [x2, y1], [x2, y2], [x1, y2]
    ];
    const points2 = [
        [x3, y3], [x4, y3], [x4, y4], [x3, y4]
    ];
    // 初始化最近距离和点对
    let minDistance = Infinity; 
    // 遍历所有点对
    for (const [px1, py1] of points1) {
        for (const [px2, py2] of points2) {
            const distance = calculateDistance(px1, py1, px2, py2);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }
    }

    function isOverlap(point1,point2){
        const [p1,p2]=point1
        const [p3,p4]=point2
        if (
            (p1>=p3 && p1<=p4)||
            (p2>=p3 && p2<=p4) ||
            (p3>=p1 && p3<=p2) ||
            (p4>=p1 && p4<=p2)
        ){
            return true
        }
        return false
    }

    // 构建线段对
    // 与x轴平行的线段
    if (isOverlap([y1,y2],[y3,y4])){
        for (const px1 of [x1,x2]){
            for (const px2 of [x3,x4]){
                const distance= Math.abs(px1-px2)
                if (distance<minDistance){
                    minDistance = distance;
                }
            }
        }
    }
    if (isOverlap([x1,x2],[x3,x4])){
        for (const py1 of [y1,y2]){
            for (const py2 of [y3,y4]){
                const distance= Math.abs(py1-py2)
                if (distance<minDistance){
                    minDistance = distance;
                }
            }
        }
    }
    return minDistance
}


function VjmapTextUtil(map,svc){
    this.map=map
    this.svc=svc
    this.polygonLayer=null
    this.textClusters=null
    this.text_list=[]
}

VjmapTextUtil.prototype={
    constructor:VjmapTextUtil,
    addTextHighlightButton: function(){
        const that=this
        // UI界面
        const App = () => {
            return (
                <div>
                    <div className="info" style={{ width: "180px", right: "40px" }}>
                        <div className="input-item">
                            <button id="clear-map-btn" className="btn btn-full mr0"
                                    onClick={() => that.getAllTexts()}>获取图中所有文字并高亮
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('ui'));
    },
    addDrawTextClustersButton: function(){
        const that=this
        // UI界面
        const App = () => {
            return (
                <div>
                    <div class="tool-item">
                        <div class="tool-name">文本聚类工具</div>
                        <div class="tool">
                            <input id="clusters-input"></input>
                            <button id="clusters-btn" className="btn btn-full mr0"
                                    onClick={() => that.drawTextClusters()}>文本聚类
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('tool-1'));
    },
    getAllTexts: async function () {
        if (this.polygonLayer) return; // 如果绘制过了，不绘制了
        // 实体类型ID和名称映射
        const { entTypeIdMap } = await this.svc.getConstData();
        const getTypeNameById = name => Object.keys(entTypeIdMap).find(e => entTypeIdMap[e] === name);
        let polygons = [];
        let queryTextEntTypeId = getTypeNameById("AcDbText"); // 单行文字
        let queryMTextEntTypeId = getTypeNameById("AcDbMText"); // 多行文字
        let queryAttDefEntTypeId = getTypeNameById("AcDbAttributeDefinition"); // 属性定义文字
        let queryAttEntTypeId = getTypeNameById("AcDbAttribute"); // 属性文字
        let query = await this.svc.conditionQueryFeature({
            condition: `name='${queryTextEntTypeId}' or name='${queryMTextEntTypeId}' or name='${queryAttDefEntTypeId}' or name='${queryAttEntTypeId}'`, // 只需要写sql语句where后面的条件内容,字段内容请参考文档"服务端条件查询和表达式查询"
            fields: "",
            geom: true,
            limit: 100000 
        })
        if (query.error) {
            message.error(query.error);
            return;
        } else {
            if (query.recordCount > 0) {
                for(let i = 0; i < query.recordCount; i++) {
                    let bounds = this.map.getEnvelopBounds(query.result[i].envelop);
                    let clr = vjmap.entColorToHtmlColor(query.result[i].color); // 实体颜色转html颜色(
                    polygons.push({
                        points: this.map.toLngLat(bounds.toPointArray()),
                        properties: {
                            name: query.result[i].objectid,
                            color: clr,
                            text: query.result[i].text
                        }
                    });
                }
            }
        }
        this.polygonLayer = new vjmap.Polygon({
            data: polygons,
            fillColor: ['case', ['to-boolean', ['feature-state', 'hover']], 'yellow', '#f0f'],
            fillOpacity: ['case', ['to-boolean', ['feature-state', 'hover']], 0.6, 0.4],
            fillOutlineColor: ['get', 'color'],
            isHoverPointer: true,
            isHoverFeatureState: true
        });
        this.polygonLayer.addTo(this.map);
        this.polygonLayer.hoverFeatureState(e => {
            if (e.features) {
                message.info({
                    content: `名称为 ${e.features[0].properties.name}，值为 ${e.features[0].properties.text} 的文字`,
                    key: "info",
                    duration: 5
                })
            }
        })
    },
    getTextClusters:async function(){
        let that=this
        function isInCluster(cluster,point,minDistance=1000){
            if (!point){
                return false
            }
            for (const c of cluster){
                let bounds1=c.envelop
                let bounds2=point.envelop
                if (getMinDistance(bounds1,bounds2)<=minDistance){
                    return true
                }
            }
            return false
        }
        if(this.textClusters) return; // 如果聚类过了，不用聚类了
        let textClusters=[]
        // 实体类型ID和名称映射
        const { entTypeIdMap } = await this.svc.getConstData();
        const getTypeNameById = name => Object.keys(entTypeIdMap).find(e => entTypeIdMap[e] === name);
        let queryTextEntTypeId = getTypeNameById("AcDbText"); // 单行文字
        let queryMTextEntTypeId = getTypeNameById("AcDbMText"); // 多行文字
        let queryAttDefEntTypeId = getTypeNameById("AcDbAttributeDefinition"); // 属性定义文字
        let queryAttEntTypeId = getTypeNameById("AcDbAttribute"); // 属性文字
        let query = await this.svc.conditionQueryFeature({
            condition: `name='${queryTextEntTypeId}' or name='${queryMTextEntTypeId}' or name='${queryAttDefEntTypeId}' or name='${queryAttEntTypeId}'`, // 只需要写sql语句where后面的条件内容,字段内容请参考文档"服务端条件查询和表达式查询"
            fields: "",
            geom: true,
            limit: 100000 
        })
        if (query.error) {
            message.error(query.error);
            return;
        } else {
            if (query.recordCount > 0) {
                let points=query.result
                for (let point of points){
                    let bounds=that.map.getEnvelopBounds(point.envelop)
                    point.envelop=bounds
                }

                // 排序，按从左到右，从上到下排序
                points.sort((a, b) => {
                    let p1=a.envelop
                    let p2=b.envelop
                    if (p1.min.x === p2.min.x) {
                        return p2.min.y-p1.min.y;
                    }
                    if (Math.abs(p1.min.y - p2.min.y)<=200 ||
                        Math.abs(p1.max.y - p2.min.y)<=200 ||
                        Math.abs(p1.min.y - p2.max.y)<=200){
                        return p1.min.x-p2.min.x;
                    }
                    return p2.min.y-p1.min.y;
                });

                for(let point of points){
                    if (textClusters.length<=0){
                        textClusters.push([point])
                        continue
                    }
                    let flag=false
                    for (let cluster of textClusters){
                        flag=isInCluster(cluster,point,1000)
                        if(flag){
                            cluster.push(point)
                            break
                        }
                    }
                    if(!flag){
                        textClusters.push([point])
                    }
                }
            }
        }
        this.textClusters=textClusters
        return textClusters
    },
    drawTextClusters:async function(){
        if(!this.textClusters){
            await this.getTextClusters()
        }
        let textClusters=this.textClusters
        let data=[]
        const clustersKey=document.getElementById("clusters-input").value
        let text_list=[]
        // 遍历每个聚类
        for(let cluster of textClusters){
            let x1=Infinity
            let y1=Infinity
            let x2=-Infinity
            let y2=-Infinity
            let _f=false
            let text=""
            let preNode=null
            cluster.sort((a, b) => {
                let p1=a.envelop
                let p2=b.envelop
                if (p1.min.x === p2.min.x) {
                    return p2.min.y-p1.min.y;
                }
                if (Math.abs(p1.min.y - p2.min.y)<=200 ||
                    Math.abs(p1.max.y - p2.min.y)<=200 ||
                    Math.abs(p1.min.y - p2.max.y)<=200){
                    return p1.min.x-p2.min.x;
                }
                return p2.min.y-p1.min.y;
            });
            for (let point of cluster){
                if (!preNode){
                    preNode=point.envelop
                }
                if(
                    !(
                        Math.abs(preNode.min.y - point.envelop.min.y)<=200 ||
                        Math.abs(preNode.max.y - point.envelop.min.y)<=200
                    ) 
                ){
                    preNode=point.envelop
                    text+="\n"
                }

                text=text+point.text
                preNode=point.envelop
                if (clustersKey==='' ||
                    clustersKey==null ||
                    point.text.indexOf(clustersKey)>=0){
                    
                    console.log(cluster)
                    _f=true
                }
                let bounds=point.envelop
                if (bounds.min.x<x1){
                    x1=bounds.min.x
                }
                if(x2<bounds.max.x){
                    x2=bounds.max.x
                }
                if (bounds.min.y<y1){
                    y1=bounds.min.y
                }
                if(y2<bounds.max.y){
                    y2=bounds.max.y
                }
            }
            if (_f){
                // 画图
                data.push({
                    points: this.map.toLngLat([[x1,y2],[x2,y2],[x2,y1],[x1,y1]]),
                    properties: {
                        color: "#FF2AA5"
                    }
                });
                console.log(text)
                text_list.push({
                    text:text,
                    envelop:{
                        "min":{
                            x:x1,
                            y:y1
                        },
                        "max":{
                            x:x2,
                            y:y2
                        }
                    }
                })
            }
        }
        const clusterTextContainer=document.getElementById("cluster-text-ul")
        const childrens=clusterTextContainer.childNodes
        for (const children of childrens){
            clusterTextContainer.removeChild(children)
        }
        this.text_list=text_list
        for (const item of text_list){
            const text=item.text
            const _li=document.createElement("li")
            _li.innerText=text
            clusterTextContainer.appendChild(_li)
        }
        let polygon = new vjmap.Polygon({
            data: data,
            fillColor: ['case', ['to-boolean', ['feature-state', 'hover']], 'yellow', '#FD2DC3'],
            fillOpacity: ['case', ['to-boolean', ['feature-state', 'hover']], 0.5, 0.3],
            fillOutlineColor: ['get', 'color'],
            isHoverPointer: true,
            isHoverFeatureState: true
        });
        polygon.addTo(this.map);
    },
    getTextList:function(){
        return this.text_list
    }
}
