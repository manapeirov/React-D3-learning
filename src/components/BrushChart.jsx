import React, { useRef, useEffect, useState, Fragment } from 'react'
import useResizeObserver from './useResizeObserver'
import { 
    select, 
    scaleLinear, 
    axisBottom, 
    axisLeft, 
    line, 
    curveCardinal, 
    max, 
    brushX,
    event
} from 'd3'
import usePrevious from './usePrevious'

const BrushChart = ({ data }) => {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)
    const [selection, setSelection] = useState([0, 1.5])
    const previousSelection = usePrevious(selection)

    useEffect(() => {

        const svg = select(svgRef.current)

        const { width, height } =
            dimensions || wrapper.current.getBoundingClientRect()

        // const maxDataValue = max(data, entry => entry)
        // This is the same as
        // const maxDataValue = max(data)

        const xScale = scaleLinear()
            .domain([0, data.length - 1 ])
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
            .attr('fill', 'none')
            .attr('stroke', 'black')

        svg 
            .selectAll('.dot')
            .data(data)
            .join('circle')
            .attr('class', 'dot')
            .attr('r', (entry, index) => index >= selection[0] && index <= selection[1]? 4 : 2)
            .attr('cx', (entry, index) => xScale(index))
            .attr('cy', yScale)
            .attr('stroke', (entry, index) => index >= selection[0] && index <= selection[1] ? 'orange' : 'black')
            .attr('fill', (entry, index) => index >= selection[0] && index <= selection[1] ? 'orange' :'black')

        
        // Brush
        const brush = brushX().extent([
            [0, 0], 
            [width, height]
        ]).on('start brush end', () => {
            
            if (event.selection) {
                const indexSelection = event.selection.map(xScale.invert)
                setSelection(indexSelection)
                // same as:
                // const indexSelection = event.selection.map(pxValue => xScale.invert(pxValue))
                // console.log(indexSelection)
            }
            console.log(selection)
        })

        if (previousSelection === selection) {
            svg
            .select('.brush')
            .call(brush)
            .call(brush.move, selection.map(xScale)) // xScale will convert the index values in selection into px values 
            // or could hard code the range:
            // .call(brush.move, [0, 100]) // brush takes in pixel values as a range not index values 
        }
        
        
    }, [data, dimensions, selection, previousSelection])


    return (
        <Fragment>
            <div ref={wrapper} style={{ marginBottom: '2rem'}}>
                <svg ref={svgRef}>
                    <g className='x-axis' />
                    <g className='y-axis' />
                    <g className='brush' />
                </svg>
            </div>
            <small >
                Selected values: [
                    { data.filter((entry, index) => index >= selection[0] && index <= selection[1])
                    .join(',')}
                ]
            </small>
        </Fragment>
    )
}

export default BrushChart