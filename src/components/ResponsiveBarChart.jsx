import React, { useEffect, useRef } from 'react'
import { select, scaleBand, scaleLinear, axisBottom, axisRight  } from 'd3'
import useResizeObserver from './useResizeObserver'

const ResponsiveBarChart = ({ data }) => {
    
    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)

    useEffect(() => {

        const svg = select(svgRef.current)
        // console.log(dimensions)

        if(!dimensions) return

        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, dimensions.width])
            .padding(0.5)
        
        const yScale = scaleLinear()
            .domain([0, 150])
            .range([dimensions.height, 0])

        const colourScale = scaleLinear()
            .domain([75, 100, 150])
            .range(['green', 'orange', 'red'])

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
        
        // svg
        //     .select('.x-axis')
        //     .style('transform', `translateY(${dimensions.height}px)`)
        //     .call(xAxis)

        //to dynamically append the <g> elements instead:
        svg
            .selectAll('.x-axis')
            .data([true])
            .join('g')
            .attr('class', 'x-axis')
            .style('transform', `translateY(${dimensions.height}px)`)
            .call(xAxis)


        const yAxis = axisRight(yScale)
        
        svg 
            .select('.y-axis')
            .style('transform', `translateX(${dimensions.width}px)`)
            .call(yAxis)

        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .style('transform', 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -dimensions.height)
            .attr('width', xScale.bandwidth())
            .on('mouseenter', (value, index) => {
                svg
                    .selectAll('.tooltip')
                    .data([value])
                    .join(enter => enter.append('text').attr('y', yScale(value) - 20))
                    .attr('class', 'tooltip')
                    .text(value)
                    .attr('x', xScale(index) + xScale.bandwidth() / 2 )
                    .attr('text-anchor', 'middle' )
                    .transition()
                    .attr('y', yScale(value) - 8)

            })
            .on('mouseleave', () => {
                svg
                    .selectAll('.tooltip')
                    .remove()
            })
            .transition()
            .attr('height', value => dimensions.height - yScale(value))
            .attr('fill', colourScale)
            
    }, [data, dimensions])

    return (
        <div ref={wrapper} style={{ marginBottom: '2rem'}}> 
            <svg ref={svgRef}>
                {/* <g className='x-axis' /> */}
                <g className='y-axis' />
            </svg>
        </div>
    )
}

export default ResponsiveBarChart

