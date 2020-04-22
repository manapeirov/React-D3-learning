import React, { useRef, useEffect, useState, Fragment } from 'react'
import './App.css'

import Circles from './components/Circles'
import Line from './components/Line'
import LineWithAxes from './components/LineWithAxes'
import AnimatedBarChart from './components/AnimatedBarChart'
import InteractiveBarChart from './components/InteractiveBarChart'



function App() {

  return (
    <Fragment>
      {/* <Circles/> */}
      {/* <Line/> */}
      {/* <LineWithAxes/> */}
      {/* <AnimatedBarChart/> */}
      <InteractiveBarChart/>
    </Fragment>
  )
}

export default App







