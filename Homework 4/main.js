// Define data
const crime = d3.csv("us_statewide_crime.csv");

crime.then(function(data) {
  // Convert string values to numbers
  data.forEach(function(d) {
    d.Unemployed = +d.Unemployed;
  });
  data.sort((a, b) => b.Unemployed - a.Unemployed);

  // Set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 50, left: 100},
        width = 960 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  const svg = d3.select("body")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // X axis: scale and draw
  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Unemployed)])   // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.Unemployed })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add x-axis label
svg.append("text")             
    .attr("transform",
      "translate(" + (width/2) + " ," + 
                     (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Unemployment rate");

      data.sort((a, b) => d3.ascending(a.Unemployed, b.Unemployed));

  // Y axis: scale and draw
  const y = d3.scaleBand()
      .range([height, 0])
      .domain(data.map(d => d.State))
      .padding(0.3);
  svg.append("g")
      .call(d3.axisLeft(y));

  // Append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.State))
        .attr("width", d => x(d.Unemployed))
        .attr("height", y.bandwidth())
        .style("fill", "blue")
        .on("click", function() {
          d3.select(this)
            .style("fill", "red");
        });
});


