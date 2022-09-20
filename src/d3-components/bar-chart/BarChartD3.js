import * as d3 from 'd3';
import "./barchart.css"

const url = "https://d3-react-f318b-default-rtdb.firebaseio.com/tallest-man.json";
const MARGIN = { TOP: 20, BOTTOM: 60, LEFT: 70, RIGHT: 0 }
const h = 400 - MARGIN.BOTTOM - MARGIN.TOP;
const w = 500 - MARGIN.LEFT - MARGIN.BOTTOM;
const band_padding = 0.2;
const FILL_COLOR = "#282c34";


export default class BarChartD3 {
  constructor(element) {
    const vis = this;
    vis.svg = d3.select(element)
      .append('svg')
      .attr("class", "bar-chart-svg ")
      .attr('height', h + MARGIN.BOTTOM + MARGIN.TOP)
      .attr('width', w + MARGIN.LEFT + MARGIN.BOTTOM)
      .append('g').attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    //x label
    vis.xLabel = vis.svg.append("text")
      .attr('x', w / 2)
      .attr('y', h + 45)
      .text('Men')
      .attr('font-size', 'smaller')
      .attr('text-anchor', 'middle')

    // y label
    vis.svg.append('text')
      .attr('x', - h / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .text('Height (cm)')
      .attr('transform', 'rotate(-90)')
      .attr('font-size', 'smaller')

    // x axis
    vis.xAxisGroup = vis.svg.append('g').attr('transform', `translate(0, ${h})`);
    vis.xAxisGroup.select('path')
      .attr('stroke', `${FILL_COLOR}`);
    vis.xAxisGroup.selectAll(".tick line")
      .attr("stroke", `${FILL_COLOR}`);
    vis.xAxisGroup.selectAll(".tick text")
      .attr("fill", `${FILL_COLOR}`);

    //y axis
    vis.yAxisGroup = vis.svg.append('g');

    Promise.all([
      d3.json("https://d3-react-f318b-default-rtdb.firebaseio.com/.json"),
      d3.json("https://tallest-women-7b754-default-rtdb.firebaseio.com/.json")
    ]).then(datasets => {

      vis.menData = datasets[0];
      vis.womenData = datasets[1];
      vis.update('men');

    }).catch(error => console.log(error));
  }

  update(gender) {
    const vis = this;
    vis.data = (gender === 'men' ? vis.menData : vis.womenData);
    vis.xLabel.text(`${gender}`);

    //scales
    const yScale = d3.scaleLinear()
      .domain([d3.min(vis.data, d => d.height) * 0.50, d3.max(vis.data, d => d.height)])
      .range([h, 0]);
    const xScale = d3.scaleBand().domain(
      vis.data.map(d => d.name))
      .range([0, w])
      .padding(band_padding)

    //x-axis
    const xAxisCall = d3.axisBottom(xScale);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);
    //x-axis styling
    vis.xAxisGroup.select('path')
      .attr('stroke', `${FILL_COLOR}`);
    vis.xAxisGroup.selectAll(".tick line")
      .attr("stroke", `${FILL_COLOR}`);
    vis.xAxisGroup.selectAll(".tick text")
      .attr("fill", `${FILL_COLOR}`);


    //y-axis
    const yaxisCall = d3.axisLeft(yScale);
    vis.yAxisGroup.transition().duration(500).call(yaxisCall);
    //y-axis styling
    vis.yAxisGroup.select('path')
      .attr('stroke', `${FILL_COLOR}`);
    vis.yAxisGroup.selectAll(".tick line")
      .attr("stroke", `${FILL_COLOR}`);
    vis.yAxisGroup.selectAll(".tick text")
      .attr("fill", `${FILL_COLOR}`)

    //draw bars
    const rects = vis.svg.selectAll('rect').data(vis.data);

    rects.join(
      function (enter) {
        return enter
          .append('rect')
          .attr('x', (d, i) => xScale(d.name))
          .attr('y', h)
          .attr('width', xScale.bandwidth)
          .attr('class', 'rects')
          .transition().duration(500)
          .attr('y', (d) => yScale(d.height))
          .attr('height', d => h - yScale(d.height))
      },

      function (update) {
        return update
          .transition().duration(500)
          .attr('x', (d, i) => xScale(d.name))
          .attr('y', (d) => yScale(d.height))
          .attr('width', xScale.bandwidth)
          .attr('height', d => h - yScale(d.height))
      },

      function (exit) {
        return exit.transition().duration(500)
          .attr('height', 0)
          .attr('y', h)
          .remove();
      }
    )
    //console.log(rects);
  }
}



