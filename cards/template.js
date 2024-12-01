import { ChartCard } from "../dashboard";

const renderChart = async (id, idPrefix /* Used to reference anything created in the extraData function */) => {
  const width = 1000;
  const height = 800;

  const margin = {
    top: 60,
    right: 80,
    left: 80,
    bottom: 50,
  };

  const svg = d3
    .select(`#${id}`)
    .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);
  
  /* Chart generation goes here */
  

  /* The lines below are an example of how the extra data in the card can be accessed */
  d3.select(`#${id}Info`)
    .text('Change data in the paragraph tag in the extra data function.');

  document.getElementById(`${idPrefix}Info`).addEventListener('click', () => {
    console.log('Clicked the tag')
  });

}

const extraData = async (idPrefix) => {
  return `
    <p id="${idPrefix}Info">Extra Data</p>
  `;
};

// Uses a constructor to generate the chart card objects to be displayed
export default new ChartCard(
  "theChartId", // The string that will be used to generate IDs for the card
  "The Chart Name", // The name that will be dispalyed on the card
  renderChart, // The function that will create the chart itself
  extraData // The function that will return a string which contains the html data for the card. This is optional
);
