$(document).ready(function(){
  var modal = $('#Modal');
  var form = $('#Form')

  $(form).on('submit', function(e){
    e.preventDefault();
    var url = form.attr('action');
    var method = form.attr('method');

    var name = form.find('input').val();
    var description = form.find('textarea').val();
    var faculty_id = form.find('select').val();

    $.ajax({
      url: url,
      method: method,
      data: {
        name: name,
        description: description,
        faculty_id: faculty_id,
      },
      success: function(response){
        if(method === 'PUT'){
          let line = $(`tr[data-id=${response.id}]`)
          line.find('td:eq(1) span').text(response.name);
          line.find('td:eq(2) span').text(response.description);
          line.find('td:eq(3) span').text(response.facultyName);
          alert('facultate editata cu success!');
          modal.modal('hide');
        }else if(method === 'POST'){
          window.location.replace('/admin/specializations');
        }
      }
    });
  });

  $('.addBtn').on('click', function(){
    openModal('POST');
  });

  $('.btn-info').on('click', function(){
    let id = $(this).data('id');

    $.ajax({
      url: `/admin/specialization/get/${id}`,
      method: 'GET',
      success: function(response){
        form.find('input').val(response.name);
        form.find('textarea').val(response.description);
        form.find('select').val(response.faculty_id);
      }
    });

    openModal('PUT', id);
  });

  $('.btn-danger').on('click', function(){
    let id = $(this).data('id');
    let tr = $(this).closest('tr');


    $.ajax({
      url: `specialization/delete/${id}`,
      method: 'DELETE',
      success: function(response){
        tr.remove();
      }
    });
  });


  function openModal(method, id = null){
    if(method === 'POST'){
      form.attr('action', '/admin/specialization/add');
      form.attr('method', 'POST');

      form.find('input[name=name]').val('');
      form.find('textarea').val('');

      modal.find('.modal-title').text('Adauga specializare');
      modal.find('.btn-primary').text('Adauga');
      modal.modal('show');
    }else if(method === 'PUT'){
      form.attr('action', `/admin/specialization/update/${id}`);
      form.attr('method', 'PUT');

      modal.find('.modal-title').text('Editeaza Specializare')
      modal.find('.btn-primary').text('Editeaza')
      modal.modal('show')
    }
  }




});