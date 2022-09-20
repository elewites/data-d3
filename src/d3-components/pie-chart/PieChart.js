import React from 'react'
import { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3';
import './piechart.css'
import { group } from 'd3';

export default function PieChart() {
  //data use for pie chart
  const [data] = useState([
    { item: 'A', count: 50 },
    { item: 'B', count: 150 },
    { item: 'C', count: 200 },
    { item: 'D', count: 356 },
    { item: 'E', count: 70 }
  ])

  const piechart = useRef(null);

  useEffect(() => {

    //get positions for each data object
    const piedata = d3.pie().value(d => d.count)(data);
    //define arcs for graphing
    const arc = d3.arc().innerRadius(0).outerRadius(200);

    //color scale?
    const colors = d3.scaleOrdinal([`#292F36`, `#4ECDC4`, `#FDECEF`, `#FF6B6B`, `#FFE66D`]);

    //define svg size 
    const svg = d3.select(piechart.current)
      .attr('width', 500)
      .attr('height', 500)
    //.style('background-color', 'white')
    //.append('g')
    //.attr('transform', `translate(200,200)`)

    //draw pie
    const group = svg.append('g');


    group.attr('transform', `translate(250,250)`)
      .selectAll('path')
      .data(piedata)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))
      .attr('class', 'arc')


    console.log(piedata);
  }, [data])


  return (
    <div className='piechart-container'>
      <svg className="svg-container" ref={piechart}></svg>
    </div>
  )
}
