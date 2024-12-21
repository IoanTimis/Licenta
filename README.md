# Online BSc/MSc Themes Selection Application
**Author:** Ioan Timiș  

This application facilitates the online management and selection of BSc/MSc thesis projects. It integrates authentication and filtering functionalities for both lecturers and students, aiming to streamline the process of selecting and managing thesis projects.

---

## Features

### For Lecturers
- **Manage Projects**  
  Lecturers can add, edit, clone, and delete BSc/MSc projects, providing the following details:
  - Title  
  - Keywords  
  - Description  
  - Number of available student slots  
  - Associated faculty  
  - Specialization  
  - Education level (BSc or MSc)  

- **Accept Student Requests**  
  Lecturers can accept or reject student requests, which automatically updates the number of available slots.  

- **Request Management**  
  Lecturers have access to a filtered list of student requests, allowing for efficient management based on request status (accepted, rejected, pending).  

---

### For Students
- **Project Search & Filtering**  
  Students can search for available projects by lecturer or keyword. The system automatically filters projects based on:
  - Specialization  
  - Education level (BSc or MSc)  
  - Available slots  

- **Request Submission**  
  Students can submit requests for one or more projects to the respective lecturers.  

---

### For Administrators
- **Manage Faculties & Specializations**  
  The admin can manage faculties and specializations, including the ability to add, edit, and delete them.  

- **User Management**  
  Admins can manage user accounts, adjusting access and roles as needed.  

---

### Authentication
- **Google OAuth Integration**  
  Authentication is implemented via Google Auth using e-uvt.ro accounts for both lecturers and students.  

- **Email/Password Authentication**  
  Standard email/password authentication is also supported for broader accessibility.  

---

### Technologies Used
- **Backend:**  
  Node.js with Express.js  

- **Database:**  
  MySQL with Sequelize ORM for relational data handling  

- **Authentication:**  
  Google OAuth and standard email/password methods  

- **Frontend:**  
  HTML, CSS, JavaScript  
  Next.js (in progress)  

---

## Working On

1. **Adding Next.js as Front-End Framework**  
   - Transitioning the frontend to React for enhanced interactivity and state management.  
   - Modularizing components for scalability and maintainability.  

2. **UI/UX Improvements**  
   - Enhancing the user interface and user experience across all application components to ensure intuitive navigation and engagement.  

3. **Accept/Reject Requests Directly from a Project Card**  
   - Lecturers can accept or reject requests directly from the project card.  
   - Students can submit requests directly from the card.  

4. **Search Filters for Lecturer Requests**  
   - Adding a search functionality to filter requests by faculty and specialization.  

5. **Email Notifications for Request Updates**  
   - Automatic email notifications to students when their requests are updated.  

6. **Filtering Projects by Available Slots**  
   - Lecturers can filter projects based on the number of slots (e.g., 0 slots or 1+ slots available).  

7. **"My Students" Page for Lecturers**  
   - A page dedicated to lecturers to view and manage their students:
     - Filtering by topics.  
     - Viewing student details and assigned topics.  
     - Redirecting to a student's request for modifications.  

8. **Student Confirmation for Project Acceptance**  
   - Once a lecturer accepts a student's request, the student must confirm their acceptance.  
   - Other pending applications by the student are automatically deleted upon confirmation.  

9. **Table for Lecturer Verification**  
   - A table to verify users logging in as lecturers, ensuring role-based access.  

10. **Email-Based Login with Verification Code**  
    - A feature where users receive a verification code via email to complete their login.  

11. **Unit Testing for All Features**  
    - Writing automated unit tests to ensure reliability and robustness.  

12. **Chat System for Requests**  
    - A messaging feature for each request, enabling communication between students and lecturers.  

13. **User Feedback and Evaluation**  
    - Collecting feedback from test users via structured forms to identify strengths and areas for improvement.  

14. **Integration with Gmail for Additional Data**  
    - Exploring the possibility of fetching additional information (faculty and specialization) from Gmail during authentication.  

---

This application is designed to improve administrative and academic interactions, ensuring a user-friendly and efficient process for thesis project management.
