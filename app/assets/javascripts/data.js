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
    var margin = {top: 40, right: 50, bottom: 40, left: 150},
    width = 960 - margin.left - margin.right,
    barHeight = 40;

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data, function(d) { return d.value; })]);

    var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", barHeight * data.length + margin.top + margin.bottom)
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
  }
});
