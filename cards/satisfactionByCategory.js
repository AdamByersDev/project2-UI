import { ChartCard } from "../dashboard.js";

const renderData = (idPrefix) => {
  return `
  <h3 id="${idPrefix}Title"></h3>
    <div class="input-box">
      <select id="${idPrefix}Select">
        <option value="checkinService">Checkin service</option>
        <option value="onlineBooking">Ease of online booking</option>
        <option value="gateLocation">Gate location</option>
        <option value="onboardService">On-board service</option>
        <option value="baggageHandling">Baggage handling</option>
      </select>
    </div>
  `;
};

const cardBuilder = (id, idPrefix) => {
  renderChart(id, idPrefix);
  document.getElementById(`${idPrefix}Select`).addEventListener('change', () => renderChart(id, idPrefix));
}

const renderChart = async (id, idPrefix) => {
  const selector = document.getElementById(`${idPrefix}Select`);
  const selection = selector.value;

  let data = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);

  let title;
  let columnName;
  switch (selection) {
    case "checkinService":
      columnName = "Checkin service";
      break;

    case "onlineBooking":
      columnName = "Ease of Online booking";
      title = "Ease of online booking"
      break;

    case "gateLocation":
      columnName = "Gate location";
      break;

    case "onboardService":
      columnName = "On-board service";
      break;
  

    case "baggageHandling":
      columnName = "Baggage handling";
      break;
        
    default:
      break;
  }

  let finalData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

  data.forEach(d => {
    let rating = d[columnName];
    if ([1,2,3,4,5].includes(rating)) {
      finalData[rating]++;
    }
  }); 


  d3.select(`#${idPrefix}Title`)
    .text(`${title || columnName} satisfaction`);

  renderGraph(id, finalData, `${title || columnName} satisfaction`)
}

const renderGraph = (id, data, title) => {

  d3.select(`#${id}`)
    .html('')

  const size = { x:1000, y:500 };
  const margin = { top: 20, bottom: 50, left: 80, right: 50 };
  const innerSize = { x: size.x - margin.left - margin.right, y: size.y - margin.top - margin.bottom}

  const xScale = d3
    .scaleLinear()
    .domain([0, Math.ceil( d3.max( Object.values(data) ) / 5 ) * 5])
    .range([0, innerSize.x]);

  const yScale = d3
    .scaleBand()
    .domain(Object.keys(data))
    .range([margin.top, innerSize.y])
    .padding(.1);

  const svg = d3
    .select(`#${id}`)
    .attr("style", `max-width: ${size.x}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, size.x, size.y]);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${innerSize.y})`)
    .call(d3.axisBottom(xScale))
    .attr("font-size", "1.4rem")
  
  svg
    .append("text")
    .text("Rating")
    .attr("x", -innerSize.y / 2)
    .attr("y", margin.left - 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.6rem")
    .attr("font-weight", 700)
    .attr("transform", "rotate(-90)")
  
  svg
    .append("text")
    .text("Number of Customers")
    .attr("x", size.x / 2)
    .attr("y", innerSize.y + 60)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.6rem")
    .attr("font-weight", 700)

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .attr("font-size", "1.4rem");
  
  let bars = svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .selectAll(".bar")
    .data(Object.entries(data))
    .enter()
    .append("g")
    .attr("class", "barGroup")
    .attr("transform", (d) => `translate(0,${yScale(d[0])})` )
    
  bars
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", d => xScale(d[1]))
    .attr("height", yScale.bandwidth())
    .attr("style", "fill: var(--harpy-3)");

};

export default new ChartCard(
  "satisfactionByCategory",
  "Satisfaction By Category",
  cardBuilder,
  renderData
);
