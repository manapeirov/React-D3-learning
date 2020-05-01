import React, { useEffect, useState, Fragment, useRef } from 'react'
import { select, scaleBand, scaleLinear, min, max, axisBottom, axisLeft, stack, stackOrderAscending, stackOrderInsideOut } from 'd3'
import useResizeObserver from './useResizeObserver'


const StackedBarChart = ({ data, keys, colors }) => {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)

    useEffect(() => {

        const svg = select(svgRef.current)

        const { width, height } =
            dimensions || wrapper.current.getBoundingClientRect()


        const stackGenerator = stack()
            .keys(keys)
            .order(stackOrderAscending)
        
        const layers = stackGenerator(data)
        const extent = [0, max(layers, layer => max(layer, sequence => sequence[1]))]
        // console.log(stackGenerator(data))
        // console.log(extent)

        const xScale = scaleBand()
            .domain(data.map(entry => entry.year))
            .range([0, width])
            .padding(0.25)

        
        const yScale = scaleLinear()
            .domain(extent)
            .range([height, 0])

        const xAxis = axisBottom(xScale)
    
        const yAxis = axisLeft(yScale)

        svg 
            .select('.x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis)

        svg
            .select('.y-axis')
            .call(yAxis)

        svg 
            .selectAll('.layer')
            .data(layers)
            .join('g')
            .attr('class', 'layer')
            .attr('fill', layer => {
                // console.log(layer)
                return colors[layer.key]
            })
            .selectAll('.rect')
            .data(layer => layer)
            .join('rect')
            .attr('class', 'rect')
            .attr('x', sequence => {
                // console.log(sequence)
                return xScale(sequence.data.year)
            })
            .attr('width', xScale.bandwidth())
            .attr('y', sequence => yScale(sequence[1]))
            .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))
            

    }, [data, keys, colors, dimensions])
    
    return (
        <Fragment>
            <div ref={wrapper} style={{ marginBottom: '2rem' }} >
                <svg ref={svgRef}>
                    <g className='x-axis'/>
                    <g className='y-axis' />
                </svg>
            </div>
        </Fragment>
    )
}

export default StackedBarChart