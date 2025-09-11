import * as d3 from "d3";
// import * as picasso from "picasso.js"



function Histogramc(data) {
  var years = ["1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016"];
  const years_num = years.length;
  console.log("years_num:", years_num);


  data = data.map(d => {
    if (d.winner_party === 'Republican') {
      return {
        ...d,
        winner_percent: (-Math.abs(d.winner_percent)).toString()
      };
    } else {
      return d;
    }
  });


  console.log("DATA:", data)
  console.log(233333)
  var array_data = [];
  // 一句话定义了众多变量， 定义了块儿的位置、宽高、小格子的边长等等与布局有关的变量
  var margin = { top: 50, right: 0, bottom: 100, left: 150 },
    width = 960 - margin.left - margin.right,        // 所有格子区域的宽度，即Heatmap的宽度
    height = 4000 - margin.top - margin.bottom,
    gridSize = Math.floor(width / years_num),    // 求地板，即去掉小数部分，width分成24份
    legendElementWidth = gridSize * 2,    // 底下长条的长度，是格子边长的两倍
    buckets = 9,        // 一共9种颜色级别
    colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];





  const data_2016 = data.filter(d => +d.year === 2016);
  console.log(data_2016);
  //console.log(data.map(d => d.year));

  const data_2012 = data.filter(d => +d.year === 2012);
  const data_2008 = data.filter(d => +d.year === 2008);
  const data_2004 = data.filter(d => +d.year === 2004);
  const data_2000 = data.filter(d => +d.year === 2000);
  console.log(data_2000.length);
  const data_1996 = data.filter(d => +d.year === 1996);
  const data_1992 = data.filter(d => +d.year === 1992);
  const data_1988 = data.filter(d => +d.year === 1988);
  const data_1984 = data.filter(d => +d.year === 1984);
  const data_1980 = data.filter(d => +d.year === 1980);
  const data_1976 = data.filter(d => +d.year === 1976);

  const data_years = [data_1976, data_1980, data_1984, data_1988, data_1992, data_1996, data_2000, data_2004, data_2008, data_2012, data_2016];



  //colorScale:颜色级别
  // var colorScale = d3.scaleQuantile()        // 按分位数取值，可使每个区域内元素个数相等
  //     .domain([0, buckets - 1, d3.max(data_2016, function (d) { return d.G; })])  // 定义域
  //     // domain([0, n, 数据的最大值]);
  //     .range(colors);    // 值域：是颜色数组，函数的返回值是代表某种颜色的字符串


  const colorScale = d3.scaleQuantile()
    .domain([-1, 1])
    .range(d3.schemeRdBu[9]);


  // 设置chart，svg
  var svg = d3.select("#svg1")
    // .append("svg") // 选择“chart”（就是div），加入一个svg，设置属性跟div一样大
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")    // 在svg内加入一个g（group组），并设置元素g的显示位置
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var dayLabels = svg.selectAll(".nameLabel")//y轴坐标//以2016年参与投票的州为例
    .data(data_2016)
    .enter()    // 为data中每一项创建一个".dayLabel"
    .append("text")    // 为days中每一项创建一的".dayLabel"添加文本，下面全是设置文本的属性
    .text(function (d, i) { console.log(data_2016[i].State); return data_2016[i].State; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "nameLabel mono axis axis-workweek" : "nameLabel mono axis"); }
    );

  var timeLabels = svg.selectAll(".testLabel")//x轴坐标
    .data(years)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", function (d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function (d, i) {
      return ((i >= 7 && i <= 16) ? "testLabel mono axis axis-worktime" : "testLabel mono axis");
    }
    );

  // 画出格子，暂不涂色，color[0]

  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < years_num; j++) {
      array_data[i * years_num + j] = data_years[j][i].winner_percent;

    }

  }



  var heatMap = svg.selectAll(".score")
    .data(array_data)
    .enter()        // 为data中每一项创建一个".hour"
    .append("rect")
    .attr("x", function (d, i) { return (i % years_num) * gridSize; })
    .attr("y", function (d, i) { return parseInt(i / years_num) * gridSize; })
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("class", "hour bordered")
    .attr("width", gridSize)
    .attr("height", gridSize)
    .style("fill", "#FFFFFF");

  // duration(1000) 在1000ns也就是1s内将格子图上色
  heatMap.transition().duration(1000)
    .style("fill", function (d) { return colorScale(d); });

  // 鼠标停留显示value
  heatMap.append("title").text(function (d) { return d.year; });

  // 画颜色标签
  var legend = svg.selectAll(".legend")
    .data([0].concat(colorScale.quantiles()), function (d) { return d; })    // 由data获得的元素个数为7
    .enter().append("g")
    .attr("class", "legend");

  legend.append("rect")
    .attr("x", function (d, i) { return legendElementWidth * i; })
    .attr("y", height)
    .attr("width", legendElementWidth)
    .attr("height", gridSize / 2)
    .style("fill", function (d, i) { return colorScale(d); });  //本来为colors[i]

  legend.append("text")
    .attr("class", "mono")
    .text(function (d) { return ">= " + Math.round(d); })
    .attr("x", function (d, i) { return legendElementWidth * i; })
    .attr("y", height + gridSize);



  return svg.node();
}

export default Histogramc;