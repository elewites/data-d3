import './App.css';
import { useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import { svg } from 'd3';
import PieChart from './d3-components/pie-chart/PieChart';



//bootstrap stylesheet and components
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import ScatterPlot from './d3-components/scatterplot/ScatterPlot';
import BarChartWrapper from './d3-components/bar-chart/BarChartWrapper';

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import GenderDropDown from './react-components/GenderDropDown';

function App() {

  const [gender, setGender] = useState('men');
  const selectGender = (gender) => setGender(gender);

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col xs={12}>
              <GenderDropDown genderSelection={selectGender} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <BarChartWrapper gender={gender} />
            </Col>
          </Row>
        </Container>
      </header>
    </div >
  );
}

export default App;
