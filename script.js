import { renderDistance } from "./pages/distance.js";
import { renderChart2 } from "./pages/proportionSatisfaction.js";
import { renderScatterPlot } from "./pages/late-minutes-satisfaction.js";

const setPage = async (pageName, dynamicDiv, doNotPushState = false) => {
  const response = await fetch(`pages/${pageName}.html`);
  const responseText = await response.text();
  dynamicDiv.innerHTML = responseText;

  // Set new page url
  if (!doNotPushState) history.pushState({}, "", `#${pageName}`);

  switch (pageName) {
    case "distance":
      return await renderDistance();
    case "proportionSatisfaction":
      return await renderChart2();
    case "late-minutes-satisfaction":
      return await renderScatterPlot();
    // Add the other cases here

    default:
      return;
  }
};

const activeStateHandler = (anchor) => {
  const links = document.querySelectorAll(".page-link");
  links.forEach((link) => {
    if (link.contains(anchor)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const mobileNavSetup = () => {
  const navButton = document.getElementById("mobileNavButton");
  const navContainer = document.getElementById("NavContainer");

  const openNav = () => {
    if (navContainer.classList.contains("active")) {
      navContainer.classList.remove("active");
    } else {
      navContainer.classList.add("active");
    }
  };

  navButton.addEventListener("click", openNav);

  //handle situation where the user changed screen width without closing the nav button
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      navContainer.classList.remove("active");
    } else {
      navContainer.classList.add("active");
    }
  });
};

const onInit = () => {
  // create the logic for the dynamic content on screen based on user interaction
  const dynamicDiv = document.getElementById("dynamicContent");

  // Set up event listeners for the anchors
  const anchors = document.querySelectorAll(".page-link a");
  const anchorsObject = {};

  anchors.forEach((anchor) => {
    anchorsObject[anchor.getAttribute("href")] = anchor;

    anchor.addEventListener("click", (event) => {
      event.preventDefault();

      const pageName = anchor.getAttribute("href");

      if (!pageName || pageName === "#") return;

      setPage(pageName, dynamicDiv);
      activeStateHandler(anchor);
    });
  });

  // Load page from url or distance page on page load
  let urlPage = window.location.hash.substring(1);
  setPage(urlPage || "distance", dynamicDiv, urlPage.length > 0);
  activeStateHandler(anchorsObject[urlPage || "distance"]);

  // Set up event listener for browser back button to go to previously viewed page
  window.addEventListener("popstate", (event) => {
    let pageName = window.location.hash.substring(1) || "distance";
    activeStateHandler(anchorsObject[pageName]);
    setPage(pageName, dynamicDiv, true);
  });

  mobileNavSetup();
};

window.addEventListener("load", onInit);
