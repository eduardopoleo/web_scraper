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
     },
     error: function (result) {
         error();
     }
    });
  }

  dataSet = [
    {
      university: "Algoma",
      average: 3
    },

    {
      university: "Queens",
      average: 5
    },
    {
      university: "Queens",
      average: 8
    }
  ]
  draw(dataSet)

  function draw(dataSet) {
    w = 100
    h = 200
    rectMargin = 5



    svg = d3.select('body')
            .append('svg')
            .attr("width", w)
            .attr("height", h)

    var xScale = d3.scale.linear()
                         .domain([0, d3.max(dataSet, function (d) {
                           return d.average
                         })])
                         .range([0, w])

    rects = svg.selectAll('rect')
               .data(dataSet)
               .enter()
               .append("rect")
               .attr("x", 0)
               .attr("y", function (d, i) {
                 return h / dataSet.length * i
               })
               .attr("width", function (d) {
                 return xScale(d.average)
               })
               .attr("height", function () {
                 return h/dataSet.length - rectMargin
               })
  }


});
