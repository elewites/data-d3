import React from 'react'
import { useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import { svg } from 'd3';


export default function ScatterPlot() {
  //fake data
  const [data] = useState(
    [
      [90, 20],
      [10, 40],
      [2, 80],
      [60, 35],
      [40, 75],
      [100, 100],
      [69, 85],
      [44, 50],
      [100, 5]
    ]);

  const svgRef = useRef(null);

  useEffect(() => {
    const w = 400;
    const h = 300;

    //setting up container
    const svg = d3.select(svgRef.current);
    svg.attr('width', w);
    svg.attr('height', h);
    svg.style('overflow', 'visible');
    svg.style('margin-top', '100px');
    svg.style('margin-bottom', '100px')

    //scaling
    const xscale = d3.scaleLinear().domain([0, 100]).range([0, w]);
    const yscale = d3.scaleLinear().domain([0, 100]).range([h, 0]);

    //setup axis
    const xAxis = d3.axisBottom(xscale).ticks(data.length);
    const yAxis = d3.axisLeft(yscale).ticks(10);
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`)
    svg.append('g').call(yAxis);

    //labelling
    svg.append('text').attr('x', w / 2).attr('y', h + 50).text('x').style('fill', 'white')
    svg.append('text').attr('y', h / 2).attr('x', -50).text('y').style('fill', 'white');

    //tooltip
    var tooltip = svg.append('div').
      style('opacity', '0')
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")

    const mouseover = (d) => {
      tooltip.style('opacity', 1)
    }

    const mousemove = function (d) {
      tooltip
        .html("this is here")
        .style("left", (d3.pointer(this)[0] + 90) + "px")
        .style("top", (d3.pointer(this)[1]) + "px")
    }

    var mouseleave = function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    svg.selectAll()
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xscale(d[0]))
      .attr('cy', d => yscale(d[1]))
      .attr('r', 3)
      .style('fill', 'white')
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)


  }, [data])



  return (
    <div>
      <svg ref={svgRef} ></svg>
    </div>
  )
}
