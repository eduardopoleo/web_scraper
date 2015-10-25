$(function() {
  url = 'all_salaries'
  ajax_call(url, draw)

  //Will handle the updates, new enters and exits
  $('.choice').click(function(e) {
      var url = e.target.defaultValue
      ajax_call(url, update)
  });

  function ajax_call(url, callback) {
    $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: url,
     dataType: 'json',
     success: function (data) {
       callback(data["averages"])
     },
     error: function (result) {
         error();
     }
    });
  }

  //Draws the initial rectangles. It only manages the enter() joins
  function update(dataSet) {
    var w = 1000
    var h = 1250

    var xPadding = 10
    var yPadding = 20

    var xMargin = 200
    var yMargin = 0

    var rectMargin = 5

    var xScale = d3.scale.linear()
                            .domain([0, 246000])
                            .range([xPadding, w - xMargin - xPadding])

    var yScale = d3.scale.ordinal()
                            .domain(d3.range(dataSet.length))
                            .rangeRoundBands([0, (h - 1.2 * yPadding )], 0.05)


    //Updating the rects/////////////////////////////////
    var key = function(d) {
        return d.university;
    };

    var rects = d3.select(".rects")
                .selectAll("rect")
                .data(dataSet, key)

        rects.enter()
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

        rects.transition()
            .duration(500)
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

        rects.exit()
           .transition()
           .duration(500)
           .attr("x", w)  // <-- Exit stage left
           .remove();

/////////Updating labels /////////////////

var labels = d3.select('.labels')
               .selectAll('.amount')
               .data(dataSet, key)

   labels.enter()
        .append("text")
        .text(function (d) {
          return d.average_salary
        })
        .attr("x", function (d) {
          return xScale(d.average_salary) - 40 //magic
        })
        .attr("text-anchor", "middle")
        .attr("class", "amount")
        .attr("y", function (d, i) {
          return yScale(i) + yScale.rangeBand() / 1.7;//magic
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red")

  labels.transition()
       .duration(500)
       .text(function (d) {
         return d.average_salary
       })
       .attr("x", function (d) {
         return xScale(d.average_salary) - 40 //magic
       })
       .attr("text-anchor", "middle")
       .attr("class", "amount")
       .attr("y", function (d, i) {
         return yScale(i) + yScale.rangeBand() / 1.7;//magic
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "red");

   labels.exit()
      .transition()
      .duration(500)
      .attr("x", w)  // <-- Exit stage left
      .remove();

///////////Updating axis///////////////
     var yAxisScale = d3.scale.ordinal()
                                 .domain(dataSet.map(function (d) {
                                   return d.university
                                 }))
                                 .rangeRoundBands([0, (h - 1.2 * yPadding )], 0.05)

     var xAxis = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(5)

     var yAxis = d3.svg.axis()
                   .scale(yAxisScale)
                   .orient("left")
      //Updating the axis of this motherfucker
        svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

  //Update y-axis
        svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);
  }

  function draw(dataSet) {
    var w = 1000
    var h = 1250

    var xPadding = 10
    var yPadding = 20

    var xMargin = 200
    var yMargin = 0

    var rectMargin = 5


    svg = d3.select('body')
                  .append('svg')
                  .attr("width", w)
                  .attr("height", h)
                  .append('g')
                  .attr("transform", "translate(" + xMargin + "," + yMargin + ")")

    // In order for the left axis to show I need to translate the chart enough
    var xScale = d3.scale.linear()
                            .domain([0, 246000])
                            .range([xPadding, w - xMargin - xPadding])

    var yScale = d3.scale.ordinal()
                            .domain(d3.range(dataSet.length))
                            .rangeRoundBands([0, (h - 1.2 * yPadding )], 0.05)

    var yAxisScale = d3.scale.ordinal()
                                .domain(dataSet.map(function (d) {
                                  return d.university
                                }))
                                .rangeRoundBands([0, (h - 1.2 * yPadding )], 0.05)

        rects = svg.append('g')
                    .attr("class", "rects")
                    .selectAll('rect')
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

    svg.append('g')
        .attr('class', "labels")
            .selectAll("text")
            .data(dataSet)
            .enter()
            .append("text")
            .text(function (d) {
            return d.average_salary
            })
            .attr("x", function (d) {
            return xScale(d.average_salary) - 40 //magic
            })
            .attr("class", "amount")
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
                  .ticks(5)

    var yAxis = d3.svg.axis()
                  .scale(yAxisScale)
                  .orient("left")

    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (h - yPadding) + ")")
          .call(xAxis);

    svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
  }
});
