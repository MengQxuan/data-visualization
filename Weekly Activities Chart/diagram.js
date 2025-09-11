const width = 800; // SVG画布的宽度
const height = 400; // SVG画布的高度

// 从HTML文档中选择SVG元素
const svg = d3.select(".chart"); // 选择具有 "chart" 类的SVG元素

const xOffset = 60; // x轴偏移量，调整以改变图的位置
const yOffset = 60; // y轴偏移量

const filePath = 'data.csv'; // CSV文件路径

// 使用d3读取CSV文件
d3.csv(filePath).then((data) => {
    createChart(data); // 读取文件后，调用createChart函数来绘制图表
}).catch((err) => {
    //console.error('Error reading CSV file:', err);
});

function createChart(data) {

    const color = d3.scaleOrdinal()
        .domain(['sleep', 'eat', 'schooltime', 'exercise', 'music'])
        .range(d3.schemeCategory10); // 创建颜色标度，用于区分不同的堆叠区域

    // 在X轴上添加描述
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height - 20)
        .style("text-anchor", "middle")
        .text("Day");

    // 在Y轴上添加描述
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 30)
        .style("text-anchor", "middle")
        .text("Hours");

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => 24)]) // y轴的比例范围
        .nice()
        .range([height - yOffset, yOffset]); // y轴的像素范围

    const xScale = d3.scaleBand()
        .domain(data.map((d) => d.day)) // x轴的标签，以每天的名称作为标签
        .range([xOffset, width - xOffset]) // x轴的范围，根据偏移量调整图的位置
        .padding(1); // 堆叠区域之间的间隔

    const xAxis = d3.axisBottom(xScale); // 创建x轴

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height - yOffset})`) // 将x轴移至底部
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale)
        .ticks(20) // y轴的刻度数量
        .tickSize(7); // 刻度线的长度

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${xOffset}, 0)`) // 将y轴移至左侧
        .call(yAxis);

    // 在y轴的右侧绘制虚线
    const yAxisRight = d3.axisRight(yScale)
        .ticks(20) // y轴的刻度数量
        .tickSize(width - xOffset - xOffset); // 设置虚线的长度，与图表的宽度一致

    svg.append("g")
        .attr("class", "y-axis-right")
        .attr("transform", `translate(${xOffset}, 0)`) // 将y轴移至右侧
        .call(yAxisRight);

    // 为虚线添加样式
    svg.selectAll(".y-axis-right line")
        .style("stroke-dasharray", "2,2") // 设置虚线样式
        .style("stroke", "#888"); // 设置虚线颜色


    const stack = d3.stack()
        .keys(['sleep', 'eat', 'schooltime', 'exercise', 'music']);// 定义堆叠的键

    const stackedData = stack(data); // 堆叠数据以绘制堆叠面积图

    const area = d3.area()
        .x((d) => xScale(d.data.day))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]))
        .curve(d3.curveBumpX); // 创建堆叠区域生成器

    svg.selectAll(".stacked-area")
        .data(stackedData) // 数据绑定
        .enter()
        .append("path")
        .attr("class", "stacked-area")
        .attr("d", area) // 设置堆叠区域的形状
        .style("fill", (d) => color(d.key)); // 填充不同的堆叠区域颜色


    //交叉排序
    // let data0 = [
    //     { day: 'Monday', sleep: '8.5', eat: '2', schooltime: '6.75', exercise: '2', music: '0.5' },
    //     { day: 'Tuesday', sleep: '8', eat: '2', schooltime: '8', exercise: '1', music: '1' },
    //     { day: 'Wednesday', sleep: '8.5', eat: '2', schooltime: '6', exercise: '4.5', music: '1' },
    //     { day: 'Thursday', sleep: '8.5', eat: '2', schooltime: '4.5', exercise: '2.5', music: '1.5' },
    //     { day: 'Friday', sleep: '8.5', eat: '2', schooltime: '3', exercise: '3', music: '1.5' },
    //     { day: 'Saturday', sleep: '9', eat: '2.5', schooltime: '3', exercise: '2', music: '2' },
    //     { day: 'Sunday', sleep: '9', eat: '2.5', schooltime: '5', exercise: '2', music: '2' }
    // ];
    // // 根据music属性对原始数据进行降序排序  
    // data0.sort((a, b) => b.music - a.music);
    // const stack = d3.stack()
    //     .keys(['sleep', 'eat', 'schooltime', 'exercise', 'music']); // 定义堆叠的键  
    // // 使用排序后的数据生成堆叠数据  
    // const stackedData = stack(data0);
    // console.log(stackedData);
    // const area = d3.area()
    //     .x((d) => xScale(d.data.day))
    //     .y0((d) => yScale(d[0]))
    //     .y1((d) => yScale(d[1]))
    //     .curve(d3.curveCardinal);
    // svg.selectAll(".stacked-area")
    //     .data(stackedData) // 数据绑定  
    //     .enter()
    //     .append("path")
    //     .attr("class", "stacked-area")
    //     .attr("d", area) // 设置堆叠区域的形状  
    //     .style("fill", (d) => color(d.key)); // 填充不同的堆叠区域颜色


    // 创建一个图例标度，用于解释颜色和数据
    const legendScale = d3.scaleOrdinal()
        .domain(['sleep', 'eat', 'schooltime', 'exercise', 'music']) // 数据的标签
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']); // 数据的颜色

    // 创建一个图例生成器
    const legend = d3.select(".chart") // 选择图表容器
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(60, 40)"); // 调整图例的位置（x,y）

    const legendItems = legend.selectAll(".legend-item")
        .data(['sleep', 'eat', 'schooltime', 'exercise', 'music'])
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(${i * 150}, 0)`); // 调整每个图例项的水平位置  150是每个图例之间的间隔

    legendItems.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", (d) => legendScale(d));

    legendItems.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .text((d) => d);

    // 在SVG中创建一个包含标题和图例的分组
    const legendGroup = svg.append("g")
        .attr("class", "legend-group")
        .attr("transform", "translate(0, 20)"); // 调整图例的位置

    // 添加标题
    legendGroup.append("text")
        .text("Weekly Activities Chart")
        .attr("class", "legend-title")
        .attr("x", 0)
        .attr("y", 0);

    // 在包含标题的分组中创建图例
    const legendItemsGroup = legendGroup.append("g")
        .attr("class", "legend-items-group")
        .attr("transform", "translate(0, 0)"); // 调整图例的位置

    legendItemsGroup.call(legend);


}
