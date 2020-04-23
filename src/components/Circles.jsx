import React, { useRef, useEffect, Fragment } from 'react'
import { select } from 'd3'



function Circles(props) {

  const { data } = props

  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value)
      .attr('cx', value => value * 2 )
      .attr('cy', value => value * 2 )
      .attr('stroke', 'red')
  }, [data])

  return (
      <Fragment>
          <svg ref={svgRef}></svg>
          <br />
      </Fragment>
  )

}

export default Circles


//To draw svg circles using pure React: 

// const data = [25, 30, 45, 60, 20]

// function App() {
//   return(
//     <Fragment>
//       <svg>
//         {data.map(value => (<circle r={value} />))}
//       </svg>
//     </Fragment>
//   )
// }
