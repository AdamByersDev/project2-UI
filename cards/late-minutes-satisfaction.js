import { ChartCard } from "../dashboard.js";

const renderScatterPlot = async (id) => {
  const data = await d3.csv("../data/customer_satisfaction.csv", (d) => {
    d3.autoType(d);

    return {
      satisfaction: d["Average Satisfaction"],
      delay: d["Total Departure and Arrival Delay in Minutes"],
    };
  });

  //step 1: create SVG, use margins
  const margin = {
    top: 20,
    right: 30,
    bottom: 50,
    left: 80,
  };

  const width = 1000;
  const height = 600;

  const svg = d3
    .select(`#${id}`)
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  // Set up scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.satisfaction))
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.delay)])
    .range([height - margin.bottom, margin.top]);

  // Add X and Y axes
  const xAxis = d3.axisBottom(xScale).ticks(10);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis)
    .call((g) => g.selectAll(".tick text").attr("font-size", 18))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .attr("font-size", 14)
    .text("Average Satisfaction");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis)
    .call((g) => g.selectAll(".tick text").attr("font-size", 18))
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", 18)
    .text("Total Delay in Minutes");

  // Addin the  points to scatterplot
  svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(d.satisfaction))
    .attr("cy", (d) => yScale(d.delay))
    .attr("r", 5)
    .attr("fill", "var(--harpy-3)");
};

export default new ChartCard(
  "lateMinutesSatisfaction",
  "Total Delay VS Departure and Arrival Time Satisfaction",
  renderScatterPlot
);
