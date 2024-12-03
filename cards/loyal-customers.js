import { ChartCard } from "../dashboard.js";

const renderChart = async (id) => {
  const rawData = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);


  const loyalCustomers = rawData.filter(
    (d) => d["Customer Type"] === "Loyal Customer"
  );


  const totalLoyalCustomers = loyalCustomers.length;


  const targetValue = 100; 
  const percentage = (totalLoyalCustomers / targetValue) * 100;

  const width = 600;
  const height = 300;
  const radius = 250;

  const svg = d3
    .select(`#${id}`) 
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const arcGenerator = d3.arc().cornerRadius(5);


  svg
    .append("path")
    .datum({
      innerRadius: radius - 60,
      outerRadius: radius,
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
    })
    .attr("d", arcGenerator)
    .attr("fill", "#ddd")
    .attr("transform", `translate(${width / 2}, ${height - 50})`);


  svg
    .append("path")
    .datum({
      innerRadius: radius - 60,
      outerRadius: radius,
      startAngle: -Math.PI / 2,
      endAngle: (-Math.PI / 2) + (percentage / 100) * Math.PI,
    })
    .attr("d", arcGenerator)
    .attr("fill", "var(--harpy-1)")
    .attr("transform", `translate(${width / 2}, ${height - 50})`);


  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 + 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "32")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .text(`${Math.round(percentage)} / ${rawData.length}`);


  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.6rem")
    .attr("fill", "black")
    .text("Loyal Customers");
};

export default new ChartCard(
  "loyalCustomerCount",
  "Loyal Customer Count",
  renderChart
);