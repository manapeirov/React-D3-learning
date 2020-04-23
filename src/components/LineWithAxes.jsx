import React, { useEffect, useRef, Fragment } from 'react'
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight } from 'd3'


const LineWithAxes = (props) => {

    const { data } = props
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)

        const xScale = scaleLinear()
            .domain([0, data.length -1])
            .range([0,300]) // Length of svg is 300

        const yScale = scaleLinear()
            .domain([0, 75])
            .range([150, 0]) // Height of svg is 150 this starts from the top of the page, so if you want line to start from the bottom, data point 0 must correspond with range 150

        const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1)
        svg
            .select('.x-axis')
            .style('transform', 'translateY(150px)')
            .call(xAxis)

        // // Line above is like doing something like this:
        // xAxis(svg.select('.x-axis'))
        // // as the xAxis requires an input with a selection to know where you would like to render it
        
        const yAxis = axisRight(yScale)
        svg 
            .select('.y-axis')
            .style('transform', 'translateX(300px)')
            .call(yAxis)

        const myLine = line()
            .x((value, index) => xScale(index) )
            .y(yScale)
            .curve(curveCardinal)

        svg
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
    }, [data])

    return (
        <Fragment>
            <svg ref={svgRef}>
                <g className='x-axis'/>
                <g className='y-axis'/>
            </svg>
            <br/>
            <br/>
            <br/>
        </Fragment>
    )
}


export default LineWithAxes