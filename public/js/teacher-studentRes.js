$(document).ready(function(){
  var rejAcc = '';
 
  $('#resTopicForm').on('submit', function(e){
    e.preventDefault();
  
    var status = rejAcc;
    var message = $(this).find('textarea[name="message"]').val();
    var url = $(this).attr('action');
    var data = {status: status, message: message};
    $.ajax({
      type: 'PUT',
      url: url,
      data: data,
      success: function(result){
        if(status === 'accepted'){
          status = 'acceptată';
        }else{
          status = 'respinsă';
        }
        alert('Cererea a fost ' + status + ' cu succes!');
        status = '';
        window.location.href = '/teacher/student-requests';
      },
      error: function(err){
        console.log(err);
      }
    });
  });


  $('.acceptBtn').on('click', function(){
    rejAcc = 'accepted';
    $('#resMessageModal').modal('show');
  });

  $('.rejectBtn').on('click', function(){
    rejAcc = 'rejected';
    $('#resMessageModal').modal('show');
  });

  $('.row').on('click','.deleteBtnCard' ,function(){
    var id = $(this).data('id');
    var url = '/teacher/delete/request/' + id;
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