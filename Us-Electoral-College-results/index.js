// // 设置画布大小和边距
// var margin = { top: 60, right: 20, bottom: 30, left: 30 },
//     width = 800 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // 创建SVG容器
// var svg = d3.select("#scatterplot")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // 创建提示框容器
// var tooltip = d3.select("#scatterplot")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// // 加载经纬度数据
// d3.csv("./datasets/LongitudeAndLatitude.csv").then(function (stateCoordinates) {
//     // 显示总票数
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", -20)
//         .text("Total Votes - 0 VS 0")
//         .style("text-anchor", "middle")
//         .style("font-size", "14px");

//     // 加载候选人数据
//     d3.csv("./datasets/candidates.csv").then(function (candidatesData) {
//         // 获取所有的年份
//         var years = candidatesData.map(function (d) { return d.year; }).filter((value, index, self) => self.indexOf(value) === index);

//         // 将年份添加到选择器中
//         d3.select("#year")
//             .selectAll("option")
//             .data(years)
//             .enter()
//             .append("option")
//             .attr("value", function (d) { return d; })
//             .text(function (d) { return d; });

//         // 初始化散点图
//         updateScatterPlot(candidatesData, stateCoordinates);

//         // 监听年份选择变化事件
//         document.getElementById("year").addEventListener("change", function () {
//             updateScatterPlot(candidatesData, stateCoordinates);
//         });
//     });
// });

// // 更新散点图的函数
// function updateScatterPlot(candidatesData, stateCoordinates) {
//     var selectedYear = d3.select("#year").property("value");

//     // 查找对应年份的候选人信息
//     var selectedData = candidatesData.find(d => d.year === selectedYear);

//     // 找到对应年份的CSV数据
//     var filePath = "./datasets/" + selectedYear + ".csv";

//     // 重新读取CSV文件并更新散点图
//     d3.csv(filePath).then(function (data) {
//         // 将字符串数字转换为数字类型
//         data.forEach(function (d) {
//             d.candidate1 = +d.candidate1;
//             d.candidate2 = +d.candidate2;
//         });

//         // 获取最大票数，用于计算点的半径
//         var maxVotes = d3.max(data, function (d) { return Math.max(d.candidate1, d.candidate2); });

//         // 创建比例尺
//         // 创建比例尺
//         var xScale = d3.scaleLinear()
//             .domain([d3.min(stateCoordinates, function (d) { return d.longitude; }) - 10, d3.max(stateCoordinates, function (d) { return d.longitude; }) + 10])
//             .range([200, width * 0.49]);

//         var yScale = d3.scaleLinear()
//             .domain([d3.min(stateCoordinates, function (d) { return d.latitude; }), d3.max(stateCoordinates, function (d) { return d.latitude; })])
//             .range([height, 0]);

//         // 创建比例尺，将得票数映射到合适的半径范围
//         var radiusScale = d3.scaleLinear()
//             .domain([0, maxVotes])
//             .range([5, 35]);

//         // 移除先前的散点图
//         svg.selectAll("circle").remove();

//         // 添加新的散点图
//         svg.selectAll("circle")
//             .data(data)
//             .enter().append("circle")
//             .attr("cx", function (d) { return xScale(stateCoordinates.find(state => state.state === d.state).longitude); })
//             .attr("cy", function (d) { return yScale(stateCoordinates.find(state => state.state === d.state).latitude); })
//             .attr("r", function (d) { return radiusScale(Math.max(d.candidate1, d.candidate2)); })
//             .style("fill", function (d) {
//                 d.pointerColor = d.candidate1 > d.candidate2 ? "#00BFFF" : "#FA5858";
//                 return d.pointerColor
//             })
//             .on("mouseover", function (d) {
//                 // 显示提示框
//                 tooltip.transition()
//                     .duration(200)
//                     .style("opacity", 0.9);

//                 // 获取候选人真实姓名
//                 var candidate1Name = candidatesData.find(candidate => candidate.year === d.year).candidate1;
//                 var candidate2Name = candidatesData.find(candidate => candidate.year === d.year).candidate2;

//                 tooltip.html('<span style="font-size: 18px; font-weight: bold;">' + d.state + "</span><br/>" + '<span style="color:#00BFFF;">' + candidate1Name + ": " + d.candidate1 + "</span><br/>" + '<span style="color:#FA5858;">' + candidate2Name + ": " + d.candidate2 + "</span>")
//                     .style("left", (d3.event.pageX) + "px")
//                     .style("top", (d3.event.pageY - 28) + "px");

//                 // 高亮点
//                 d3.select(this)
//                     .style("fill", "#A901DB"); // 修改成你想要的高亮颜色
//             })
//             .on("mouseout", function (d) {
//                 // 隐藏提示框
//                 tooltip.transition()
//                     .duration(500)
//                     .style("opacity", 0);

//                 // 还原点的颜色
//                 d3.select(this)
//                     .style("fill", function (d) {
//                         return d.candidate1 > d.candidate2 ? "#00BFFF" : "#FA5858";
//                     });
//             });

//         svg.select("text")
//             .text("Total Votes - ")
//             .style("font-size", "18px")
//             .append("tspan")
//             .text(d3.sum(data, function (d) { return d.candidate1; }))
//             .style("fill", "#00BFFF")
//             .style("font-size", "18px")
//             .append("tspan")
//             .text(" VS ")
//             .style("fill", "black")
//             .style("font-size", "16px")
//             .append("tspan")
//             .text(d3.sum(data, function (d) { return d.candidate2; }))
//             .style("fill", "#FA5858")
//             .style("font-size", "18px");

//         // 显示选中年份的候选人信息
//         showCandidateInfo(selectedData);
//     });
// }

// // 显示候选人信息
// function showCandidateInfo(data) {
//     // 隐藏提示框
//     tooltip.transition()
//         .duration(500)
//         .style("opacity", 0);

//     // 移除先前的文字
//     svg.selectAll(".info-text").remove();

//     // 显示选中年份的候选人信息
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", -40)
//         .text(data.year + " - ")
//         .style("text-anchor", "middle")
//         .style("font-size", "24px")
//         .attr("class", "info-text")
//         .append("tspan")
//         .text(data.candidate1)
//         .style("fill", "#00BFFF")
//         .append("tspan")
//         .text(" VS ")
//         .style("fill", "#000000")
//         .append("tspan")
//         .text(data.candidate2)
//         .style("fill", "#FA5858");
// }





// 定义图表边距和大小
var margin = { top: 60, right: 20, bottom: 30, left: 30 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// 创建SVG容器
var svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 创建提示框
var tooltip = d3.select("#scatterplot")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// 读取州的经纬度信息
d3.csv("./datasets/LongitudeAndLatitude.csv").then(function (stateCoordinates) {
    // 在图表中添加总选票信息文本
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .text("Total Votes - 0 VS 0")
        .style("text-anchor", "middle")
        .style("font-size", "14px");

    // 读取候选人数据
    d3.csv("./datasets/candidates.csv").then(function (candidatesData) {
        // 获取所有的年份
        var years = candidatesData.map(function (d) { return +d.year; }).filter((value, index, self) => self.indexOf(value) === index);
        // 创建每四年一个单位的区间
        var yearsInterval = d3.range(years[0], years[years.length - 1] + 1, 4);
        var selectedYear = yearsInterval[0];

        // 初始化散点图
        updateScatterPlot(candidatesData, stateCoordinates, selectedYear);

        // 创建年份选择滑块
        var sliderContainer = d3.select("#scatterplot")
            .append("div")
            .attr("class", "slider-container");

        var sliderLabel = sliderContainer.append("div")
            .attr("class", "slider-label")
            .text("Select Year : " + selectedYear)
            .style("font-size", "18px");

        var slider = sliderContainer.append("input")
            .attr("type", "range")
            .attr("min", d3.min(yearsInterval))
            .attr("max", d3.max(yearsInterval))
            .attr("step", 4)
            .property("value", selectedYear);

        slider.on("input", function () {
            // 当滑块值变化时，更新散点图
            var currentYear = +this.value;
            sliderLabel.text("Select Year : " + currentYear);
            updateScatterPlot(candidatesData, stateCoordinates, currentYear);
        });
    });
});

// 更新散点图函数
function updateScatterPlot(candidatesData, stateCoordinates, selectedYear) {
    // 找到对应年份的候选人信息
    var selectedData = candidatesData.find(d => d.year.toString() === selectedYear.toString());

    // 构建对应年份的数据文件路径
    var filePath = "./datasets/" + selectedYear + ".csv";

    // 读取对应年份的数据
    d3.csv(filePath).then(function (data) {
        // 数据预处理，将字符串转换为数字
        data.forEach(function (d) {
            d.candidate1 = +d.candidate1;
            d.candidate2 = +d.candidate2;
        });

        // 计算最大选票数
        var maxVotes = d3.max(data, function (d) { return Math.max(d.candidate1, d.candidate2); });

        // 创建比例尺
        var xScale = d3.scaleLinear()
            .domain([d3.min(stateCoordinates, function (d) { return d.longitude; }) - 10, d3.max(stateCoordinates, function (d) { return d.longitude; }) + 10])
            .range([200, width * 0.49]);

        var yScale = d3.scaleLinear()
            .domain([d3.min(stateCoordinates, function (d) { return d.latitude; }), d3.max(stateCoordinates, function (d) { return d.latitude; })])
            .range([height, 0]);

        var radiusScale = d3.scaleLinear()
            .domain([0, maxVotes])
            .range([5, 35]);

        // 移除之前的所有圆点
        svg.selectAll("circle").remove();

        // 添加新的圆点
        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", function (d) { return xScale(stateCoordinates.find(state => state.state === d.state).longitude); })
            .attr("cy", function (d) { return yScale(stateCoordinates.find(state => state.state === d.state).latitude); })
            .attr("r", function (d) { return radiusScale(Math.max(d.candidate1, d.candidate2)); })
            .style("fill", function (d) {
                // 根据选票比例确定填充颜色
                d.pointerColor = d.candidate1 > d.candidate2 ? "#00BFFF" : "#FA5858";
                return d.pointerColor
            })
            .on("mouseover", function (d) {
                // 鼠标悬停时显示提示框
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);

                var candidate1Name = candidatesData.find(candidate => candidate.year === d.year).candidate1;
                var candidate2Name = candidatesData.find(candidate => candidate.year === d.year).candidate2;

                // 更新提示框内容和位置
                tooltip.html('<span style="font-size: 18px; font-weight: bold;">' + d.state + "</span><br/>" + '<span style="color:#00BFFF;">' + candidate1Name + ": " + d.candidate1 + "</span><br/>" + '<span style="color:#FA5858;">' + candidate2Name + ": " + d.candidate2 + "</span>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");

                // 改变圆点颜色
                d3.select(this)
                    .style("fill", "#A901DB");
            })
            .on("mouseout", function (d) {
                // 鼠标移出时隐藏提示框
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);

                // 恢复圆点颜色
                d3.select(this)
                    .style("fill", function (d) {
                        return d.candidate1 > d.candidate2 ? "#00BFFF" : "#FA5858";
                    });
            });

        // 更新总选票信息文本
        svg.select("text")
            .text("Total Votes - ")
            .style("font-size", "18px")
            .append("tspan")
            .text(d3.sum(data, function (d) { return d.candidate1; }))
            .style("fill", "#00BFFF")
            .style("font-size", "18px")
            .append("tspan")
            .text(" VS ")
            .style("fill", "black")
            .style("font-size", "16px")
            .append("tspan")
            .text(d3.sum(data, function (d) { return d.candidate2; }))
            .style("fill", "#FA5858")
            .style("font-size", "18px");

        // 显示候选人信息
        showCandidateInfo(selectedData);
    });
}

// 显示候选人信息函数
function showCandidateInfo(data) {
    // 隐藏提示框
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);

    // 移除之前的所有信息文本
    svg.selectAll(".info-text").remove();

    // 添加新的信息文本
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -40)
        .text(data.year + " - ")
        .style("text-anchor", "middle")
        .style("font-size", "24px")
        .attr("class", "info-text")
        .append("tspan")
        .text(data.candidate1)
        .style("fill", "#00BFFF")
        .append("tspan")
        .text(" VS ")
        .style("fill", "#000000")
        .append("tspan")
        .text(data.candidate2)
        .style("fill", "#FA5858");
}