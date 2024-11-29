export const renderChart2 = async () => {
  // handling data
  const data = (
    await d3.csv("../data/customer_satisfaction.csv", d3.autoType)
  ).map((customer) => ({
    id: customer.id,
    satisfaction: customer.satisfaction,
  }));

  const satisfiedCustomers = data.filter(
    (customer) => customer.satisfaction === "satisfied"
  );

  const notSatisfiedCustomers = data.filter(
    (customer) => customer.satisfaction === "neutral or dissatisfied"
  );

  const totalResponses = data.length;

  const pieChartData = [
    {
      category: "Satisfied",
      value: satisfiedCustomers.length,
      percentage: ((satisfiedCustomers.length / totalResponses) * 100).toFixed(
        1
      ),
    },
    {
      category: "Neutral or Dissatisfied",
      value: notSatisfiedCustomers.length,
      percentage: (
        (notSatisfiedCustomers.length / totalResponses) *
        100
      ).toFixed(1),
    },
  ];

  // handling svg canva
  const width = 500;
  const height = 600;

  const radius = Math.min(width, height) / 3; // chart size

  // Create SVG container
  const svg = d3
    .select("#satisfactionLevel")
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2 + 50})`); // Move down for legend space

  // Define color scale
  const color = d3
    .scaleOrdinal()
    .domain(pieChartData.map((d) => d.category))
    .range(["#a9c3ff", "#4569d2"]);

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

  // Add percentage labels
  svg
    .selectAll("text")
    .data(pie(pieChartData))
    .enter()
    .append("text")
    .text((d) => `${d.data.percentage}%`) // Show percentage only
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "35px")
    .style("font-weight", "bold");

  // Add legends
  const legendGroup = d3
    .select("#satisfactionLevel svg")
    .append("g")
    .attr("transform", `translate(${width / 2 - 100}, ${50})`); // Position above the chart

  legendGroup
    .selectAll("g")
    .data(pieChartData)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 50})`) // Space out legend items
    .call((legendItem) => {
      // Add color boxes
      legendItem
        .append("rect")
        .attr("x", 0)
        .attr("y", -10)
        .attr("width", 40)
        .attr("height", 40)
        .attr("fill", (d) => color(d.category));

      // Add text labels
      legendItem
        .append("text")
        .attr("x", 50)
        .attr("y", 10)
        .attr("dy", "0.35em")
        .text((d) => d.category)
        .style("font-size", "25px")
        .style("alignment-baseline", "middle");
    });
};
