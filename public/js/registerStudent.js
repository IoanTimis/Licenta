$(document).ready(function() {
  $("#inputGroupSelect01").on('change', function(e) {
      e.preventDefault();
      var selected = $(this).val();
      $.ajax({
          url: `/api/getSpecializations/${selected}`,
          method: 'GET',
          success: function(response) {
              $("#inputGroupSelect02").empty();
              
              response.forEach(function(specialization) {
                  $("#inputGroupSelect02").append(
                      `<option value="${specialization.id}">${specialization.name}</option>`
                  );
              });
          },
          error: function(error) {
              console.error('Error fetching specializations:', error);
          }
      });
  });

});
