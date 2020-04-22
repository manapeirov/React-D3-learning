import React, { useEffect, useRef, Fragment, useState } from 'react'
import { select, line, curveCardinal } from 'd3'


const Line = () => {

    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        const myLine = line()
            .x((value, index) => index * 50 )
            .y((value => 150 - value))
            .curve(curveCardinal)

        svg
            .selectAll('path')
            .data([data])
            .join('path')
            .attr('d', value => myLine(value))
            .attr('fill', 'none')
            .attr('stroke', 'blue')
    }, [data])

    return (
        <Fragment>
            <svg ref={svgRef}></svg>
            <br />
          <button onClick={() => setData(data.map(value => value + 5))}>Update Data</button>
          <button onClick={() => setData(data.filter(value => value < 35 ))}>Filter Data</button>
        </Fragment>
    )
}


export default Line



// In pure React, to draw a connected line is svg, can use the line element or the path element
// path element is more powerful and takes the attribute d, which defines how your path is drawn, where it starts and ends etc so you give it data points. Each data point has an x and a y value thus the line is drawn accordingly: 
// e.g. first data point 0,150 
// Second data point is at 100,100
// Third data point is at 150,20:

// function App() {
//   return(
//     <React.Fragment>
//       <svg>
//         <path d='M0,150 100,100 150,120' stoke='blue' fill='none' />
//       </svg>
//     </React.Fragment>
//   )
// }

