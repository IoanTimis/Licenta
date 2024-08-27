function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

$(document).ready(function() {

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
      },
      success: function(response) {
        if(action === 'POST') {
          html = `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                      <div class="col">
                          <a href="/teacher/topic/${response.topic.id}" class="text-decoration-none text-dark">
                              <div class="card">
                                  <img src="" class="card-img-top" alt="">
                                  <div class="card-body">
                                      <h5 class="card-title">Titlu: ${response.topic.title}</h5>
                                      <p class="card-text description">Descriere: ${truncateText(response.topic.description, 40)}</p>
                                      <p class="card-text keywords">Cuvinte cheie: ${response.topic.keywords}</p>
                                      <p class="card-text slots">Locuri: ${response.topic.slots}</p>
                                      <p class="card-text" education_level>Tip: ${response.topic.education_level}</p>
                                  </div>
                              </a>
                              <div class="card-footer d-flex justify-content-between">
                                  <button type="button" class="btn editBtn" data-bs-toggle="modal" data-bs-target="#editModal" data-id="<%= user.topics.id %>">
                                      Editează
                                  </button>
                                  <button type="button" class="btn deleteBtn" data-id="<%= user.topics.id %>">Șterge</button>
                              </div>
                          </div>
                      </div>
                  </div>
          `;
          $('#topicsContainer').append(html);
          console.log('Topic added successfully:', response);
          ajax.alert('Topic added successfully');
        } else {
          const card = document.querySelector(`.card[data-id="${response.topic.id}"]`);
          card.querySelector('.card-title').textContent = `Titlu: ${response.topic.title}`;
          card.querySelector('.description').textContent = `Descriere: ${truncateText(response.topic.description, 40)}`;
          card.querySelector('.keywords').textContent = `Cuvinte cheie: ${response.topic.keywords}`;
          card.querySelector('.slots').textContent = `Locuri: ${response.topic.slots}`;
          card.querySelector('.education_level').textContent = `Tip: ${response.topic.education_level}`;
          console.log('Topic edited successfully:', response);
          ajax.alert('Topic edited successfully');
        }
        
      },
      error: function(xhr, status, error) {
        console.error('Error adding topic:', error);
      }
    });
  });

  document.querySelector('.addBtn').addEventListener('click', function() {
    openModal('add');
  });

  document.querySelectorAll('.editBtn').forEach(button => {
    button.addEventListener('click', function() {
        const topicId = this.getAttribute('data-id');
        $.ajax({
            url: `/teacher/api/topic/${topicId}`, 
            type: 'GET',
            success: function(data) {
                openModal('edit', data);
            },
            error: function(error) {
                console.log('Eroare la preluarea datelor:', error);
            }
        });
    });
  });


  function openModal(action, data = {}) {
    let form = document.getElementById('topicForm');
    if (action === 'edit') {
        form.setAttribute('action', `/teacher/topic/edit/${data.id}`);
        form.setAttribute('method', 'PUT');
        document.getElementById('topicModalLabel').textContent = 'Editează temă de licență';

        form.querySelector('input[name="title"]').value = data.title;
        form.querySelector('input[name="keywords"]').value = data.keywords;
        form.querySelector('textarea[name="description"]').value = data.description;
        form.querySelector('select[name="education_level"]').value = data.education_level;
        form.querySelector('input[name="slots"]').value = data.slots;
    } else if (action === 'add') {
        form.setAttribute('action', '/teacher/topic/add');
        form.setAttribute('method', 'POST');
        document.getElementById('topicModalLabel').textContent = 'Adaugă temă de licență';

        form.querySelector('input[name="title"]').value = '';
        form.querySelector('input[name="keywords"]').value = '';
        form.querySelector('textarea[name="description"]').value = '';
        form.querySelector('select[name="education_level"]').value = 'bsc';
    }
    $('#myModal').modal('show');
  }

});