export const renderFlightDistance = async () => {
    const rawData = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);
  
    // Group data by 'id' and sum up flight distances
    const flightData = rawData.reduce((acc, curr) => {
      acc[curr.id] = (acc[curr.id] || 0) + curr["Flight Distance"];
      return acc;
    }, {});
  
    const data = Object.entries(flightData).map(([id, distance]) => ({
      id,
      distance,
    }));
  
    const width = 1000;
    const height = 600;
  
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
      .domain([0, d3.max(data, (d) => d.distance)])
      .range([height - margin.bottom, margin.top]);
  
    const svg = d3
      .select("#flight-distance")
      .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => xScale(d.id))
      .attr("y", (d) => yScale(d.distance))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.distance))
      .attr("fill", "var(--harpy-3)");
  
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .call((g) => g.selectAll(".tick text").attr("font-size", "12"))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .text("Customer ID");
  
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .call((g) => g.selectAll(".tick text").attr("font-size", "12"))
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", 14)
      .text("Flight Distance");
  
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", 18)
      .attr("fill", "black")
      .text("Total Flight Distance Per Customer");
  };