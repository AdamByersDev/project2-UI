import travelDistance from "./cards/travelDistance.js"; // Chart 1
import satisfactionLevel from "./cards/satisfactionLevel.js"; // Chart 2
import satisfactionByCategory from "./cards/satisfactionByCategory.js"; // Chart 3
import lateMinutesSatisfaction from "./cards/lateMinutesSatisfaction.js"; // Chart 4
import { renderChart5 } from "./cards/satisfactionRate.js"; // Chart 5
import { renderDisloyalCustomers } from "./cards/disloyal-customers.js"; // Chart 6

const onInit = () => {
  travelDistance.createCard();
  satisfactionLevel.createCard();
  satisfactionByCategory.createCard();
  lateMinutesSatisfaction.createCard();
};

window.addEventListener("load", onInit);
