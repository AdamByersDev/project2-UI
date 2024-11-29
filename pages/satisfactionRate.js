export const renderChart5 = async () => {
  // handling data
  const data = (
    await d3.csv("../data/customer_satisfaction.csv", d3.autoType)
  ).map((customer) => ({
    id: customer.id,
    classSeat: customer.Class,
    satisfactionRate: customer["Average Satisfaction"],
  }));

  const ecoClass = data.filter((customer) => customer.classSeat === "Eco");

  const getEcoAverage = () => {
    var sumOfEcoRate = 0;
    ecoClass.forEach((customer) => {
      sumOfEcoRate += customer.satisfactionRate;
    });
    const ecoAverage = (sumOfEcoRate / ecoClass.length).toFixed(2);
    return Number(ecoAverage);
  };

  const businessClass = data.filter(
    (customer) => customer.classSeat === "Business"
  );

  const getBusinessAverage = () => {
    var sumOfBusinessRate = 0;
    businessClass.forEach((customer) => {
      sumOfBusinessRate += customer.satisfactionRate;
    });
    const businessAverage = (sumOfBusinessRate / businessClass.length).toFixed(
      2
    );
    return Number(businessAverage);
  };

  const barChartData = [
    {
      category: "Economy Class",
      value: getEcoAverage(),
    },
    {
      category: "Business Class",
      value: getBusinessAverage(),
    },
  ];

  // handling svg canva
  const width = 500;
  const height = 700;

  const margin = {
    top: 60,
    right: 80,
    left: 80,
    bottom: 200,
  };

  const svg = d3
    .select("#satisfactionRate")
    .append("svg")
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .attr("viewBox", [0, 0, width, height]);

  // Create scales
  const x = d3
    .scaleBand()
    .domain(barChartData.map((d) => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const y = d3
    .scaleLinear()
    .domain([0, 5]) // Satisfaction Rate ranges from 0 to 5
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Draw bars
  svg
    .selectAll(".bar")
    .data(barChartData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.category))
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d.value))
    .attr("fill", (d) =>
      d.category === "Economy Class" ? "#4569d2" : "#001568"
    );

  // Add X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("text-anchor", "middle")
    .style("font-size", "15px");

  // Add Y axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", margin.left / 2 - 10)
    .attr("text-anchor", "middle")
    .text("Rate")
    .style("font-size", "20px");

  // Add values on top of bars
  svg
    .selectAll(".text")
    .data(barChartData)
    .enter()
    .append("text")
    .text((d) => d.value)
    .attr("x", (d) => x(d.category) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.value) - 5)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "bold");
};
