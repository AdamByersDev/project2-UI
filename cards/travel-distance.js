import { ChartCard } from "../dashboard.js";

const renderChart = async (id) => {
  const data = await d3.csv("../data/customer_satisfaction.csv", (d) => {
    d3.autoType(d);
    return { id: d.id, flightDistance: d["Flight Distance"] };
  });

  const width = 600;
  const height = 480;

  const margin = {
    top: 60,
    right: 80,
    left: 80,
    bottom: 20,
  };

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.id))
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.flightDistance)])
    .range([height - margin.bottom, margin.top]);

  const svg = d3
    .select(`#${id}`)
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const lineGenerator = d3
    .line()
    .x(({ x }) => xScale(x))
    .y(({ y }) => yScale(y));

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "var(--harpy-6)")
    .attr("stroke-width", 2)
    .datum(data)
    .join("path")
    .attr("d", (data) =>
      lineGenerator(
        data.map(({ id, flightDistance }) => ({ x: id, y: flightDistance }))
      )
    );

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - margin.left - margin.right)
        .attr("opacity", 0.1)
    )
    .call((g) => g.selectAll(".tick text").attr("font-size", "18"));

  // Add an invisible layer for the interactive tip.
  const tooltip = {
    width: 180,
    height: 50,
  };

  const dot = svg.append("g").attr("display", "none");

  dot.append("circle").attr("r", 5);
  dot
    .append("rect")
    .attr("width", tooltip.width)
    .attr("height", tooltip.height)
    .attr("fill", "var(--harpy-1)")
    .attr("x", -tooltip.width / 2)
    .attr("y", -(tooltip.height + 8));
  dot
    .append("text")
    .classed("distance-traveled", true)
    .attr("text-anchor", "middle")
    .attr("y", -18);
  dot
    .append("text")
    .classed("customer-id", true)
    .attr("text-anchor", "middle")
    .attr("y", -38);

  // Compute the points in pixel space as [x, y].
  const points = data.map(({ id, flightDistance }) => [
    xScale(id),
    yScale(flightDistance),
  ]);

  const pointerMoved = (event) => {
    const [xm, ym] = d3.pointer(event);
    const i = d3.leastIndex(points, ([x, y]) => Math.hypot(x - xm, y - ym));
    const [x, y] = points[i];
    dot.attr("transform", `translate(${x},${y})`);
    dot
      .select(".distance-traveled")
      .text("Flight Distance: " + data[i].flightDistance);
    dot.select(".customer-id").text("Customer ID: " + i);
  };

  const pointerEntered = () => {
    dot.attr("display", null);
  };

  const pointerLeft = () => {
    dot.attr("display", "none");
  };

  svg
    .on("pointerenter", pointerEntered)
    .on("pointermove", pointerMoved)
    .on("pointerleave", pointerLeft);
};

export default new ChartCard(
  "travelDistance",
  "Travel Distance",
  renderChart
);
