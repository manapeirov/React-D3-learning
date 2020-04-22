import React, { useRef, useEffect, useState, Fragment } from 'react'
import './App.css'

import Circles from './components/Circles'
import Line from './components/Line'
import LineWithAxes from './components/LineWithAxes'



function App() {

  return (
    <Fragment>
      {/* <Circles/> */}
      {/* <Line/> */}
      <LineWithAxes align='center'/>
    </Fragment>
  )
}

export default App







