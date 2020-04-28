
import React, { useEffect, useRef, useState } from 'react'
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3'
import useResizeObserver from './useResizeObserver'


const GeoChart = ({ data, property }) => {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
      
        // Use resizeObserver dimensions 
        // but fall back to getBoundingClientRect if no dimensions yet 
        // this is in place of if (!dimensions) return
        const { width, height } =
            dimensions || wrapper.current.getBoundingClientRect()

        const svg = select(svgRef.current)

        // Find the minimum and maximum values of the properties coming in through the property prop
        const minProp = min(data.features, feature => feature.properties[property])
        const maxProp = max(data.features, feature => feature.properties[property])
        // console.warn(minProp, maxProp)

        const colourScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(['#ccc', 'red'])

        // projects geo-coordinates on a 2D plane
        const projection = geoMercator().fitSize([width, height], selectedCountry || data) //dimenions will be the current width and height of svg
            .precision(100)

        // Takes geojson data,
        // transforms that into the d attribute of a path element 
        const pathGenerator = geoPath().projection(projection)

        // Generate a path element for every country in the world
        svg 
            .selectAll('.country')
            .data(data.features) // pass in te features array (features array defines all the countries)
            .join('path')
            .on('click', feature => {
                setSelectedCountry(selectedCountry === feature? null : feature)
            })
            .attr('class', 'country')
            .transition()
            .duration(1000)
            .attr('fill', feature => colourScale(feature.properties[property]))
            .attr('d', feature => pathGenerator(feature)) //or could do attr('d', pathGenerator)


    
        svg 
            .selectAll('.label')
            .data([selectedCountry])
            .join('text')
            .attr('class', 'label')
            .text(
                feature =>
                    feature &&
                        feature.properties.name + 
                            ':' +
                            feature.properties[property].toLocaleString()
            )
            .attr('x', 10)
            .attr('y', 25)


    }, [dimensions, property, data, selectedCountry])

    return (
        <div ref={wrapper} style={{ marginBottom: '2rem'}}>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default GeoChart