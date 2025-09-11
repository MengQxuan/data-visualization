import * as d3 from "d3";
import candidatesData from "./assets/datasets/candidates.csv"
import _2000 from "./assets/datasets/2000.csv"
import _2004 from "./assets/datasets/2004.csv"
import _2008 from "./assets/datasets/2008.csv"
import _2012 from "./assets/datasets/2012.csv"
import _2016 from "./assets/datasets/2016.csv"
import _2020 from "./assets/datasets/2020.csv"


console.log(candidatesData);
console.log("candidatesData");

// 设置画布大小和边距
var margin = { top: 60, right: 20, bottom: 30, left: 40 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// 创建SVG容器
var svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 创建提示框容器
var tooltip = d3.select("#scatterplot")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// 加载候选人数据
d3.csv(candidatesData).then(function (candidatesData) {
    // 获取所有的年份
    var years = candidatesData.map(function (d) { return d.year; }).filter((value, index, self) => self.indexOf(value) === index);

    // 将年份添加到选择器中
    d3.select("#year")
        .selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) { return d; })
    document.getElementById("year").addEventListener("change", function () {
        // console.log("Change event triggered!");
        updateScatterPlot(candidatesData);
    });

    // 显示总票数
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .text("Total Votes - " + d3.sum(candidatesData, function (d) { return d.candidate1; }) + " VS " + d3.sum(candidatesData, function (d) { return d.candidate2; }))
        .style("text-anchor", "middle")
        .style("font-size", "14px");

    // 初始化散点图
    updateScatterPlot(candidatesData);
});

// 更新散点图的函数
function updateScatterPlot(candidatesData) {
    var selectedYear = d3.select("#year").property("value");

    // 查找对应年份的候选人信息
    var selectedData = candidatesData.find(d => d.year === selectedYear);

    // 找到对应年份的CSV数据
    var filePath = "./assets/datasets/" + selectedYear + ".csv";
    if(selectedYear==2000)
    filePath=_2000;
    if(selectedYear==2004)
    filePath=_2004;
    if(selectedYear==2008)
    filePath=_2008;
    if(selectedYear==2012)
    filePath=_2012;
    if(selectedYear==2016)
    filePath=_2016;
    if(selectedYear==2020)
    filePath=_2020;


    console.log(filePath);
    

    // 重新读取CSV文件并更新散点图
    d3.csv(filePath).then(function (data) {
        console.log(data);
        console.log("cacac");
    
        // 将字符串数字转换为数字类型
        data.forEach(function (d) {
            d.candidate1 = +d.candidate1;
            d.candidate2 = +d.candidate2;
        });

        // 获取最大票数，用于计算点的半径
        var maxVotes = d3.max(data, function (d) { return Math.max(d.candidate1, d.candidate2); });

        // 创建比例尺
        var xScale = d3.scaleLinear()
            .domain([0, maxVotes])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, maxVotes])
            .range([height, 0]);

        // 创建比例尺，将得票数映射到合适的半径范围
        var radiusScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return Math.max(d.candidate1, d.candidate2); })])
            .range([5, 30]);

        // 移除先前的散点图
        svg.selectAll("circle").remove();

        // 添加新的散点图
        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", function (d) { return Math.random() * (width - 20); })
            .attr("cy", function (d) { return Math.random() * (height - 20); })
            .attr("r", function (d) { return radiusScale(Math.max(d.candidate1, d.candidate2)); })
            .style("fill", function (d) {
                return d.candidate1 > d.candidate2 ? "#00BFFF" : "#FA5858";
            })
            .on("mouseover", function (d) {
                // 显示提示框
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);

                // 获取候选人真实姓名
                var candidate1Name = candidatesData.find(candidate => candidate.year === d.year).candidate1;
                var candidate2Name = candidatesData.find(candidate => candidate.year === d.year).candidate2;

                tooltip.html(d.state + "<br/>" + candidate1Name + ": " + d.candidate1 + "<br/>" + candidate2Name + ": " + d.candidate2)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");

                // 高亮点
                d3.select(this)
                    .style("fill", "#A901DB"); // 修改成你想要的高亮颜色
            })
            .on("mouseout", function (d) {
                // 隐藏提示框
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);

                // 还原点的颜色
                d3.select(this)
                    .style("fill", function (d) {
                        return d.candidate1 > d.candidate2 ? "#00BFFF" : "#FA5858";
                    });
            });

        // 显示总票数
        svg.select("text")
            .text("Total Votes - " + d3.sum(data, function (d) { return d.candidate1; }) + " VS " + d3.sum(data, function (d) { return d.candidate2; }));

        // 显示选中年份的候选人信息
        showCandidateInfo(selectedData);
    });
}

// 显示候选人信息
function showCandidateInfo(data) {
    // 隐藏提示框
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);

    // 移除先前的文字
    svg.selectAll(".info-text").remove();
    console.log("da111a");

console.log(data);
    // 显示选中年份的候选人信息
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -40)
        .text(data.year + " - " + data.candidate1 + " VS " + data.candidate2)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("class", "info-text");
}
