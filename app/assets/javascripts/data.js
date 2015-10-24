$(function() {
  url = 'all_salaries'
  ajax_call(url)

  function ajax_call(url) {
    $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: url,
     dataType: 'json',
     success: function (data) {
       console.log(data["averages"])
       draw(data["averages"])
     },
     error: function (result) {
         error();
     }
    });
  }


  function draw(dataSet) {
    var w = 800
    var h = 1250

    var xPadding = 10
    var yPadding = 20

    var xMargin = 200
    var yMargin = 0

    var rectMargin = 5
    // d3.select(".chart")
    //       .attr("width", width + margin.left + margin.right)
    //       .attr("height", height)
    //    .append("g")
    //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg = d3.select('body')
              .append('svg')
              .attr("width", w)
              .attr("height", h)
              .append("g")
              .attr("transform", "translate(" + xMargin + "," + yMargin + ")");

    var xScale = d3.scale.linear()
                         .domain([0, d3.max(dataSet, function (d) {
                           return d.average_salary
                         })])
                         .range([xPadding, w - xMargin])

    var yScale = d3.scale.ordinal()
                          .domain(d3.range(dataSet.length))
                          .rangeRoundBands([0, (h - 1.2 * yPadding )], 0.05)

    var yAxisScale = d3.scale.ordinal()
                            .domain(dataSet.map(function (d) {
                              return d.university
                            }))
                            .rangeRoundBands([0, (h - 1.2 * yPadding )], 0.05)

    rects = svg.selectAll('rect')
               .data(dataSet)
               .enter()
               .append("rect")
               .attr("x", xPadding)
               .attr("y", function (d, i) {
                 return yScale(i)
               })
               .attr("width", function (d) {
                 return xScale(d.average_salary)
               })
               .attr("height", function () {
                 return h/dataSet.length - rectMargin
               })

    svg.selectAll("text")
              .data(dataSet)
              .enter()
              .append("text")
              .text(function (d) {
                return d.average_salary
              })
              .attr("x", function (d) {
                return xScale(d.average_salary) - 40 //magic
              })
              .attr("text-anchor", "middle")
              .attr("y", function (d, i) {
                return yScale(i) + yScale.rangeBand() / 1.7;//magic
              })
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .attr("fill", "red");

    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(10)

    var yAxis = d3.svg.axis()
                      .scale(yAxisScale)
                      .orient("left")

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + (h - yPadding) + ")")
       .call(xAxis);

    svg.append("g")
      .attr("class", "axis")
      .call(yAxis);
  }
});
