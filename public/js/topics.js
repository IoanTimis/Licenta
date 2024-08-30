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
        specialization_id: form.find('select[name="specialization_id"]').val()
      },
      success: function(response) {
        if(action === 'POST') {
          html = `<div class="col">
                      <a href="/teacher/topic/${response.topic.id}" class="text-decoration-none text-dark">
                          <div class="card" data-id="${response.topic.id}">
                              <img src="" class="card-img-top" alt="">
                              <div class="card-body">
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
                                  <button type="button" class="btn dropdown-item editBtn" data-bs-toggle="modal" data-bs-target="#topicModal" data-id="${response.topic.id}">
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
        } else {
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
      error: function(xhr, status, error) {
        console.error('Error adding topic:', error);
      }
    });
  });

//Delete topic------------------------------------------------------------------------------------------------------
  $("#topicsRow").on('click', '.deleteBtn', function() {
    var topicId = $(this).data('id');
    var card = $(this).closest('.col');
    console.log('Topic id:', topicId);
    $.ajax({
        url: `/teacher/topic/delete/${topicId}`,
        method: 'DELETE',
        success: function(response) {
            card.remove();
            console.log('Topic deleted successfully:', response);
            alert('Topic deleted successfully');
        },
        error: function(xhr, status, error) {
            console.error('Error deleting topic:', error);
        }
    });
  });



//Populating/clear the modal data------------------------------------------------------------------------------------------------------
  function openModal(action, data = {}) {
    let modal = $('#topicModal');
    let form = $('#topicForm');
    let facultyDiv = form.find('select[name="faculty_id"]').closest('div');
    let specializationDiv = form.find('select[name="specialization_id"]').closest('div');

    if (action === 'edit') {
        form.attr('action', `/teacher/topic/edit/${data.id}`);
        form.attr('method', 'PUT');
        $('#topicModalLabel').text('Editează temă de licență');
        modal.find('.modal-footer').find('.btn-primary').text('Editeaza tema');

        form.find('input[name="title"]').val(data.title);
        form.find('input[name="keywords"]').val(data.keywords);
        form.find('textarea[name="description"]').val(data.description);
        form.find('select[name="education_level"]').val(data.education_level);
        form.find('input[name="slots"]').val(data.slots);

        facultyDiv.addClass('hidden');
        specializationDiv.addClass('hidden');

    } else if (action === 'add') {
        form.attr('action', '/teacher/topic/add');// Todo: while event listener------------------------------------------------------------------------------------------------------

        form.attr('method', 'POST');
        $('#topicModalLabel').text('Adaugă temă de licență');
        modal.find('.modal-footer').find('.btn-primary').text('Adauga tema');

        form.find('input[name="title"]').val('');
        form.find('input[name="keywords"]').val('');
        form.find('textarea[name="description"]').val('');
        form.find('input[name="slots"]').val('');
        form.find('select[name="education_level"]').val('bsc');

        facultyDiv.removeClass('hidden');
        specializationDiv.removeClass('hidden');
    }
    
    $('#myModal').modal('show');
  }


//add listeners------------------------------------------------------------------------------------------------------
  $(`.addBtn`).on('click', function() {
    openModal('add');
  });

  $('#topicsRow').on('click', '.editBtn', function() {
    const topicId = $(this).data('id');
    $.ajax({
        url: `/teacher/api/topic/${topicId}`, 
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

//formselectgroups------------------------------------------------------------------------------------------------------
  $("#inputGroupSelect01").on('change', function(e) {
    e.preventDefault();
    var selected = $(this).val();
    $.ajax({
        url: `/getSpecializations/${selected}`,
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