export const renderChart2 = async () => {
  const data = await d3.csv("../data/customer_satisfaction.csv", d3.autoType);
  console.log(data);
};
