$(document).ready(function(){

  $('.deleteBtn').on('click', function(){
    var id = $(this).data('id');
    var url = '/student/delete/request/' + id;

    const confirmDelete = confirm('Ești sigur că vrei să ștergi acest obiect?');

    if (confirmDelete) {
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result){
          alert('Aplicarea a fost șters cu succes!');
          window.location.href = '/student/request-topics';  
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  });

  $('.row').on('click','.deleteBtnCard' ,function(){
    var id = $(this).data('id');
    var url = '/student/delete/request/' + id;
    var card = $(this).closest('.col');
    const confirmDelete = confirm('Ești sigur că vrei să ștergi acest obiect?');

    if (confirmDelete) {
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result){
          card.remove();
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  });
  
});






