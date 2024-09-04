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

});