import * as d3 from "d3";
import * as topojson from "topojson";

function linez(xinrow,us) {
  console.log("bbbbbbbbbbbbbbbbb");
  const xin=xinrow.filter(d => +d.year === 2012); 
  console.log(xinrow);
  console.log("raw");
  console.log(xin);
  console.log(xin);


    const color = d3.scaleQuantize([-1, 1], d3.schemeRdYlBu[9]);
    const path = d3.geoPath();
    const format = d => `${d}%`;
   // 从CSV文件中加载数据

  const chartContainer = d3.select("#svg5");

  
  // 初始时显示最新年份的信息
  //updateChart();



    //const valuemap = new Map(data.map(d => [d.id, d.rate]));
    //console.log(valuemap);
    //const valuemap2 = new Map(xin.map(d => [d.id, d.rate]));

    const valuemap2 = new Map(xin.map(d => [(d.county_fips), d.RATE]));

    // The counties feature collection is all U.S. counties, each with a
    // five-digit FIPS identifier. The statemap lets us lookup the name of 
    // the state that contains a given county; a state’s two-digit identifier
    // corresponds to the first two digits of its counties’ identifiers.
    const counties = topojson.feature(us, us.objects.counties);
    const states = topojson.feature(us, us.objects.states);
    console.log("qqqqqqqqqqq");

    console.log(states);

    const statemap = new Map(states.features.map(d => [(d.id), d]));

    // The statemesh is just the internal borders between states, i.e.,
    // everything but the coastlines and country borders. This avoids an
    // additional stroke on the perimeter of the map, which would otherwise
    // mask intricate features such as islands and inlets. (Try removing
    // the last argument to topojson.mesh below to see the effect.)
    const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  
    const svgq = d3.select("#svg3")

      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");
  // 添加时间轴选择器
  // const selectContainer = svgq.append("div")
  //     .attr("class", "select-container");
  //   const uniqueYears = Array.from(new Set(xin.map(d => +d.year)));
  //     svgq.append("label")
  //     .text("选择年份:");

  // const yearSelect = selectContainer.append("select")
  //     .on("change", updateChart);

  

  // yearSelect.selectAll("option")
  //     .data(uniqueYears)
  //     .enter()
  //     .append("option")
  //     .attr("value", d => d)
  //     .text(d => d);

    svgq.append("g")
      .attr("transform", "translate(610,20)")
      //.append(() => Legend(color, { title: "Unemployment rate (%)", width: 260 }));
  
    svgq.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .attr("fill", d => color(valuemap2.get(d.id)))
      .attr("d", path)
      .append("title")
      .text(d => `${d.properties.name}, ${statemap.get(d.id.slice(0, 2)).properties.name}\n${valuemap2.get(d.id)}%`);
  
    svgq.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  


    const svg = d3.select("#svg2")

      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");
  
    svg.append("g")
      .attr("transform", "translate(610,20)")
      //.append(() => Legend(color, { title: "Unemployment rate (%)", width: 260 }));
  
    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .attr("fill", d => color(valuemap2.get(d.id)))
      .attr("d", path)
      .append("title")
      .text(d => `${d.properties.name}, ${statemap.get(d.id.slice(0, 2)).properties.name}\n${valuemap2.get(d.id)}%`);
  
    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
    return svg.node();
  }
  export default linez;