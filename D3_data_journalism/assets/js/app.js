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
  
    // Initial Params
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";
  
    // Function for updating xScale when XAxis label is clicked
    function xScale(censusData, chosenXAxis) {
      
      var xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
          d3.max(censusData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
      return xLinearScale;
    }
  
    // Function for updating yScale when YAxis label is clicked
    function yScale(censusData, chosenYAxis) {
      
      var yLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
          d3.max(censusData, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);
      return yLinearScale;
    }
  
    // Function for updating xAxis when XAxis label is clicked
    function newXAxes(newXScale, xAxis) {
      var bottomAxis = d3.axisBottom(newXScale);
      xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
      return xAxis;
    }
  
    // Function for updating yAxis when XAxis label is clicked
    function newYAxes(newYScale, yAxis) {
      var leftAxis = d3.axisLeft(newYScale);
      yAxis.transition()
        .duration(1000)
        .call(leftAxis);
      return yAxis;
    }
  
    // Function for updating circles group with a transition to new circles
    function updateCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
      circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));
      return circlesGroup;
    }
      
    // Function for updating text group with a transition to new text
    function updateText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
      
      textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]))
        .attr("text-anchor", "middle");
      return textGroup;
    }
  }
  
  // When Browser Loads, makeResponsive() is Called
  makeResponsive();
    
  // When Browser Window is Resized, makeResponsive() is Called
  d3.select(window).on("resize", makeResponsive);