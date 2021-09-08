import { useState, useEffect } from 'react';
import { useD3 } from '../../hooks/useD3';
import * as d3 from 'd3';
import { formatDate } from '../../utils/formatDate';
import './Chart.css';
import { getWindowDimensions } from '../../utils/getWindowDimensions';

const Chart = ({ data }) => {

  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      console.log(windowDimensions.width)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions.width]);

  const ref = useD3(
    (svg) => {
      const w = windowDimensions.width;
      const h = 500;
      const padding = 60;
      const xScale = d3.scaleTime()
          .domain(d3.extent(data, d => d[0]))
          .range([padding, w - padding]);

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[1])])
          .range([h -padding, padding]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      d3.select('svg')
          .attr('width', w)
          .attr('height', h)
        
      const tooltip = d3.select('.tooltip').style('opacity', 0);
            
      svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', (d,i) =>  xScale(data[i][0]))
          .attr('y', d =>  yScale(d[1]))
          .attr('height', d => h -padding - yScale(d[1]))
          .attr('width', w/data.length)
          .style('fill', 'rgb(56, 111, 170)')
          .on('mouseover', (e, d) => {
              tooltip.style('opacity', 1)
              d3.select(e.target).style('fill', 'white')
              
          })
          .on('mouseout', (e, d) => {
              
              d3.select(e.target).style('fill', 'rgb(56, 111, 170)')
              tooltip.style('opacity', 0)
          })
          .on('mousemove', (e, d) => {
              tooltip.text( `Number of cases: ${d[1]} Date: ${formatDate(d[0])}`)
              // tooltip
              //     .style("left", Math.max(0, e.pageX -10) + "px")
              //     .style("top", (e.pageY + 30) + "px");
  
          })

          svg.append('g')
              .attr('transform', 'translate(0, ' + (h - padding) + ')')
              .call(xAxis)

          svg.append('g')
              .attr('transform', 'translate(' + padding + ',0)')
              .call(yAxis)
          
          svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", w - 50)
            .attr("y", h - 20)
          
          svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", 13)
            .attr("x", -60)
            .text("Number of cases")
            

  }, [ data.length ]);

  return (
    <div className='chart-container'>
      <svg
        ref={ref}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div className='tooltip'></div>
    </div>
    );
};

export default Chart;