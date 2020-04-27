import React, { useRef, useEffect } from 'react'
import useResizeObserver from './useResizeObserver'
import { select, hierarchy, tree, linkHorizontal } from 'd3'


const usePrevious = value => {
    
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}


const TreeChart = ({ data }) => {
    
    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)

    // Save data to see if it has changed
    const previouslyRenderedData = usePrevious(data)

    useEffect(() => {

        const svg = select(svgRef.current)

        // Instead of: if (!dimensions) return 
        // use getBoundClientRect on initial render
        const { width, height } = 
            dimensions || wrapper.current.getBoundingClientRect()
            
        // Transfrom hierarchical data
        const root = hierarchy(data)

        const treeLayout = tree().size([height, width])

        // Enrich hierarchical data with coordinates
        treeLayout(root)
        
        console.warn('descendants', root.descendants())
        console.warn('links', root.links())

        // const linkGenerator = linkVertical()
        //     .source(link => link.source)
        //     .target(link => link.target)
        //     .x(node => node.x)
        //     .y(node => node.y)

        // source and target accessors are default and thus do not need to be defined:
        
        const linkGenerator = linkHorizontal()
            .x(link => link.y)
            .y(link => link.x)

        //nodes
        svg
            .selectAll('.node')
            .data(root.descendants())
            .join(enter => enter.append('circle').attr('opacity', 0))
            .attr('class', 'node')
            .attr('r', 4)
            .attr('fill', 'black')
            .attr('cx', node => node.y)
            .attr('cy', node => node.x)
            .transition()
            .duration(500)
            .delay(node => node.depth * 500)
            .attr('opacity', 1)

        //links
        const enteringAndUpdatingLinks = svg
            .selectAll('.link')
            .data(root.links())
            .join('path')
            .attr('class', 'link')
            .attr('d', linkGenerator) // this is same as .attr('d', linkObject => linkGenerator(linkObject))
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('opacity', 1)
            .attr('stroke-dasharray', function() {
                const length = this.getTotalLength()
                return `${length} ${length}`
            })


        if (data !== previouslyRenderedData) {
            enteringAndUpdatingLinks
                .attr('stroke-dashoffset', function() {
                    return this.getTotalLength()
                })
                .transition()
                .duration(500)
                .delay(link => link.source.depth * 500)
                .attr('stroke-dashoffset', 0)
        }

        //lables
        svg
            .selectAll('.label')
            .data(root.descendants())
            .join(enter => enter.append('text').attr('opacity', 0))
            .attr('class', 'label')
            .text(node => node.data.name)
            .attr('text-anchor', 'middle')
            .attr('font-size', 18)
            .attr('x', node => node.y)
            .attr('y', node => node.x -10) //-10 will move the labels up the y axis by 10 pixels 
            .transition()
            .duration(500)
            .delay(node => node.depth * 500)
            .attr('opacity', 1)



    }, [data, dimensions, previouslyRenderedData])

    return (
        <div ref={wrapper} style={{ marginBottom: '2rem'}}>
            <svg ref={svgRef}>
            </svg>
        </div>
    )
}

export default TreeChart 