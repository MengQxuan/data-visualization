const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const width2 = 800 - margin.left - margin.right;
const height2 = 400 - margin.top - margin.bottom;

// 创建SVG元素
const svg2 = d3
    .select(".table")
    .append("svg")
    .attr("width2", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// 鼠标悬停时显示的提示框
const tooltip = d3.select(".chart-container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// 从CSV文件中读取数据
d3.csv("data2.csv").then((data) => {
    // 数据预处理
    data.forEach((d) => {
        d.年份 = +d.年份;
        d["人均可支配收入（元）"] = +d["人均可支配收入（元）"];
        d["同比增长（%）"] = +d["同比增长（%）"];
    });

    // 创建X轴比例尺
    const xScale = d3
        .scaleLinear()
        .domain([1978, 2021]) // 年份范围
        .range([0, width2]);

    // 创建Y轴比例尺
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d["人均可支配收入（元）"])]) // 可支配收入最大值
        .nice()
        .range([height2, 0]);

    // 创建X轴
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    // 创建Y轴
    const yAxis = d3.axisLeft(yScale)
        .ticks(10) // 控制刻度的数量
        .tickSizeInner(-width2) // 延伸刻度线到图表的右侧
        .tickSizeOuter(0); // 不延伸0刻度和最上面刻度的刻度线

    // 添加Y轴，并设置虚线样式
    svg2.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("line")
        .style("stroke-dasharray", "4,4") // 设置虚线的样式，4个实线，4个空白
        .style("stroke", "#888"); // 设置虚线的颜色

    // 添加X轴
    svg2
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height2})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.5em")
        .attr("transform", "rotate(-45)");//汉字倾斜

    // 创建连线生成器
    const line = d3
        .line()
        .x((d) => xScale(d.年份))
        .y((d) => yScale(d["人均可支配收入（元）"]));

    // 绘制连线
    svg2
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none") // 设置区域不填充
        .attr("stroke", "#58acfa"); // 设置连线颜色

    // 添加数据点
    svg2.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.年份))
        .attr("cy", d => yScale(d["人均可支配收入（元）"]))
        .attr("r", 4)
        .attr("fill", "#58acfa") // 设置数据点初始颜色
        .on("mouseover", function (event, d) {
            // 鼠标悬停时放大数据点，并修改颜色
            d3.select(this)
                .attr("r", 8)
                .attr("fill", "#6f1dbc");

            // 鼠标悬停时显示提示框
            tooltip.style("opacity", 1)
                .html(`年份: ${d.年份}<br>可支配收入: ${d["人均可支配收入（元）"]}元<br>同比增长: ${d["同比增长（%）"]}%`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px");
        })
        .on("mouseout", function () {
            // 鼠标移出时恢复数据点大小和颜色
            d3.select(this)
                .attr("r", 4)
                .attr("fill", "#6f1dbc");
            // 鼠标移出时隐藏提示框
            tooltip.style("opacity", 0);
        });



    // 添加标题
    svg2.append("text")
        .attr("class", "title")
        .attr("x", width2 / 2)
        .attr("y", -10)
        .style("text-anchor", "middle")
        .text("1978年-2021年中国人民人均可支配收入（元）");

    // 添加x轴标签
    svg2.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width2 / 2)
        .attr("y", height2 + 45)
        .style("text-anchor", "middle")
        .text("年份");

    // 添加y轴标签
    svg2.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height2 / 2)
        .attr("y", -45)
        .style("text-anchor", "middle")
        .text("人均可支配收入（元）");

});
