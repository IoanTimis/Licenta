
$(document).ready(function(){
  var modal = $('#Modal');
  var form = $('#Form');

  $(form).submit(function(e){
    e.preventDefault();
    var url = form.attr('action');
    var method = form.attr('method');

    var name = form.find('input[name=name]').val();
    var description = form.find('textarea[name=description]').val();
    var img_url = form.find('input[name=img_url]').val();

    $.ajax({
      url: url,
      type: method,
      data: {
        name: name,
        description: description,
        img_url: img_url
      },
      success: function(response){
        if(method == 'POST'){
         let html = 
          `<tr>
            <td><span>${response.id}</span></td>
            <td><span>${name}</span></td>
            <td><span>${description}</span></td>
            <td><span>${img_url}</span></td>
            <td><span>${response.createdAt}</span></td>
            <td><span>${response.updatedAt}</span></td>
            <td>
              <button class="btn btn-info" data-id="${response.id}">Editare</button>
              <button class="btn btn-danger" data-id="${response.id}">Stergere</button>
            </td>
          </tr>
          `;
          $('.table tbody').append(html);

          form.find('input[name=name]').val('');
          form.find('textarea[name=description]').val('');
          form.find('input[name=img_url]').val('');
          alert('Facultate adaugata cu succes');
        }else if(method == 'PUT'){
          console.log(response);
          console.log(response.name);
          console.log(response.description);
          console.log(response.img_url);
          console.log(response.id);
          console.log(method);
          let row = $(`tr[data-id="${response.id}"]`);
          row.find('td:eq(1) span').text(response.name);
          row.find('td:eq(2) span').text(response.description);
          row.find('td:eq(3) span').text(response.img_url);
          alert('Facultate editata cu succes');
          $('#Modal').modal('hide');
        }
      }
    });
  });

  $('.addBtn').click(function(){
    openModal('POST');
  });

  $('.table tbody').on('click', '.btn-info', function(){
    var id = $(this).data('id');
    $.ajax({
      url: '/admin/faculty/get/' + id,
      type: 'GET',
      success: function(response){
        modal.find('input[name=name]').val(response.name);
        modal.find('textarea[name=description]').val(response.description);
        modal.find('input[name=img_url]').val(response.img_url);
      }
    });

    openModal('PUT', id);
  });

  $('.table tbody').on('click', '.btn-danger', function(){
    var id = $(this).data('id');
    var tr = $(this).closest('tr');
    const confirm = window.confirm('Esti sigur ca vrei sa stergi aceasta facultate?');

    if(!confirm){
      return null;
    }

    $.ajax({
      url: '/admin/faculty/delete/' + id,
      type: 'DELETE',
      success: function(response){
        tr.remove();
      }
    });
  });


  function openModal(method, id = null){
    if(method == 'POST'){
      form.attr('action', '/admin/faculty/add');
      form.attr('method', 'POST');

      form.find('input[name=name]').val('');
      form.find('textarea[name=description]').val('');
      form.find('input[name=img_url]').val('');

      modal.find('.modal-title').text('Adauga facultate');
      modal.find('.btn-primary').text('Adauga');
      modal.modal('show');
    }else if(method == 'PUT'){
      form.attr('action', '/admin/faculty/update/' + id);
      form.attr('method', 'PUT');
      
      modal.find('.modal-title').text('Editeaza facultate');
      modal.find('.btn-primary').text('Editeaza');
      modal.modal('show');
    }
  }
  
});