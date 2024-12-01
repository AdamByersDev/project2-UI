export const renderFlightDistance = async () => {
  const rawData = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);

  
  const totalFlightDistance = rawData.reduce(
    (acc, curr) => acc + curr["Flight Distance"],
    0
  );

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const svg = d3
    .select("#flight-distance")
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

 
  const arcGenerator = d3.arc().innerRadius(radius - 40).outerRadius(radius);


  svg
    .append("path")
    .datum({ startAngle: 0, endAngle: 2 * Math.PI })
    .attr("d", arcGenerator)
    .attr("fill", "#ddd");

  
  svg
    .append("path")
    .datum({
      startAngle: 0,
      endAngle: (2 * Math.PI * totalFlightDistance) / 50000,
    })
    .attr("d", arcGenerator)
    .attr("fill", "var(--harpy-3)");


  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-10px")
    .attr("font-size", "24")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .text(`${totalFlightDistance.toLocaleString()} km`);

  
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "20px")
    .attr("font-size", "16")
    .attr("fill", "black")
    .text("Total Flight Distance");
};