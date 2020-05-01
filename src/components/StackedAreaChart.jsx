import React, { useEffect, useState, Fragment, useRef } from 'react'
import { select, scaleLinear, max, axisBottom, axisLeft, stack, stackOrderAscending, area, scalePoint, curveCardinal } from 'd3'
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

        const xScale = scalePoint()
            .domain(data.map(entry => entry.year))
            .range([0, width])

        const yScale = scaleLinear()
            .domain(extent)
            .range([height, 0])

        const areaGenerator = area()
            .x(sequence => xScale(sequence.data.year))
            .y0(sequence => yScale(sequence[0]))
            .y1(sequence => yScale(sequence[1]))
            .curve(curveCardinal)

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
            .join('path')
            .attr('class', 'layer')
            .attr('fill', layer => {
                // console.log(layer)
                return colors[layer.key]
            })
            .attr('d', areaGenerator)
            // or
            // .attr('d', layer => areaGenerator(layer))


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