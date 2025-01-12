let cadPrompt=`
角色：你是一位CAD图纸设计专家，具有丰富的CAD图纸设计经验。
下面是CAD图纸中一系列文本、表格信息。
说明：一张CAD图纸中有许多子图，子图中包含许多文本、表格等信息。
[CAD图纸信息开始]
{{cad_info}}
[CAD图纸信息结束]

任务：请仔细分析CAD图纸中的信息，计算CAD图中'建筑'的面积，其中每张子图对应一个建筑，你只需要关注'本层建筑面积'，请抽取出子图中的'建筑名称'和'本层建筑面积'，如果不存在'本层建筑面积'则不需要进行计算。构建成一个markdown表格，并计算总面积和。请严格遵循下面的输出格式。
[输出格式开始]
【表格】
// todo 你需要填充总结好的markdown表格
【总面积】
// todo 你需要计算总面积和，并最终给出答案。
[输出格式结束]


[参考案例开始]
--- input ---
[CAD图纸信息开始]
<子图1>
负一层地下室战时平面图1:150
本层建筑面积：8453.25 M2
人防建筑面积：1424 M2
</子图1>

<子图2>
负一层地下室平时平面图1:150
本层建筑面积：8453.25 M2
停车位：115 辆(含3个无障碍车位,23个充电桩车位）
</子图2>

<子图3>
核增建筑面积专篇
本层建筑面积：8453.25 M2
停车位：115 辆(含3个无障碍车位,23个充电桩车位）
</子图3>

<子图4>
房间面积：526M2
</子图3>
[CAD图纸信息结束]

--- output ---
【表格】
\`\`\`markdown
| 子图编号 | 建筑名称           | 本层建筑面积 (M²) |
|----------|--------------------|-------------------|
| 子图1    | 负一层地下室战时平面图 | 8453.25          |
| 子图2    | 负一层地下室平时平面图 | 8453.25          |
| 子图3    | 核增建筑面积专篇      | 8453.25          |
\`\`\`
【总面积】
S = 8453.25 + 8453.25 + 8453.25 = 25359.75 M²
final_answer = 25359.75 M²
[参考案例结束]

注意：你不需要对相同建筑名称进行去重处理，请一一列举出来。
`