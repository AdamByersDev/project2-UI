import { ChartCard } from "../dashboard.js";

const renderChart = async (id) => {
  const rawData = await d3.csv("../data/customer_satisfaction.csv", (d) => {
    if (d["Customer Type"] !== "disloyal Customer") return;
    d3.autoType(d);
    return d;
  });

  const keys = rawData.columns.filter((d) => d).slice(-4);

  const data = rawData.slice(0, 15).map((d) =>
    keys.reduce((acc, cur) => ({ ...acc, [cur]: d[cur] }), {
      id: d.id,
    })
  );

  const stackGenerator = d3.stack().keys(keys);

  const stackData = stackGenerator(data);

  const width = 1000;
  const height = 800;

  const margin = {
    top: 60,
    right: 80,
    left: 80,
    bottom: 50,
  };

  const xScale = d3
    .scaleBand()
    .domain(data.map(({ id }) => id))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(stackData, (group) => {
        return d3.max(group, (price) => price[1]);
      }),
    ])
    .rangeRound([height - margin.bottom, margin.top]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(stackData.map((d) => d.key))
    .range([
      "var(--harpy-1)",
      "var(--harpy-2)",
      "var(--harpy-3)",
      "var(--harpy-5)",
    ])
    .unknown("#CCC");

  const svg = d3
    .select(`#${id}`)
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const priceGroups = svg
    .append("g")
    .selectAll("g")
    .data(stackData)
    .join("g")
    .attr("fill", (d) => colorScale(d.key));

  priceGroups
    .selectAll("rect")
    .data((D) => D)
    .join("rect")
    .attr("x", (d) => xScale(d.data.id))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .call((g) => g.selectAll(".tick text").attr("font-size", "18"))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 50)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("font-size", 18)
    .text("Customer ID");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .call((g) => g.selectAll(".tick text").attr("font-size", "18"))
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", 18)
    .text("Ticket Price");

  const legendBandWidth = 30;

  const legendGroup = svg
    .append("g")
    .attr("transform", `translate(${width}, 0)`)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(colorScale.domain().reverse())
    .join("g")
    .attr(
      "transform",
      (_, i) => `translate(0, ${i * legendBandWidth + i * 1})`
    );

  legendGroup
    .append("rect")
    .attr("x", -legendBandWidth)
    .attr("width", legendBandWidth)
    .attr("height", legendBandWidth)
    .attr("fill", (d) => colorScale(d));

  legendGroup
    .append("text")
    .attr("x", -legendBandWidth - 8)
    .attr("y", legendBandWidth / 2)
    .attr("dy", "0.35em")
    .text((d) => d);
};

export default new ChartCard(
  "disloyalCustomers",
  "Disloyal Customers",
  renderChart
);
