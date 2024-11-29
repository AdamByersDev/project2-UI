export const renderDisloyalCustomers = async () => {
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
    bottom: 40,
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
      "var(--harpy-4)",
    ])
    .unknown("#CCC");

  const svg = d3
    .select("#disloyal-customers")
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
    .call((g) => g.selectAll(".tick text").attr("font-size", "18"));

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .call((g) => g.selectAll(".tick text").attr("font-size", "18"));
};
