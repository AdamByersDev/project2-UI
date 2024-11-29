export const renderScatterplot = async () => {
  const data = (await d3.json("../data/data.json")).map((d) => ({
    satisfaction: +d["Average Satisfaction"],
    delay: +d["Total Departure and Arrival Delay in Minutes"],
  }));

  console.log(data); // chackin debiggin it's fine

  //step 1: create SVG, use margins
  const margin = { 
    top: 20, 
    right: 30, 
    bottom: 50, 
    left: 60
 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;


  const svg = d3
    .select("#chart4") 
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Set up scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.satisfaction)) 
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.delay)]) 
    .range([height, 0]);

  // Add X and Y axes
  const xAxis = d3.axisBottom(xScale).ticks(10);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Average Satisfaction");

  svg
    .append("g")
    .call(yAxis)
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("transform", "rotate(-90)")
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Total Delay in Minutes");

  // Addin the  points to scatterplot
  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.satisfaction))
    .attr("cy", (d) => yScale(d.delay))
    .attr("r", 5)
    .style("fill", "#69b3a2");
};
