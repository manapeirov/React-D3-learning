import React, { useRef, useEffect } from "react";
import { select, hierarchy, forceSimulation, forceCenter, forceManyBody, mouse, forceX, forceY, forceCollide, forceRadial } from "d3";
import useResizeObserver from "./useResizeObserver";


function ForceTreeChart({ data }) {

    const svgRef = useRef()
    const wrapper = useRef()
    const dimensions = useResizeObserver(wrapper)


  // will be called initially and on every data change
    
    useEffect(() => {

        if (!dimensions) return
        
        const svg = select(svgRef.current)

        // centering workaround 
        svg.attr('viewBox', [
            -dimensions.width / 2 ,
            -dimensions.height / 2,
            dimensions.width,
            dimensions.height
        ])

        // d3 util to work with hierarchical data

        const root = hierarchy(data)

        const nodeData = root.descendants()
        const linkData = root.links()


        const simulation = forceSimulation(nodeData)
            // .force('center', forceCenter(dimensions.width / 2, dimensions.height / 2 )) //this makes the nodes go to the centre of the page
            .force('charge', forceManyBody().strength(-30))
            .force('collide', forceCollide(30)) 
            .on('tick', () => {
                console.log('current force', simulation.alpha())

                // Text element showing current alpha value 
                svg 
                    .selectAll('.alpha')
                    .data([data]) // render one text element for the entire data
                    .join('text')
                    .attr('class', 'alpha')
                    .text(simulation.alpha().toFixed(2))
                    .attr('x', -dimensions.width / 2 + 10 )
                    .attr('y', -dimensions.height / 2 + 25)

                // Links as line lements linking our nodes together 
                svg 
                    .selectAll('.link')
                    .data(linkData)
                    .join('line')
                    .attr('class', 'link')
                    .attr('stroke', 'black')
                    .attr('fill', 'none')
                    .attr('x1', link => link.source.x)
                    .attr('y1', link => link.source.y)
                    .attr('x2', link => link.target.x)
                    .attr('y2', link => link.target.y)

                // Circle elements demonstrating the nodes in the data 
                svg
                    .selectAll('.node')
                    .data(nodeData)
                    .join('circle')
                    .attr('class', 'node')
                    .attr('r', 4)
                    .attr('cx', node => node.x)
                    .attr('cy', node => node.y)

                // Text elements for each node to label the nodes
                svg 
                    .selectAll('.label')
                    .data(nodeData)
                    .join('text')
                    .attr('class', 'label')
                    .attr('font-size', 18)
                    .attr('text-anchor', 'middle')
                    .text(node => node.data.name)
                    .attr('x', node => node.x)
                    .attr('y', node => node.y)


            })

            // Callback fuction on mouse hover to get the x and y coordinates of mouse curser
            // use these coordinates to influence the position of the nodes, i.e have the nodes come towards the mouse curser
            svg
                .on('mousemove', () => {
                    const [ x, y ] = mouse(svgRef.current)
                    simulation
                        .force('x', forceX(x).strength(node => 0.2 + node.depth * 0.15))
                        .force('y', forceY(y).strength(node => 0.2 + node.depth * 0.15))
                })

                
            // callback function on mouse click to get the x, y coordinates of the mouse curser where it has been clicked
            // use these coordinates to influence the position of forceRadial and also the circle element on mouse click
            // forceRadial will be at position x,y of mouse click, shown by a circle element also at the same coordinates with the same radius
            // nodes will end up attracted and thus positioned in the points/orbits of forceRadial cirle
            svg 
                .on('click', () => {
                    const [ x, y ] = mouse(svgRef.current)
                    simulation
                        .alpha(0.5)
                        .restart()
                        .force('orbit', forceRadial(100, x, y).strength(0.8))
                
                    // render a circle to show the radial force
                    svg
                        .selectAll('.orbit')
                        .data([data]) //just want one circle for the whole data, rather than one circle per node
                        .join('circle')
                        .attr('class', 'orbit')
                        .attr('stroke', 'green')
                        .attr('fill', 'none')
                        .attr('r', 100)
                        .attr('cx', x)
                        .attr('cy', y) //position circle at mouse click coordinates
                })

    }, [data, dimensions])

    return (
        <div ref={wrapper} style={{ marginBottom: "2rem" }}>
            <svg ref={svgRef}></svg>
        </div>
  )
}

export default ForceTreeChart;





