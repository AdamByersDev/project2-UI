
export const renderNoDelayCustomers = async () => {
  const rawData = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);


  const noDelayCustomers = rawData.filter(
    (d) =>
      d["Departure Delay in Minutes"] === 0 &&
      d["Arrival Delay in Minutes"] === 0
  );


  const totalNoDelayCustomers = noDelayCustomers.length;

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const svg = d3
    .select("#no-delay-customers")
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
      endAngle: (2 * Math.PI * totalNoDelayCustomers) / rawData.length, 
    })
    .attr("d", arcGenerator)
    .attr("fill", "var(--harpy-4)");



  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-10px")
    .attr("font-size", "24")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .text(`${totalNoDelayCustomers}`);


  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "20px")
    .attr("font-size", "16")
    .attr("fill", "black")
    .text("Customers Without Delay");
};