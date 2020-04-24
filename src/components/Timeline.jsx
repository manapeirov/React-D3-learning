import React, { useEffect, useRef,  } from 'react'
import { select, min, max, scaleTime, axisBottom, scaleLinear } from 'd3'
import useResizeObserver from './useResizeObserver'


const getDate = dateString => {
    const date = dateString.split('-')
    return new Date(date[2], date[0]-1, date[1])
}

const Timeline = ({ data, highlight }) => {

    const wrapper = useRef()
    const svgRef = useRef()
    const dimensions = useResizeObserver(wrapper)

    useEffect(() => {

        const svg = select(svgRef.current)

        if (!dimensions) return

        const minDate = min(data, episode => getDate(episode.air_date))
        const maxDate = max(data, episode => getDate(episode.air_date))

        // console.log(minDate)
        // console.log(maxDate)
        
        const xScale = scaleTime()
            .domain([minDate, maxDate])
            .range([0, dimensions.width])
        
        const yScale = scaleLinear()
            .domain([max(data, episode => episode.characters.length), 0])
            .range([0, dimensions.height])

        const xAxis = axisBottom(xScale)

        svg
            .select('.x-axis')
            .style('transform', `translateY(${dimensions.height}px)`)
            .call(xAxis)

        svg
            .selectAll('.episode')
            .data(data)
            .join('line')
            .attr('class', 'episode')
            .attr('x1', episode => xScale(getDate(episode.air_date)))
            .attr('y1', dimensions.height)
            .attr('x2', episode => xScale(getDate(episode.air_date)))
            .attr('y2', episode => yScale(episode.characters.length)) //pass the length of chracters in that particular episode to y scale to generate y coordinate in pixels.
            .transition()
            .attr('stroke', episode => episode.characters.includes(highlight) ? 'blue' : 'black')
            

    }, [data, highlight, dimensions])

    return (
        <div ref={wrapper} style={{ marginBottom: '2rem' }}>
            <svg ref={svgRef}>
                <g className='x-axis'/>
            </svg>
        </div>
    )

}

export default Timeline 