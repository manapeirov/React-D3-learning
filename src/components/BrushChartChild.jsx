import React, { useEffect, useState, useRef, Fragment } from 'react'
import { select, scaleLinear, axisBottom, axisLeft, max, line, curveCardinal, brushX, event } from 'd3'

import useResizeObserver from './useResizeObserver'

const BrushChartPartTwo = ({ data, selection, id = 'myClipPath' }) => {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)

    useEffect(() => {

        const svg = select(svgRef.current)
        const content = svg.select('.content')

        const { width, height } =
            dimensions || wrapper.current.getBoundingClientRect()

        const xScale = scaleLinear()
            .domain(selection)
            .range([10, width - 10])
        
        const yScale = scaleLinear()
            .domain([0, max(data)])
            .range([height - 10 , 10])

        const xAxis = axisBottom(xScale)

        const yAxis = axisLeft(yScale)

        svg
            .select('.x-axis')
            .style('transform', `translateY(${height}px)`)
            .call(xAxis)

        svg
            .select('.y-axis')
            .style('transform', `translateX(${width})px`)
            .call(yAxis)

        const lineGenerator = line()
            .x((entry, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal)

        content 
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('d', lineGenerator)
            .attr('stroke', 'black')
            .attr('fill', 'none')

        content  
            .selectAll('.dot')
            .data(data)
            .join('circle')
            .attr('class', 'dot')
            .attr('r', (entry, index) => index >= selection[0] && index <= selection[1] ? 4 : 2 )
            .attr('cx', (entry, index) => xScale(index))
            .attr('cy', yScale)
            .attr('fill', (entry, index) => index >= selection[0] && index <= selection[1] ? 'orange' : 'black')
            .attr('stroke', (entry, index) => index >= selection[0] && index <= selection[1] ? 'orange' : 'black') 
        

    }, [data, dimensions, selection])

    return (
        <Fragment>
            <div ref={wrapper} style={{ marginBottom: '2rem' }}>
                <svg ref={svgRef}>
                    <defs>
                        <clipPath id={id}>
                            <rect x='0' y='0' width='100%' height='100%' />
                        </clipPath>
                    </defs>
                    <g className='content' clipPath={`url(#${id})`}/>
                    <g className='x-axis'/>
                    <g className='y-axis' />
                </svg>
            </div>
        </Fragment>
    )
}

export default BrushChartPartTwo

