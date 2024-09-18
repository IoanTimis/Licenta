$(document).ready(function() {
  var form = $('#form');
  var teacherForm = $('#formT');

  $(form).on('submit', function(e) {
    e.preventDefault();
    var formData = $(form).serialize();
    console.log('Form data:', formData);

    $.ajax({
      url: '/complete-profile/as-student',
      method: 'PUT',
      data: formData,
      success: function(response) {
        console.log('Profile updated:', response);
        alert('Profile updated successfully!');
        window.location.href = 'http://www.licentatest.com/student';
      },
      error: function(error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      }
    });
  });

  $(teacherForm).on('submit', function(e) {
    e.preventDefault();
    var formData = $(teacherForm).serialize();
    console.log('Form data:', formData);

    $.ajax({
      url: '/complete-profile/as-teacher',
      method: 'PUT',
      data: formData,
      success: function(response) {
        console.log('Profile updated:', response);
        alert('Profile updated successfully!');
        window.location.href = 'http://www.licentatest.com/teacher';
      },
      error: function(error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      }
    });
  });

});