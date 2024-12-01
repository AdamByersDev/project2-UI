
export const renderNoDelayCustomers = async () => {
        const rawData = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);
      
 
        const noDelayCustomers = rawData.filter(
          (d) =>
            d["Departure Delay in Minutes"] === 0 &&
            d["Arrival Delay in Minutes"] === 0
        );
      

        const ticketCategories = [
          { range: "Below $200", min: 0, max: 200 },
          { range: "$200 - $500", min: 200, max: 500 },
          { range: "$500 - $1000", min: 500, max: 1000 },
          { range: "Above $1000", min: 1000, max: Infinity },
        ];
      
        const categoryData = ticketCategories.map((category) => {
          const count = noDelayCustomers.filter((d) => {
            const price = d["1st Ticket Price"];
            return price >= category.min && price < category.max;
          }).length;
      
          return { category: category.range, count };
        });
      
        const width = 800;
        const height = 500;
      
        const margin = {
          top: 50,
          right: 50,
          left: 70,
          bottom: 100,
        };
      
        const xScale = d3
          .scaleBand()
          .domain(categoryData.map((d) => d.category))
          .range([margin.left, width - margin.right])
          .padding(0.2);
      
        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(categoryData, (d) => d.count)])
          .range([height - margin.bottom, margin.top]);
      
        const svg = d3
          .select("#no-delay-customers")
          .attr("style", `max-width: ${width}px; max-height: ${height}px;`)
          .append("svg")
          .attr("viewBox", [0, 0, width, height]);
      

        svg
          .append("g")
          .selectAll("rect")
          .data(categoryData)
          .join("rect")
          .attr("x", (d) => xScale(d.category))
          .attr("y", (d) => yScale(d.count))
          .attr("width", xScale.bandwidth())
          .attr("height", (d) => yScale(0) - yScale(d.count))
          .attr("fill", "var(--harpy-4)");
      

        svg
          .append("g")
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(d3.axisBottom(xScale))
          .call((g) =>
            g
              .selectAll("text")
              .attr("font-size", "12")
              .attr("transform", "rotate(-45)")
              .attr("text-anchor", "end")
          )
          .append("text")
          .attr("x", (width - margin.right) / 2)
          .attr("y", 80)
          .attr("fill", "black")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .text("Ticket Price Categories");
      

        svg
          .append("g")
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(d3.axisLeft(yScale))
          .call((g) => g.selectAll("text").attr("font-size", "12"))
          .append("text")
          .attr("x", -height / 2)
          .attr("y", -50)
          .attr("transform", "rotate(-90)")
          .attr("text-anchor", "middle")
          .attr("fill", "black")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .text("Number of Customers");
      

        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", margin.top / 2)
          .attr("text-anchor", "middle")
          .attr("font-size", 18)
          .attr("font-weight", "bold")
          .attr("fill", "black")
          .text("Customers Without Delay by Ticket Price");
      };