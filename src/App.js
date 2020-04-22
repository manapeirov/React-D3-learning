import React, { useRef, useEffect, useState, Fragment } from 'react'
import './App.css'

import Circles from './components/Circles'
import Line from './components/Line'
import LineWithAxes from './components/LineWithAxes'
import InteractiveBarChart from './components/InteractiveBarChart'



function App() {

  return (
    <Fragment>
      {/* <Circles/> */}
      {/* <Line/> */}
      {/* <LineWithAxes/> */}
      <InteractiveBarChart/>
    </Fragment>
  )
}

export default App







