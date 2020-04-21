import React, { useRef, useEffect, useState, Fragment } from 'react'
import './App.css'

import Circles from './components/Circles'
import Line from './components/Line'



function App() {

  return (
    <Fragment>
        {/* <Circles/> */}
      <Line/>
    </Fragment>
  )
}

export default App




// In pure React, to draw a connected line is svg, can use the line element or the path element
//path element is more powerful and takes the attribute d, which defines how your path is drawn, where it starts and ends etc:
//e.g. if you want it to start at 0 and go to 150, then 100 to 100, then 150,120

// function App() {
//   return(
//     <React.Fragment>
//       <svg>
//         <path d='M0,150 100,100 150,120' stoke='blue' fill='none' />
//       </svg>
//     </React.Fragment>
//   )
// }


