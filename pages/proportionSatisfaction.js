export const renderChart2 = async () => {
  // handling data
  const data = (
    await d3.csv("../data/customer_satisfaction.csv", d3.autoType)
  ).map((customer) => ({
    id: customer.id,
    satisfaction: customer.satisfaction,
  }));
  console.log(data);

  const satisfiedCustomers = data.filter(
    (customer) => customer.satisfaction === "satisfied"
  );

  const notSatisfiedCustomer = data.filter(
    (customer) => customer.satisfaction === "neutral or dissatisfied"
  );

  const pieChartData = [
    { category: "Satisfied", value: satisfiedCustomers.length },
    { category: "Neutral or Dissatisfied", value: notSatisfiedCustomer.length },
  ];

  // handling svg canva
  const width = 1000;
  const height = 800;

  const radius = Math.min(width, height) / 4;

  //implement chart
  const svg = d3
    .select("#proportionSatisfaction")
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]) // Responsive viewBox
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2}, ${height / 2})` // Center the pie chart
    );

  // Define color scale
  const color = d3
    .scaleOrdinal()
    .domain(pieChartData.map((d) => d.category))
    .range(["#4CAF50", "#F44336"]);

  // Create pie generator
  const pie = d3.pie().value((d) => d.value);

  // Create arc generator
  const arc = d3
    .arc()
    .innerRadius(0) // Set to radius/2 for a donut chart
    .outerRadius(radius);

  // Draw pie chart slices
  svg
    .selectAll("path")
    .data(pie(pieChartData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.category))
    .style("stroke", "white")
    .style("stroke-width", "2px");

  // Add labels
  svg
    .selectAll("text")
    .data(pie(pieChartData))
    .enter()
    .append("text")
    .text((d) => `${d.data.category} (${d.data.value})`)
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px");
};
