import React, { useRef, useEffect } from 'react'
import useResizeObserver from './useResizeObserver'
import { select, arc, pie, interpolate } from 'd3'

const GaugeChart = ({ data }) => {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)

    useEffect(() => {

        const svg = select(svgRef.current)
        if (!dimensions) return
        
        const arcGenerator = arc()
            .innerRadius(75)
            .outerRadius(150) 

        const pieGenerator = pie()
            .startAngle(-0.5 * Math.PI)
            .endAngle(0.5 * Math.PI)
            .sort(null)

        // console.log(data)
        // console.log(pieGenerator(data))

        const instructions = pieGenerator(data)

        svg
            .selectAll('.slice')
            .data(instructions)
            .join('path')
            .attr('class', 'slice')
            .attr('fill', (instructions, index) => index === 0 ? 'yellow' : '#eee')
            .style('transform', `translate(${dimensions.width /2}px, ${dimensions.height}px)`) //puts the chart in middle
            .transition()
            .attrTween('d', function(nextInstruction) {
                const interpolator = interpolate(this.lastInstruction, nextInstruction)
                this.lastInstruction = interpolator(1) // tells d3 to pick up the next interpolation/updat where the last update has finished. 
                return function(t) {
                    return arcGenerator(interpolator(t))
                }
            })

    }, [data, dimensions])
    

    return (
        <div ref={wrapper}>
            <svg ref={svgRef}>
            </svg>
        </div>
    )
}

export default GaugeChart


