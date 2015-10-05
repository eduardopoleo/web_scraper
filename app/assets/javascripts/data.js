$(function() {
  $.ajax({
     type: "GET",
     contentType: "application/json; charset=utf-8",
     url: 'overall_salaries',
     dataType: 'json',
     success: function (data) {
         console.log(data)
     },
     error: function (result) {
         error();
     }
   });

});
