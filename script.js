import { renderDisloyalCustomers } from "./cards/disloyal-customers.js";
import travelDistance from "./cards/travelDistance.js";
import { startSatisfactionByCategory } from "./cards/satisfactionbycategory.js";
import { renderChart2 } from "./cards/satisfactionLevel.js";
import { renderChart5 } from "./cards/satisfactionRate.js";
import { renderScatterPlot } from "./cards/late-minutes-satisfaction.js";

const onInit = () => {
  travelDistance.createCard();
};

window.addEventListener("load", onInit);
