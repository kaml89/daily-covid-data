import { useD3 } from "../../hooks/useD3";
import * as d3 from "d3";
import { formatDate } from "../../utils/formatDate";
import "./Chart.css";
import { getWindowDimensions } from "../../utils/getWindowDimensions";
import PropTypes from "prop-types";

const Chart = ({ data }) => {
  const { width } = getWindowDimensions();

  const ref = useD3(
    (svg) => {
      const w = width;
      const h = 500;
      const padding = 60;

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d[0]))
        .range([padding, w - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d[1])])
        .range([h - padding, padding]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      d3.select("svg").attr("width", w).attr("height", h);

      const tooltip = d3.select(".tooltip").style("opacity", 0);
      const tooltipCases = d3.select(".cases");
      const tooltipDate = d3.select(".date");

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(data[i][0]))
        .attr("y", (d) => yScale(d[1]))
        .attr("height", (d) => h - padding - yScale(d[1]))
        .attr("width", w / data.length)
        .style("fill", "rgb(56, 111, 170)")
        .on("mouseover", (e, d) => {
          tooltip.style("opacity", 1);
          d3.select(e.target).style("fill", "white");
        })
        .on("mouseout", (e, d) => {
          d3.select(e.target).style("fill", "rgb(56, 111, 170)");
          tooltip.style("opacity", 0);
        })
        .on("mousemove", (e, d) => {
          //tooltip.text(`Number of cases: ${d[1]} Date: ${formatDate(d[0])}`);
          tooltipCases.text(`Number of cases: ${d[1]}`);
          tooltipDate.text(`Date: ${formatDate(d[0])}`);
        });

      svg
        .append("g")
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(xAxis);

      svg
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", 13)
        .attr("x", -60)
        .text("Number of cases");
    },
    [data.length]
  );

  return (
    <div className="chart-container">
      <svg ref={ref}>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div className="tooltip">
        <p className="cases"></p>
        <p className="date"></p>
      </div>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Chart;
