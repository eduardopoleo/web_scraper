$(function() {
 $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: 'overall_salaries',
     dataType: 'json',
     success: function (data) {
      //  draw(data.professors);
     },
     error: function (result) {
         error();
     }
   });

  function draw(data) {
    console.log(data);
  }

  var data = [4, 8, 15, 16, 23, 42];

  var x = d3.scale.linear()
      .domain([0, d3.max(data)]) //max data withing the dataset
      .range([0, 420]); //420 is a discresional number that represents the desired size of the chart

//Remember the circle:
// unbound data with no corresponding element corresponds to .enter
// data points joined with existing elements . update
// unbound elements with no data .destroy
  d3.select(".chart")
    .selectAll("div") //selectAll selects the selection to be (created, updated, destroyed)
      .data(data) // Then binds it to the data
    .enter().append("div") // Since the collection is empty becuase there are not divs, we need to "enter" the new elements
      .style("width", function(d) {return x(d)  + "px"; }) //because each element was created with data joins the bars are already associated with data
      .style("background-color", "blue") // x represent a linear function that scales the data on the graph properly
      .text(function(d){return d; });
});
