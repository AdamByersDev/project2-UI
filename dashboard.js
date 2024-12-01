/**
 * 
 * @constructor
 * 
 * @param {string} id - A unique ID that wil be used for the card's content.
 *                    - The recommended format is a shortened form of the card name.
 * 
 * @param {string} name The name that should be displayed on the card in the dashboard
 * 
 * @param {function(string, string): void} builder - A function that will generate the chart in the card using the string supplied for the chart location ID.
 *                                         - This function will run last so include any interactivity in this as well using the second string as a prefix.
 * 
 * @param {function(string): string=} cardContent - A function that will create HTML content that will be displayed in the text section of the card.
 *                                                - Use the string supplied as an ID for any content that must be accessed through the builder function.
 * 
 * @property {string} id The unique prefix ID of the card content.
 * @property {string} name The name that is displayed on the card.
 * @property {function(): void} createCard The function that will create the card itself.
 */
export function ChartCard(id, name, builder, cardContent) {
  this.id = id
  this.name = name;
  this.builder = builder;
  if (cardContent) this.cardContent = cardContent;

  this.createCard = function() {
    const card = d3
      .select("#dashboardCards")
      .append("div")
      .attr("class", "card card-lg");

    const cardVisual = card
      .append("div")
      .attr("class", "card-visual")
      .attr("id", `${this.id}Chart`);

    const cardData = card
      .append("div")
      .attr("class", "card-data");
    
    if (this.cardContent) {
      cardData
        .html(this.cardContent(this.id));
    }

    cardData
      .insert("h2", ":first-child")
      .text(this.name);
    
    console.log("")

    this.builder(`${this.id}Chart`, this.id);

  }

}