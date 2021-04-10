// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // If SVG Area is not empty when browser loads, remove & replace with a resized version of chart
    var svgArea = d3.select("body").select("svg");
  
    // Clear SVG if it is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
    
    // Setup chart parameters/dimensions
    var svgWidth = 980;
    var svgHeight = 600;
  
    // Set SVG margins
    var margin = {
      top: 20,
      right: 40,
      bottom: 90,
      left: 100
    };
  
    // Define dimensions of the chart area
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
  
    // Create an SVG element/wrapper - Select body, append SVG area & set the dimensions
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  
    // Append group element & set margins - Shift (Translate) by left and top margins using Transform
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

     // Import Data from the data.csv File
     d3.csv("assets/data/data.csv")
     .then(function(censusData) {
 
     // Format/Parse the Data and convert to numerical
     censusData.forEach(function(data) {
       data.poverty = +data.poverty;
       data.age = +data.age;
       data.income = +data.income;
       data.healthcare = +data.healthcare;
       data.obesity = +data.obesity;
       data.smokes = +data.smokes;
    });
    console.log(censusData)
});
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);