$(function() {
 $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: 'overall_salaries',
     dataType: 'json',
     success: function (data) {
       draw(data["professors"]);
     },
     error: function (result) {
         error();
     }
   });

  function draw(data) {
    var that = this;
    var margin = {top: 40, right: 50, bottom: 40, left: 200},
    width = 960 - margin.left - margin.right,
    barHeight = 40,
    height = barHeight * data.length + margin.top + margin.bottom;

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data, function(d) { return d.value; })]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var y = d3.scale.ordinal()
        .domain(data.map(function(d) {return d.name; }))
        .rangeRoundBands([0, height], .1);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 8);

    bar.append("text")
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2.5)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });

    chart.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - 70) + ")")
      .call(xAxis);

    chart.append("g")
     .attr("class", "axis")
     .call(yAxis);
  }
});
