$(function() {
  ajax_call('all_salaries')

  $('.choice').click(function(e) {
    var url = e.target.defaultValue
    $(".chart").empty()
    ajax_call(url)
  });

  function ajax_call(url) {
    $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: url,
     dataType: 'json',
     success: function (data) {
       console.log(data)
       draw(data["averages"]);
     },
     error: function (result) {
         error();
     }
    });
  }
  //wrap this on a onchange for all the radio buttons with the same class
  //When a button with that class gets tickle it passes the info down,(maybe just and index and gets parsed in here)
  function draw(data) {
    var that = this;
    var margin = {top: 40, right: 50, bottom: 40, left: 200},
    width = 960 - margin.left - margin.right,
    barHeight = 40,
    height = barHeight * data.length + margin.top + margin.bottom;

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, 245852.56]);
        //This magic number is the max average_salary among all my data sets
        // I do this so that the bars make sense agains each other.

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var y = d3.scale.ordinal()
        .domain(data.map(function(d) {return d.university; }))
        .rangeRoundBands([10  , height - 100], -1);

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
        .attr("width", function(d) { return x(d.average_salary); })
        .attr("height", barHeight - 8);

    bar.append("text")
        .attr("x", function(d) { return x(d.average_salary) - 3; })
        .attr("y", barHeight / 2.5)
        .attr("dy", ".35em")
        .text(function(d) { return "$ " + d.average_salary.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); });

    chart.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - 70) + ")")
      .call(xAxis);

    chart.append("g")
     .attr("class", "axis")
     .call(yAxis);
  }
});
