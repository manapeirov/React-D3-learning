import React, { useEffect, useState, useRef, Fragment } from 'react'
import { select, scaleLinear, axisBottom, axisLeft, max, line, curveCardinal, brushX, event } from 'd3'

import useResizeObserver from './useResizeObserver'
import usePrevious from './usePrevious'

const BrushChartPartTwo = ({ data, children }) => {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)
    const [selection, setSelection] = useState([0, 1.5])
    const previousSelection = usePrevious(selection)

    useEffect(() => {

        const svg = select(svgRef.current)

        const { width, height } =
            dimensions || wrapper.current.getBoundingClientRect()

        const xScale = scaleLinear()
            .domain([0, data.length])
            .range([0, width])
        
        const yScale = scaleLinear()
            .domain([0, max(data)])
            .range([height, 0])

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

        const myLine = line()
            .x((entry, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal)

        svg 
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine)
            .attr('stroke', 'black')
            .attr('fill', 'none')

        svg 
            .selectAll('.dot')
            .data(data)
            .join('circle')
            .attr('class', 'dot')
            .attr('r', (entry, index) => index >= selection[0] && index <= selection[1] ? 4 : 2 )
            .attr('cx', (entry, index) => xScale(index))
            .attr('cy', yScale)
            .attr('fill', (entry, index) => index >= selection[0] && index <= selection[1] ? 'orange' : 'black')
            .attr('stroke', (entry, index) => index >= selection[0] && index <= selection[1] ? 'orange' : 'black') 
        

        const brush = brushX()
            .extent([
                [0, 0],
                [width, height]
            ]).on('start brush end', () => {
                if (event.selection) {
                    const indexSelection = event.selection.map(xScale.invert)

                    setSelection(indexSelection)
                }
            })

        
        if (previousSelection === selection) {
            
            svg
            .select('.brush')
            .call(brush)
            .call(brush.move, selection.map(xScale))

        }




    }, [data, dimensions, selection, previousSelection])

    return (
        <Fragment>
            <div ref={wrapper} style={{ marginBottom: '2rem' }}>
                <svg ref={svgRef}>
                    <g className='x-axis'/>
                    <g className='y-axis' />
                    <g className='brush' />
                </svg>
            </div>
            {children(selection)}
        </Fragment>
    )
}

export default BrushChartPartTwo