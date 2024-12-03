const setPage = async (pageName, dynamicDiv, doNotPushState = false) => {
  const response = await fetch(`pages/${pageName}.html`);
  const responseText = await response.text();
  dynamicDiv.innerHTML = responseText;

  // Set new page url
  if (!doNotPushState) history.pushState({}, "", `#${pageName}`);
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

  // Load page from url or color page on page load
  let urlPage = window.location.hash.substring(1);
  setPage(urlPage || "color", dynamicDiv, urlPage.length > 0);
  activeStateHandler(anchorsObject[urlPage || "color"]);

  // Set up event listener for browser back button to go to previously viewed page
  window.addEventListener("popstate", (event) => {
    let pageName = window.location.hash.substring(1) || "color";
    activeStateHandler(anchorsObject[pageName]);
    setPage(pageName, dynamicDiv, true);
  });
};

window.addEventListener("load", onInit);
