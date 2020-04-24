import React, { useEffect, useRef } from 'react'
import useResizeObserver from './useResizeObserver'
import { select, scaleBand, scaleLinear, max  } from 'd3'

const RacingBarChart = ({ data }) => {


    const wrapper = useRef()
    const svgRef = useRef()
    const dimensions = useResizeObserver(wrapper)

    //will be called initially and on every data change + dimensions change 
    useEffect(() => {
        const svg = select(svgRef.current)

        if (!dimensions) return

        const yScale = scaleBand()
            .domain(data.map((entry, index) => index))
            .range([0, dimensions.height])
            .padding(0.1)

        const xScale = scaleLinear()
            .domain([0, max(data, entry => entry.value)])
            .range([0, dimensions.width])

        svg
            .selectAll('.bar')
            .data(data, (entry, index) => entry.name)
            .join(enter => enter.append('rect').attr('y', (entry, index) => yScale(index)))
            .attr('class', 'bar')
            .attr('fill', entry => entry.color)
            .attr('x', 0)
            .attr('height', yScale.bandwidth())
            .transition()
            .attr('y', (entry, index) => yScale(index))
            .attr('width', entry => xScale(entry.value))

        svg 
            .selectAll('.label')
            .data(data, (entry, index) => entry.name)
            .join(enter => enter.append('text').attr('y', (entry, index) => yScale(index) + yScale.bandwidth()/1.5))
            .attr('class', 'label')
            .text(entry => `🐎 ...${entry.name} (${entry.value} metres)`)
            .attr('x', 10)
            .transition()
            .attr('y', (entry, index) => yScale(index) + yScale.bandwidth()/1.5)

    }, [data, dimensions])


    return (
        <div ref={wrapper} style={{ marginBottom: '2rem' }}>
            <svg ref={svgRef}>
            </svg>
        </div>
    )

}

export default RacingBarChart