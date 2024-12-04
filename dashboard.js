export class ChartCard {
  /**
   * Create a chart card.
   * @param {string} id - A unique ID that wil be used for the card's content.
   *                    - The recommended format is a kebab case form of the file name.
   * @param {string} name The name that should be displayed on the card in the dashboard
   *
   * @param {function(string, string): void} builder - A function that will generate the chart in the card using the string supplied for the chart location ID.
   *                                         - This function will run last so include any interactivity in this as well using the second string as a prefix.
   *
   * @param {function(string): string | null} cardContent - A function that will create HTML content that will be displayed in the text section of the card.
   *                                                - Use the string supplied as an ID for any content that must be accessed through the builder function.
   *
   */
  constructor(id, name, builder, cardContent = null) {
    this.id = id;
    this.name = name;
    this.builder = builder;
    this.cardContent = cardContent;
  }

  /**
   * The function that will create the card itself.
   * @return {void}
   */
  createCard = function () {
    const card = d3
      .select("#dashboardCards")
      .append("div")
      .attr("class", "card card-lg");

    const chartContainer = card
      .append("div")
      .attr("class", "card-visual")
      .attr("id", `${this.id}Chart`);

    const cardData = card.append("div").attr("class", "card-data");

    if (this.cardContent) {
      cardData.html(this.cardContent(this.id));
    }

    cardData.insert("h2", ":first-child").text(this.name);

    this.builder(`${this.id}Chart`, this.id);

    // Add click event to open modal
    chartContainer.on("click", () => {
      const modal = document.getElementById("chartModal");
      const modalChartContainer = document.getElementById(
        "modalChartContainer"
      );

      // Clear existing content
      modalChartContainer.innerHTML = "";

      // Re-render the chart in the modal
      this.builder("modalChartContainer", `${this.id}_modal`);

      modal.style.display = "block";

      // Close modal functionality
      const closeBtn = document.querySelector(".close");
      closeBtn.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  };
}
