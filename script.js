import travelDistance from "./cards/travel-distance.js"; // Chart 1
import satisfactionLevel from "./cards/satisfaction-level.js"; // Chart 2
import satisfactionByCategory from "./cards/satisfaction-by-category.js"; // Chart 3
import lateMinutesSatisfaction from "./cards/late-minutes-satisfaction.js"; // Chart 4
import satisfactionRate from "./cards/satisfaction-rate.js"; // Chart 5
import disloyalCustomers from "./cards/disloyal-customers.js"; // Chart 6
import loyalCustomers from "./cards/loyal-customers.js"; // Chart 7
import flightDistance from "./cards/flight-distance.js";

const onInit = () => {
  travelDistance.createCard();
  satisfactionLevel.createCard();
  satisfactionByCategory.createCard();
  lateMinutesSatisfaction.createCard();
  satisfactionRate.createCard();
  disloyalCustomers.createCard();
  loyalCustomers.createCard();
  flightDistance.createCard();
};

window.addEventListener("load", onInit);
