
function SubMapSplitUtils(map,svc){
    this.map=map
    this.svc=svc
    this.entTypeIdMap=null
    this.mapRects=null
}

SubMapSplitUtils.prototype={
    constructor:SubMapSplitUtils,
    
    getTypeNameById:function(name){
        for(let id in this.entTypeIdMap) {
            if (this.entTypeIdMap[id] == name) {
                return id
            }
        }
    },

    // 在图中查找所有的直线段
    getMapLines : async function () {
        // 查找图中所有的直线，二三维多段线
        const { entTypeIdMap } = await this.svc.getConstData();
        this.entTypeIdMap=entTypeIdMap
        let queryEntTypes = ['AcDbLine', 'AcDbPolyline', 'AcDb2dPolyline', 'AcDb3dPolyline'];
        let cond = queryEntTypes.map(t => `name='${this.getTypeNameById(t)}'`).join(' or '); // sql条件
        let result = [];
        let beginPos = 0; // 记录查询开始位置
        // 有可能记录数会很多，这里用分页查询
        while(true) {
            let limit = 50000 // 每次查5万条
            let query = await this.svc.conditionQueryFeature({
                condition: cond, // 只需要写sql语句where后面的条件内容,字段内容请参考文档"服务端条件查询和表达式查询"
                fields: "objectid,points,envelop", // 只要id,坐标
                beginpos: beginPos, // 记录开始位置
                limit: limit // 每次查10万条
            });
            if (!query.result) break;
            beginPos += limit; // 开始位置位置挪动
            result.push(...query.result || []);
            if (result.length >= query.recordCount) break;
        }
        result.forEach(rst => rst.envelop = this.map.getEnvelopBounds(rst.envelop));
        return result;
    },

    // 得到一个图里面所有的矩形
    findAllRectInMap:function(lines) {
        let allRects = [];
        // 矩形（有可能是四条直线或者 一条多段线4个点（闭合），5个点(闭合）所组成
        // 先查找一条多段线4个点（闭合），5个点(闭合）所组成的矩形
        lines.forEach(e => {
            if (e.points == "") {
                return;
            }
            let points = e.points.split(";").map(p => vjmap.GeoPoint.fromString(p));
            if (points[0].equals(points[points.length - 1])) {
                // 如果是首尾闭合，则把最后那个点去了
                points.length = points.length - 1;
            }
            if (points.length != 4) return; // 如果不是四个点。则不是矩形
            // 判断四个点是否构成矩形
            // 先计算中点的位置, 然后再计算中点到四个点的距离是不是一样即可。
            let cx = (points[0].x + points[1].x + points[2].x + points[3].x) / 4.0;
            let cy = (points[0].y + points[1].y + points[2].y + points[3].y) / 4.0;
            let center = vjmap.geoPoint([cx, cy]);
            let dist = center.distanceTo(points[0]);
            let isDistEqual = true;
            for(let k = 1; k < points.length; k++) {
                if(!vjmap.isZero(center.distanceTo(points[k]) - dist)) {
                    isDistEqual = false;
                    break;
                }
            }
            if (!isDistEqual) return false;//不是矩形
            let rectObj = {
                bounds: e.envelop, // 直接用获取到的外包矩形
                ents: [e.objectid]
            };
            allRects.push(rectObj)
        });
    
        // 再查询由四条直线所组成的矩形
        // 首先找到所有符合的线，条件为：坐标两个点，横线或竖线
        lines = lines.filter(e => {
                let points = e.points.split(";");
                if (points.length !=2 ) return false;
                e.geoStart = vjmap.GeoPoint.fromString(points[0]);
                delete e.geoStart.z;// 不考虑z值
                e.geoEnd = vjmap.GeoPoint.fromString(points[1]);
                delete e.geoEnd.z;// 不考虑z值
                e.startPoint = e.geoStart.toString();
                e.endPoint =  e.geoEnd.toString();
                if (e.startPoint == e.endPoint) {
                    // 同一个点
                    return false;
                }
                let line = points.map(e=>vjmap.geoPoint(e.split(",")))
                let isVLine = vjmap.isZero(line[0].x - line[1].x);//竖线
                let isHLine = vjmap.isZero(line[0].y - line[1].y);//横线
                if (!(isVLine || isHLine)) return false; // 并且是横线或竖线
    
                e.isHorzLine = isHLine;
                e.findFlag = false;
                return true
            }
        )
        // 把所有的坐标点存进一个字典数组中
        let coordPointMap = {} // 坐标点字典
        let entMap = {} // 实体字典
        for(let ln of lines) {
            // id与线实体相关联
            entMap[ln.objectid] = ln;
            coordPointMap[ln.startPoint] = coordPointMap[ln.startPoint] || new Set()
            coordPointMap[ln.startPoint].add(ln.objectid)
    
            coordPointMap[ln.endPoint] = coordPointMap[ln.endPoint] || new Set()
            coordPointMap[ln.endPoint].add(ln.objectid)
        }
        for(let c in coordPointMap) {
            coordPointMap[c] = Array.from(coordPointMap[c])
        }
    
        // 查找下一个线
        const findNextLine = (ln, isStartPoint, nextIsHortLine) => {
            const pt = isStartPoint ? ln.startPoint : ln.endPoint
            const findLines = coordPointMap[pt];
            if (!findLines) return null;
            //先查找id开头相近的。有可能是同一个块
            let idx = findLines.findIndex( e => e != ln.objectid && e.substr(0, 3) == ln.objectid.substr(0, 3));
            if(idx < 0) {
                // 找不到相近的时候，再随便找个吧
                idx = findLines.findIndex( e => e != ln.objectid);
                if(idx < 0) return null;
            }
            const findLn = entMap[findLines[idx]];
            if (findLn.isHorzLine != nextIsHortLine) return null; // 线类型不一样
            let isLnStartPoint = findLn.startPoint != pt
            return {
                findLine: findLn,
                isStartPoint: isLnStartPoint
            }
        };
    
    
        // 下面找矩形
        for(let ln of lines) {
            if (ln.isHorzLine) continue;//只找竖线
            // 找两个点都有相连的线
            let n1 = coordPointMap[ln.startPoint].length;
            let n2 = coordPointMap[ln.endPoint].length;
            if (ln.findFlag) continue;
            // 按链接关系一直找下去，从起始能到终点，说明是一个矩形
            let nextLine1 = findNextLine(ln, true, true)
            if (!nextLine1) continue;
            let nextLine2 = findNextLine(nextLine1.findLine, nextLine1.isStartPoint, false)
            if (!nextLine2) continue;
            let nextLine3 = findNextLine(nextLine2.findLine, nextLine2.isStartPoint, true)
            if (!nextLine3) continue;
            let nextLine4 = findNextLine(nextLine3.findLine, nextLine3.isStartPoint, false)
            if (!nextLine4) continue;
            if (nextLine4.findLine.objectid == ln.objectid && nextLine4.isStartPoint == true) {
                // 成功了，可以是一个矩形了
                ln.findFlag = true;
                nextLine1.findLine.findFlag = true;
                nextLine2.findLine.findFlag = true;
                nextLine3.findLine.findFlag = true;
    
                // 增加矩形对象
                let strBounds = '[' + ln.startPoint + ','  + (nextLine2.isStartPoint ? nextLine2.findLine.startPoint : nextLine2.findLine.endPoint) + ']';
                let rectObj = {
                    bounds: vjmap.GeoBounds.fromString(strBounds),
                    ents: [ln.objectid, nextLine1.findLine.objectid, nextLine2.findLine.objectid, nextLine3.findLine.objectid]
                };
                allRects.push(rectObj)
            }
        }
        return allRects;
    },
    // 自动拆分子图，显示所有子图的范围
    // 原理为：查找图中的所有矩形（包括由直线所组成的矩形）,这个矩形没有被其他矩形所包含，则应为是一个子图的范围
    splitMap:async function (){
        message.info('请点击高亮的子图框，选择”保存成新的子图“或"保存成图片"')
        let mapRects = [];
        if(!this.mapRects){
            let lnRes = await this.getMapLines();
            let allRects = this.findAllRectInMap(lnRes);
            // 在所有矩形中，只有没有被其他矩形所包含的，才以为是一个新的图的图框
            for(let i = 0; i < allRects.length; i++) {
                let isContain = false;
                for(let j = 0; j < allRects.length; j++) {
                    if (i == j) continue; // 如果是自己
                    // 判断矩形是否包含
                    if ( allRects[j].bounds.isContains(allRects[i].bounds)) {
                        isContain = true;
                        break;
                    }
                }
                if (!isContain) {
                    mapRects.push(allRects[i]); // 没有包含的，才以为是一个新的图的图框
                }
            }
            this.mapRects=mapRects
        }else{
            mapRects=this.mapRects
        }
        let data = []
        for(let i = 0; i < mapRects.length; i++) {
            let bounds = mapRects[i].bounds;
            data.push({
                points: this.map.toLngLat(bounds.toPointArray()),
                properties: {
                    color: "#00FF00"
                }
            });
        }
        let polygon = new vjmap.Polygon({
            data: data,
            fillColor: ['case', ['to-boolean', ['feature-state', 'hover']], 'yellow', '#00FF00'],
            fillOpacity: ['case', ['to-boolean', ['feature-state', 'hover']], 0.5, 0.3],
            fillOutlineColor: ['get', 'color'],
            isHoverPointer: true,
            isHoverFeatureState: true
        });
        polygon.addTo(this.map);
    },
    addSubMapSplitButton:function(){
        const that=this
        // UI界面
        const App = () => {
            return (
                <div>
                    <div class="tool-item">
                        <div class="tool-name">子图分割工具</div>
                        <div class="tool">
                            <button id="submapsplit-btn" className="btn btn-full mr0"
                                    onClick={() => that.splitMap()}>子图切分
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('tool-2'));
    },
    getMapRects:function(){
        for (const _rect of this.mapRects){
            let bounds=_rect.bounds
            _rect["envelop"]=bounds
        }
        this.mapRects.sort((a,b)=>{
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
        })
        return this.mapRects
    }

}