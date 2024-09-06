$(document).ready(function() {
// Student search
  $('#search').on('input', function() {
      let searchInput = $(this).val().toLowerCase();  
      searchInput = searchInput.split(/[ ,]+/);  

      $('.col').each(function() {
          let cardKeywords = $(this).data('keywords').toLowerCase().split(' ');
          let cardTeacher = $(this).data('teacher').toLowerCase();
          cardKeywords.push(cardTeacher);

          let hasMatch = searchInput.some(function(keyword) {
              return cardKeywords.some(function(cardKeyword) {
                  return cardKeyword.includes(keyword);
              });
          });

          if (hasMatch) {
              $(this).show();  
          } else {
              $(this).hide();
          }
      });
  });

// Teacher filter
  $('#reqFilter').on('change', function() {
    let filter = $(this).val();
    $('.col').each(function() {
        let cardTeacher = $(this).data('status');

        if (cardTeacher.includes(filter)) {
            $(this).show();  
        }else if (filter == 'all') {
            $(this).show();
        }else {
            $(this).hide();
        }
        });
    });
});