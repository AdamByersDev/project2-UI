export const renderDisloyalCustomers = async () => {
  const rawData = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);

  // Filter for disloyal customers
  const disloyalCustomers = rawData.filter(
    (d) => d["Customer Type"] === "disloyal Customer"
  );

  // Total number of disloyal customers
  const totalDisloyalCustomers = disloyalCustomers.length;

  const width = 400;
  const height = 300;

  const svg = d3
    .select("#disloyal-customers")
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  // Add a background circle for aesthetic
  svg
    .append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", 100)
    .attr("fill", "var(--harpy-2)")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // Display the total count in the center
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "36")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .text(totalDisloyalCustomers);

  // Add a title below the number
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 + 80)
    .attr("text-anchor", "middle")
    .attr("font-size", "18")
    .attr("fill", "black")
    .text("Disloyal Customers");
};