$(document.ready(function() {
  $("#addform").on('submit', function(e) {
    e.preventDefault();
    var title = $('#title').val();
    var description = $('#description').val();
    var specialization = $('#inputGroupSelect02').val();
    $.ajax({
      url: '/addTopic',
      method: 'POST',
      data: {
        title: title,
        description: description,
        specialization: specialization
      },
      success: function(response) {
        html = `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    <div class="col">
                        <a href="/teacher/topic/${response.topic.id}" class="text-decoration-none text-dark">
                            <div class="card">
                                <img src="" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">Titlu: <%= topic.title %></h5>
                                    <p>Descriere: <%= truncateText(topic.description, 40) %></p>
                                    <p class="card-text">Locuri: <%= topic.slots %></p>
                                    <p class="card-text">Tip: <%= topic.type %></p>
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
        console.log('Topic added successfully:', response);
      },
      error: function(xhr, status, error) {
        console.error('Error adding topic:', error);
      }
    });
  });


}));