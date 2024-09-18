function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

$(document).ready(function() {
//Add-edit topic------------------------------------------------------------------------------------------------------
  $("#topicForm").on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    var action = form.attr('method');

    let selectedSpecializations = [];
    $('.chooseSpecialization').each(function() {
      const selectedValue = $(this).val();
      if (selectedValue) {
          selectedSpecializations.push(selectedValue);
      }
    });

    $.ajax({
      url: url,
      method: action,
      data: {
        title: form.find('input[name="title"]').val(),
        description: form.find('textarea[name="description"]').val(),
        specialization: form.find('select[name="specialization"]').val(),
        keywords: form.find('input[name="keywords"]').val(),
        slots: form.find('input[name="slots"]').val(),
        education_level: form.find('select[name="education_level"]').val(),
        faculty_id: form.find('select[name="faculty_id"]').val(),
        specialization_ids: selectedSpecializations
      },
      success: function(response) {
        if(action === 'POST') {
          html = `<div class="col">
                      <a href="/teacher/topic/${response.topic.id}" class="text-decoration-none text-dark">
                          <div class="card" data-id="${response.topic.id}">
                              <img src="" class="card-img-top" alt="">
                              <div class="card-body">
                                  <h4 class="card-title">Adaugat Recent</h4>
                                  <h5 class="card-title">Titlu: ${response.topic.title}</h5>
                                  <p class="card-text description">Descriere: ${truncateText(response.topic.description, 40)}</p>
                                  <p class="card-text keywords">Cuvinte cheie: ${response.topic.keywords}</p>
                                  <p class="card-text slots">Locuri: ${response.topic.slots}</p>
                                  <p class="card-text education_level">Tip: ${response.topic.education_level}</p>
                                  <p>${response.topic.id}</p>
                              </div>
                          </div>
                      </a>
                      <div class="card-footer d-flex justify-content-between">
                          <div class="dropdown">
                              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Actiuni
                              </a>
                              <ul class="dropdown-menu" id="topicActions">
                                  <button type="button" class="btn dropdown-item editBtn" data-id="${response.topic.id}">
                                      Editează
                                  </button>
                                  <button type="button" class="btn dropdown-item cloneBtn" data-id="${response.topic.id}">Clonare</button>
                                  <button type="button" class="btn dropdown-item deleteBtn" data-id="${response.topic.id}">Sterge</button>
                              </ul>
                          </div>
                      </div>
                  </div>`;
          $('#topicsRow').append(html);
          $('.dropdown-toggle').dropdown();

          form.find('input[name="title"]').val('');
          form.find('input[name="keywords"]').val('');
          form.find('textarea[name="description"]').val('');
          form.find('input[name="slots"]').val('');
          form.find('select[name="education_level"]').val('bsc');
          console.log('Topic added successfully:', response);
          alert('Topic added successfully');

        } else if(action === 'PUT') {
          const card = document.querySelector(`.card[data-id="${response.topic.id}"]`);
          card.querySelector('.card-title').textContent = `Titlu: ${response.topic.title}`;
          card.querySelector('.description').textContent = `Descriere: ${truncateText(response.topic.description, 40)}`;
          card.querySelector('.keywords').textContent = `Cuvinte cheie: ${response.topic.keywords}`;
          card.querySelector('.slots').textContent = `Locuri: ${response.topic.slots}`;
          card.querySelector('.education_level').textContent = `Tip: ${response.topic.education_level}`;
          console.log('Topic edited successfully:', response);
          alert('Topic edited successfully');
        }
      },
      error: function(error) {
        console.error('Error adding topic:', error);
      }
    });
  });

//Edit topic------------------------------------------------------------------------------------------------------  
  $('#topicsRow').on('click', '.editBtn', function() {
    const topicId = $(this).data('id');
    $.ajax({
        url: `/teacher/fetch/topic/${topicId}`, 
        type: 'GET',
        success: function(data) {
            console.log('Data:', data);
            openModal('edit', data);
        },
        error: function(error) {
            console.log('Eroare la preluarea datelor:', error);
        }
    });
  });


//Delete topic------------------------------------------------------------------------------------------------------
  $("#topicsRow").on('click', '.deleteBtn', function(e) {
    e.preventDefault();
    var topicId = $(this).data('id');
    var card = $(this).closest('.col');
    console.log('Topic id:', topicId);
    const confirmDelete = confirm('Ești sigur că vrei să ștergi acest obiect?');

    if (!confirmDelete) {
        return;
    }
    
    $.ajax({
        url: `/teacher/topic/delete/${topicId}`,
        method: 'DELETE',
        success: function(response) {
            card.remove();
            console.log('Topic deleted successfully:', response);
            alert('Topic deleted successfully');
        },
        error: function(error) {
            console.error('Error deleting topic:', error);
        }
    });
  });

//Clone topic------------------------------------------------------------------------------------------------------
  $('#topicsRow').on('click', '.cloneBtn', function() {
    const topicId = $(this).data('id');
    $.ajax({
        url: `/teacher/fetch/topic/${topicId}`, 
        type: 'GET',
        success: function(data) {
            console.log('Data:', data);
            openModal('clone', data);
        },
        error: function(error) {
            console.log('Eroare la preluarea datelor:', error);
        }
    });
  });

//Small functions------------------------------------------------------------------------------------------------------

  $(`.addBtn`).on('click', function() {
    openModal('add');
  });

  $('.addSpecializationsBtn').on('click', function() {
    let html = `
            <div class="mb-3 specialization-div">
                <label for="" class="form-label">Alege specializarea</label>
                <div class="d-flex align-items-center">
                    <select class="form-select chooseSpecialization" name="specialization_id[]"></select>
                    <button type="button" class="btn-close btn-danger removeSpecialization"></button>
                </div>
            </div>
    `;  
    $('#selectSpecializationsContainer').append(html);
    $("#inputGroupSelectFaculty").trigger('change');
  });

  $('#selectSpecializationsContainer').on('click', '.removeSpecialization', function() {
    $(this).closest('.specialization-div').remove(); // Șterge div-ul părinte
});

//Formselectgroups------------------------------------------------------------------------------------------------------
  $("#inputGroupSelectFaculty").on('change', function(e) {
    e.preventDefault();
    console.log('Faculty changed');
    var selected = $(this).val();
    $.ajax({
        url: `/fetch/getSpecializations/${selected}`,
        method: 'GET',
        success: function(response) {
            $(".chooseSpecialization").empty();
            
            response.forEach(function(specialization) {
                $(".chooseSpecialization").append(
                    `<option value="${specialization.id}">${specialization.name}</option>`
                );
            });
        },
        error: function(error) {
            console.error('Error fetching specializations:', error);
        }
    });
  });


//Populating/clear the modal data------------------------------------------------------------------------------------------------------
  function openModal(action, data = {}) {
    let modal = $('#topicModal');
    let form = $('#topicForm');
    let facultyDiv = form.find('select[name="faculty_id"]').closest('div');
    let specializationDiv = $('#selectSpecializationsContainer');
    let addSpecializationsBtn = $('.addSpecializationsBtn');

    specializationDiv.empty();
    let html =  `<div class="mb-3">
                    <label for="" class="form-label">Alege specializarea</label>
                    <select class="form-select chooseSpecialization" name="specialization_id[]"></select>
                </div>`;
    specializationDiv.append(html);
    
    if (action === 'add') {
        $('#modalMsg').text('');
        form.attr('action', '/teacher/topic/add');
        form.attr('method', 'POST');
        $('#topicModalLabel').text('Adaugă temă de licență');
        modal.find('.modal-footer').find('.btn-primary').text('Adauga tema');

        form.find('input[name="title"]').val('');
        form.find('input[name="keywords"]').val('');
        form.find('textarea[name="description"]').val('');
        form.find('input[name="slots"]').val('');
        form.find('select[name="education_level"]').val('bsc');

        form.find('select[name="faculty_id"]').val(data.faculty_id).attr('disabled', false);
        form.find('select[name="specialization"]').val(data.specialization_id).attr('disabled', false);

    } else if (action === 'edit') {
      $('#modalMsg').text('');
      form.attr('action', `/teacher/topic/edit/${data.id}`);
      form.attr('method', 'PUT');
      $('#topicModalLabel').text('Editează temă de licență');
      modal.find('.modal-footer').find('.btn-primary').text('Editeaza tema');

      form.find('input[name="title"]').val(data.title);
      form.find('input[name="keywords"]').val(data.keywords);
      form.find('textarea[name="description"]').val(data.description);
      form.find('input[name="slots"]').val(data.slots);
      form.find('select[name="education_level"]').val(data.education_level);

      facultyDiv.hide();
      form.find('select[name="faculty_id"]').val(data.faculty_id).attr('disabled', true);
      specializationDiv.hide();
      form.find('select[name="specialization"]').val(data.specialization_id).attr('disabled', true);
      addSpecializationsBtn.hide();

    } else if (action === 'clone') {
        $('#modalMsg').text('mesaj');
        form.attr('action', '/teacher/topic/add');
        form.attr('method', 'POST');
        $('#topicModalLabel').text('Clonează temă de licență');
        modal.find('.modal-footer').find('.btn-primary').text('Cloneaza tema');

        form.find('input[name="title"]').val(data.title);
        form.find('input[name="keywords"]').val(data.keywords);
        form.find('textarea[name="description"]').val(data.description);
        form.find('input[name="slots"]').val(data.slots);
        form.find('select[name="education_level"]').val(data.education_level);

        form.find('select[name="faculty_id"]').val(data.faculty_id).attr('disabled', false);
        form.find('select[name="specialization"]').val(data.specialization_id).attr('disabled', false);
    };
    
    $('#topicModal').modal('show');
  };
});