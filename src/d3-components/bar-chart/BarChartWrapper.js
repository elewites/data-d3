import { React, useRef, useState, useEffect } from 'react'
import BarChartD3 from './BarChartD3';

import { Component } from 'react'

export default class BarChartWrapper extends Component {

  componentDidMount() {
    this.setState({
      chart: new BarChartD3(this.refs.chart)
    })
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.gender);
  }

  render() {
    return (
      <div ref="chart"></div>
    )
  }
}
