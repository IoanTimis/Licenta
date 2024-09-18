$(document).ready(function(){
  var modal = $('#Modal');
  var form = $('#Form');

  $(form).on('submit', function(e){
    e.preventDefault();
    var url = form.attr('action');
    var method = form.attr('method');

    var name = form.find('input[name=name]').val();
    var first_name = form.find('input[name=first_name]').val();
    var email = form.find('input[name=email]').val();
    var password = form.find('input[name=password]').val();
    var title = form.find('input[name=title]').val();

    var education_level = form.find('select[name=education_level]').val();
    var faculty_id = form.find('select[name=faculty_id]').val();
    var specialization_id = form.find('select[name=specialization_id]').val();

    $.ajax({
      url: url,
      method: method,
      data: {
        name: name,
        first_name: first_name,
        email: email,
        password: password,
        title: title,
        education_level: education_level,
        faculty_id: faculty_id,
        specialization_id: specialization_id
      },
      success: function(response){
        let line = $(`tr[data-id=${response.id}]`)
        line.find('td:eq(1) span').text(response.name);
        line.find('td:eq(2) span').text(response.first_name);
        line.find('td:eq(3) span').text(response.email);
        alert('User editat cu succes');
        modal.modal('hide');
      }
    });
  });

  let currentSpecializationId;

  $('.btn-info').on('click', function() {
      let id = $(this).data('id');

      $.ajax({
          url: `/admin/user/get/${id}`,
          method: 'GET',
          success: function(response) {
              console.log(response);
              currentSpecializationId = response.specializationId;  

              if (response.type === 'student') {
                  form.find('select[name=education_level]').prop('disabled', false).show();
                  form.find('select[name=faculty_id]').prop('disabled', false).show();
                  form.find('select[name=specialization_id]').prop('disabled', false).show();
                  form.find('input[name=title]').prop('disabled', true);
                  form.find('input[name=title]').closest('div').hide();
                  
                  form.find('select[name=education_level]').val(response.education_level);
                  console.log('education_level:', response.education_level);
                  
                  form.find('select[name=faculty_id]').val(response.facultyId).trigger('change');  
                  
              } else {
                  form.find('select[name=education_level]').prop('disabled', true).hide();
                  form.find('select[name=faculty_id]').prop('disabled', true).hide();
                  form.find('select[name=specialization_id]').prop('disabled', true).hide();
                  form.find('input[name=title]').prop('disabled', false);
                  form.find('input[name=title]').closest('div').show();

                  form.find('input[name=title]').val(response.title);
                  console.log('title:', response.title);
              }
              form.attr('action', `/admin/user/update/${id}`);

              form.find('input[name=name]').val(response.name);
              form.find('input[name=first_name]').val(response.first_name);
              form.find('input[name=email]').val(response.email);
          },
          error: function(error) {
              console.error('Error fetching user data:', error);
          }
      });

      modal.modal('show');
  });


  $("#facultySelect").on('change', function(e) {
    e.preventDefault();
    var selected = $(this).val();

    $.ajax({
      url: `/admin/fetch/specializations/${selected}`,
      method: 'GET',
      success: function(response) {
        var specializationSelect = $("#specializationSelect");
        specializationSelect.empty();
        specializationSelect.append('<option value="">Alege specializarea</option>');

        if (response.length === 0) {
          specializationSelect.append('<option value="">Nu există specializări disponibile</option>');
        } else {
          response.forEach(function(specialization) {
            specializationSelect.append(
              `<option value="${specialization.id}">${specialization.name}</option>`
            );
          });
        }

        specializationSelect.val(currentSpecializationId);
      },
      error: function(error) {
        console.error('Error fetching specializations:', error);
      }
    });
  });

  $('.btn-danger').on('click', function(){
    let id = $(this).data('id');
    let tr = $(this).closest('tr');

    $.ajax({
      url: `/admin/user/delete/${id}`,
      method: 'DELETE',
      success: function(response){
        tr.remove();
      }
    });
  });
});