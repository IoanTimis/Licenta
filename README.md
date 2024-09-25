**Online BSc/MSc Project Selection Application**  
**Author:** Ioan Timiș

The application facilitates the online management and selection of BSc/MSc thesis projects, integrating authentication and filtering functionalities for both lecturers and students.  

**Features:**

1. **For Lecturers:**
   - Lecturers can add, edit, clone, and delete BSc/MSc projects, specifying the title, keywords, description, number of available student slots, associated faculty, and specialization.
   - Each project also requires the specification of the education level (BSc or MSc), ensuring projects are categorized according to academic levels.
   - Lecturers can accept student requests, which automatically decrease the number of available slots.
   - They have access to a filtered list of requests from students, allowing efficient management of submissions based on various criteria such as accepted, rejected or pending.

2. **For Students:**
   - Students can search available projects by lecturer or keywords.
   - An automatic filter ensures that students only see projects related to their specialization, education level (BSc or MSc), and with available slots.
   - Students can send requests for one or more projects to the lecturers.

3. **Authentication:**
   - Authentication is implemented using Google Auth via e-uvt.ro accounts for both lecturers and students, alongside regular email/password authentication for broader accessibility.

4. **For the Administrator:**
   - The admin has comprehensive capabilities to manage faculties and specializations, with the ability to view, add, edit, and delete these entities.
   - Additionally, admins can manage (view, edit, delete) user accounts, adjusting access as needed across the platform.

**Technologies used:**
- Backend: Node.js with Express.js
- Database: MySQL, managed with Sequelize ORM for relational data handling
- Authentication: Google OAuth and standard email/password methods
- Frontend: HTML, CSS, JavaScript, and EJS for templating

This application is designed to enhance the administrative and educational interaction between students and lecturers, providing a streamlined approach to thesis project management in an academic environment.
