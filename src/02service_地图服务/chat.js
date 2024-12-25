const OPENAI_KEY = 'sk-BzRCbeyJsTdHXlK19c692e0619744aBfBcB8C58fD653Dc7d'
const OPENAI_BASE_URL = 'https://www.gptapi.us/v1/chat/completions'
async function ssePost(url, headers, params, body, onEvent, onEnd, onError) {
    // 拼接url
    if (Object.keys(params).length > 0) {
        url += '?' + objectToQueryString(params);
    }
    try {
        const response = await fetch(url,{
            method: 'POST',
            headers: headers,
            body: body
        });
        // 判断响应状态码
        if (!response.ok) {
            onError(new Error('Network response was not ok'));
            return;
        }
        // 异步处理响应流
        const reader = response.body.getReader();
        // 响应缓冲区
        let buffer = '';
        // 响应的前一个字符，用于判断一个事件是否结束
        let before = '';
        // 循环读取响应流，直到响应流结束
        while (true) {
            // 读取响应流
            const { done, value } = await reader.read();
            // 响应流结束
            if (done) {
                break;
            }
            // 将响应流转换为文本
            const text = new TextDecoder().decode(value);
            // 遍历文本
            for (const element of text) {
                // 判断是否为事件结束。连续两个'\n'表示一个事件结束
                if (element === '\n' && before === '\n') {
                    // 将事件中的字段分割出来。例如：event: message \n data: hello world \n id: 123 \n\n
                    const eventAndData = buffer.substring(0, buffer.length - 1).split('\n');
                    // 将事件中的字段转换为对象, 例如：{event: message, data: hello world, id: 123}
                    const resultObject = {};
                    eventAndData.forEach(pair => {
                        const colonIndex = pair.indexOf(':');
                        if (colonIndex === -1) {
                            return;
                        }
                        resultObject[pair.substring(0, colonIndex)] = pair.substring(colonIndex + 2);
                    });
                    // 回调
                    onEvent(resultObject);
                    // 清空缓冲区
                    buffer = '';
                } else
                // 不是事件结束，将字符添加到缓冲区
                {
                    before = element;
                    buffer += element;
                }
            }
        }
        // 结束时的回调
        onEnd();
    } catch (error) {
        onError(new Error('Error'))
    }
}

function ChatClient(map, svc) {
    this.map = map
    this.svc = svc
    this.vjmapTextUtil = null
    this.subMapSplitUtils = null
    this.rects = null
    this.textList = null
    this.mapContent = [
        // {
        //     "submap":null,// 子图
        //     "text_list":null,
        //     "table_list":null,
        // }
    ]
    // 等待
    this.waiting = false;
}

ChatClient.prototype = {
    constructor: ChatClient,
    init: function () {
        let map = this.map
        let svc = this.svc
        // 文本聚类工具
        let vjmapTextUtil = new VjmapTextUtil(map, svc)
        vjmapTextUtil.addTextHighlightButton()
        vjmapTextUtil.addDrawTextClustersButton()
        this.vjmapTextUtil = vjmapTextUtil
        // 子图切分工具
        let subMapSplitUtils = new SubMapSplitUtils(map, svc)
        subMapSplitUtils.addSubMapSplitButton()
        this.subMapSplitUtils = subMapSplitUtils
        // 表格解析工具
        this.initController()
    },
    initRects: function () {
        if (this.rects) return;
        this.rects = this.subMapSplitUtils.getMapRects()
        console.log(this.rects)
    },
    initTextList: function () {
        if (this.textList) return;
        this.textList = this.vjmapTextUtil.getTextList()
        console.log(this.textList)
    },
    flashMapContent: function () {
        this.initRects()
        this.initTextList()
        let mapContent = []
        let textList = this.textList
        for (const _rect of this.rects) {
            let result = {
                submap: _rect,
                text_list: [],
                table_list: []
            }
            for (const item of textList) {
                if (item["isUsed"]) continue;
                const centerPoint = [(item.envelop.min.x + item.envelop.max.x) / 2, (item.envelop.min.y + item.envelop.max.y) / 2]
                if (centerPoint[0] >= _rect.envelop.min.x &&
                    centerPoint[0] <= _rect.envelop.max.x &&
                    centerPoint[1] >= _rect.envelop.min.y &&
                    centerPoint[1] <= _rect.envelop.max.y) {
                    result.text_list.push(item)
                }
            }
            mapContent.push(result)
        }
        for (const item of textList) {
            item["isUsed"] = false
        }
        this.mapContent = mapContent
        console.log(this.mapContent)
    },
    initController: function () {
        const that = this
        // UI界面
        const App = () => {
            return (
                <div>
                    <div class="tool-item">
                        <div class="tool-name">聊天工具</div>
                        <div class="tool">
                            <button id="submapsplit-btn" className="btn btn-full mr0"
                                onClick={() => that.calculateTotalArea()}>计算面积
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('tool-3'));
    },
    initShowBorad: function () {
        const that = this
        // UI界面
        const App = () => {
            return (
                <div>
                    <div class="tool-item">
                        <div class="tool-name">聊天工具</div>
                        <div class="tool">
                            <button id="submapsplit-btn" className="btn btn-full mr0"
                                onClick={() => that.calculateTotalArea()}>计算面积
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('tool-3'));
    },
    sendMessage: function (messages = [],callback=(e)=>{}) {
        // 等待
        if (this.waiting) {
            return;
        }
        // 获取到用户的输入
        const body = JSON.stringify({ "model": "gpt-4o-mini", "messages": messages, "stream": true });
        let text=""
        ssePost(
            OPENAI_BASE_URL,
            // 请求头
            { "Content-Type": "application/json", "Authorization": "Bearer " + OPENAI_KEY },
            // params，这里没有参数
            {},
            // body
            body,
            // 收到事件时的回调。这里将事件的data显示在htmlSpanElement中
            (event) => {
                // 获取数据
                if(event){
                    if (event["data"]){
                        let res=null
                        try{
                           res =JSON.parse(event["data"])
                           if (res.choices[0].delta.content){
                                text=text+res.choices[0].delta.content
                           }
                        }catch(error){
                        }
                    }
                }
            },
            ()=>{
                console.log(text)
                callback(text)
            },
            ()=>{
                // callback(text)
            },
        )
    },
    calculateTotalArea: function () {
        this.flashMapContent()
        // 编译模板
        const template = Handlebars.compile(cadPrompt);
        let cad_info=""
        for (let i=0;i<this.mapContent.length;i++){
            cad_info+=`\</子图${i+1}\>\n`
            let text_list=this.mapContent[i].text_list
            if(text_list){
                for(const item of text_list){
                    cad_info+=item.text
                    cad_info+='\n---------------\n'
                }
            }
            cad_info+=`\n\</子图${i+1}\>`
        }

        const query=template({"cad_info":cad_info})
        this.sendMessage(
            [
                { "role": "user", "content": query }
            ],
            (content)=>{
                document.getElementById("ai-text").innerText=content
            }
        )
    }
}