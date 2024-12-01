import { renderDisloyalCustomers } from "./cards/disloyal-customers.js";
import travelDistance from "./cards/travelDistance.js";
import satisfactionByCategory from "./cards/satisfactionByCategory.js";
import satisfactionLevel from "./cards/satisfactionLevel.js";
import { renderChart5 } from "./cards/satisfactionRate.js";
import lateMinutesSatisfaction from "./cards/lateMinutesSatisfaction.js";

const onInit = () => {
  travelDistance.createCard();
  satisfactionLevel.createCard();
  satisfactionByCategory.createCard();
  lateMinutesSatisfaction.createCard();
};

window.addEventListener("load", onInit);
