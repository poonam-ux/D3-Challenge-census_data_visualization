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
  
    // Function for updating circles group with new tooltip
    function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
  
      if (chosenXAxis === "poverty") {
        var xLabel = "Poverty (%)";
      }
      else if (chosenXAxis === "age") {
        var xLabel = "Age (Median)";
      }
      else {
        var xLabel = "Household Income (Median)";
      }
      if (chosenYAxis === "healthcare") {
        var yLabel = "Lacks Healthcare (%)";
      }
      else if (chosenYAxis === "obesity") {
        var yLabel = "Obese (%)";
      }
      else {
        var yLabel = "Smokes (%)";
      }
  
      // Initialize tool tip
      var toolTip = d3.tip()
        .attr("class", "tooltip d3-tip")
        .offset([80, -50])
        .html(function(d) {
          return (`<strong>${d.state}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
        });
      // Create circles tooltip in the chart
      circlesGroup.call(toolTip);
      // Create event listeners to display an hdide the circles tooltip
      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout Event
        .on("mouseout", function(data) {
          toolTip.hide(data);
        });
      // Create text tooltip in the chart
      textGroup.call(toolTip);
      // Create Event Listeners to Display and Hide the Text Tooltip
      textGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout Event
        .on("mouseout", function(data) {
          toolTip.hide(data);
        });
      return circlesGroup;
    }
  }
  
  // When Browser Loads, makeResponsive() is Called
  makeResponsive();
    
  // When Browser Window is Resized, makeResponsive() is Called
  d3.select(window).on("resize", makeResponsive);