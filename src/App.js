import React, {  useState, Fragment } from 'react'
import './App.css'

import Circles from './components/Circles'
import Line from './components/Line'
import LineWithAxes from './components/LineWithAxes'
import AnimatedBarChart from './components/AnimatedBarChart'
import InteractiveBarChart from './components/InteractiveBarChart'
import ResponsiveBarChart from './components/ResponsiveBarChart'



function App() {
  
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75])
 
  return (
    <Fragment>
      {/* <Circles data={data} /> */}
      {/* <Line data={data} /> */}
      {/* <LineWithAxes data={data} /> */}
      {/* <AnimatedBarChart data={data} /> */}
      {/* <InteractiveBarChart data={data} /> */}
      <ResponsiveBarChart data={data}/>
      <br/>
      <br/>
      <button onClick={() => setData(data.map(value => value +5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter(value=> value < 35))}>
        Filter Data
      </button>
      <button onClick={() => setData([...data, Math.floor(Math.random() * 100)])}>
        Add Data
      </button> 
      {/* Math.Random generates a random number between 0 and 1 e.g 0.4356475, if you want to generate a number between 0 and 100 have to times by 100. If you dont want the decimal places and want a whole number, pass it into math.floor(), this ronuds down to nearest whole numb*/}
    </Fragment>
  )
}

export default App







