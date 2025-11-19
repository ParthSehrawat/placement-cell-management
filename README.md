# 🎓 Placement Cell Management System

A comprehensive full-stack web application for managing college placement activities. This system facilitates seamless interaction between students, administrators, and companies for job postings and application management.

## ✨ Features

### For Students
- **User Registration & Authentication** - Secure signup and login with JWT-based authentication
- **Profile Management** - Update personal information, branch, and CGPA
- **Resume Upload** - Upload and manage resume documents
- **Browse Companies** - View all registered companies and their details
- **Job Listings** - Browse available job opportunities with detailed information
- **Apply for Jobs** - Submit applications for positions of interest
- **Application Tracking** - Monitor application status (Pending/Approved/Rejected)

### For Administrators
- **Admin Dashboard** - Comprehensive overview of all system activities
- **Company Management** - Add, view, update, and delete company records
- **Job Management** - Create and manage job postings with skills, salary, and deadlines
- **Application Management** - Review and update application statuses
- **Data Export** - Export application data to CSV format for reporting
- **User Management** - Monitor student registrations and activities

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database management system
- **JWT (jsonwebtoken)** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Fast-CSV** - CSV data export functionality
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling
- **Vanilla JavaScript** - Client-side scripting
- **Fetch API** - HTTP requests

### Database
- **MySQL** (via XAMPP) - Database server
- **mysql2** - MySQL client for Node.js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **XAMPP** - [Download](https://www.apachefriends.org/)
- **Git** (optional) - For version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "DBMS PROJECT"
```

### 2. Database Setup

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL** services

2. **Create Database**
   - Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
   - Import the `db.sql` file or run the SQL statements manually
   - This will create the `placement_cell` database with all required tables

3. **Create Admin User** (Optional)
   - You can create an admin user manually in the `admins` table
   - Use bcrypt to hash the password before inserting
   - Example (using Node.js):
     ```javascript
     const bcrypt = require('bcryptjs');
     const hashedPassword = bcrypt.hashSync('your_password', 10);
     // Insert into admins table: name, email, password (hashed)
     ```

### 3. Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `env.sample` to `.env`:
     ```bash
     copy env.sample .env
     ```
   - Edit `.env` file with your database credentials:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=placement_cell
     JWT_SECRET=your_super_secret_jwt_key_here
     ```
   - **Important**: Change `JWT_SECRET` to a strong, random string in production

4. **Start the backend server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```
   - Server will run on `http://localhost:5000`
   - You should see: `✅ Connected to MySQL database` and `🚀 Server running on http://localhost:5000`

### 4. Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Serve the frontend**
   - **Option 1: VS Code Live Server**
     - Install "Live Server" extension in VS Code
     - Right-click on `index.html` or any HTML file
     - Select "Open with Live Server"
   
   - **Option 2: Python HTTP Server**
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     ```
   
   - **Option 3: Node.js http-server**
     ```bash
     npx http-server -p 8000
     ```
   
   - **Option 4: Any static file server**
     - Serve the `frontend/` directory on any port (e.g., 8000)
     - Access via `http://localhost:8000`

3. **Update API Base URL** (if needed)
   - If your backend runs on a different port, update the API base URL in `frontend/assets/js/api.js`

## 📁 Project Structure

```
DBMS PROJECT/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database connection configuration
│   │   ├── controllers/
│   │   │   ├── authController.js  # Authentication logic
│   │   │   ├── studentController.js
│   │   │   ├── companyController.js
│   │   │   ├── jobController.js
│   │   │   └── applicationController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js  # JWT authentication middleware
│   │   │   └── uploadMiddleware.js # File upload handling
│   │   ├── models/
│   │   │   ├── studentModel.js
│   │   │   ├── adminModel.js
│   │   │   ├── companyModel.js
│   │   │   ├── jobModel.js
│   │   │   └── applicationModel.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   ├── companyRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── applicationRoutes.js
│   │   ├── utils/
│   │   │   └── csvExporter.js     # CSV export utility
│   │   ├── app.js                 # Express app configuration
│   │   └── server.js              # Server entry point
│   ├── uploads/
│   │   └── resumes/               # Uploaded resume files
│   ├── .env                       # Environment variables (create from env.sample)
│   ├── env.sample                 # Environment variables template
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css         # Main stylesheet
│   │   ├── js/
│   │   │   ├── api.js             # API utility functions
│   │   │   ├── auth.js            # Authentication logic
│   │   │   ├── student.js         # Student dashboard logic
│   │   │   └── admin.js           # Admin dashboard logic
│   │   └── img/                   # Images and assets
│   ├── login.html
│   ├── signup.html
│   ├── student-dashboard.html
│   ├── admin-dashboard.html
│   ├── company-management.html
│   ├── job-listings.html
│   ├── apply.html
│   └── application-status.html
│
├── db.sql                         # Database schema
└── README.md                      # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Student registration
  - Body: `{ name, email, password, branch, cgpa }`
- `POST /api/auth/login` - Login (students/admins)
  - Body: `{ email, password }`
  - Returns: JWT token

### Student Routes (Protected)
- `GET /api/student/profile` - Get student profile
- `PUT /api/student/profile` - Update student profile
- `POST /api/student/upload-resume` - Upload resume file

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create company (Admin only)
- `PUT /api/companies/:id` - Update company (Admin only)
- `DELETE /api/companies/:id` - Delete company (Admin only)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (Admin only)
- `PUT /api/jobs/:id` - Update job (Admin only)
- `DELETE /api/jobs/:id` - Delete job (Admin only)
- `POST /api/jobs/:id/apply` - Apply for a job (Student only)

### Applications
- `GET /api/applications` - Get applications (filtered by role)
- `GET /api/applications/:id` - Get application by ID
- `PUT /api/applications/:id` - Update application status (Admin only)
- `GET /api/applications/export` - Export applications to CSV (Admin only)

### Health Check
- `GET /api/health` - Server health check

## 🎯 Usage Guide

### For Students

1. **Sign Up**
   - Navigate to the signup page
   - Fill in your details (name, email, password, branch, CGPA)
   - Submit the form

2. **Login**
   - Use your registered email and password
   - You'll be redirected to the student dashboard

3. **Upload Resume**
   - Go to your dashboard
   - Upload your resume (PDF/DOC/DOCX format)

4. **Browse & Apply**
   - View available companies and job listings
   - Click on a job to see details
   - Apply for positions you're interested in

5. **Track Applications**
   - Check your application status
   - View all your submitted applications

### For Administrators

1. **Login**
   - Use admin credentials to log in
   - Access the admin dashboard

2. **Manage Companies**
   - Add new companies with details (name, role, package, description)
   - Edit or delete existing companies

3. **Manage Jobs**
   - Create job postings linked to companies
   - Specify skills required, salary, and application deadline
   - Edit or remove job listings

4. **Review Applications**
   - View all student applications
   - Update application status (Approve/Reject)
   - Export application data to CSV

## 🧪 Testing

### Manual Testing Checklist

- [ ] Student registration and login
- [ ] Admin login
- [ ] Student profile update
- [ ] Resume upload functionality
- [ ] Company CRUD operations (Admin)
- [ ] Job CRUD operations (Admin)
- [ ] Job application submission (Student)
- [ ] Application status update (Admin)
- [ ] CSV export functionality
- [ ] Authentication middleware (protected routes)
- [ ] Error handling and validation

## 🔒 Security Features

- **Password Hashing** - Passwords are hashed using bcrypt before storage
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Middleware ensures only authenticated users access protected endpoints
- **File Upload Validation** - Resume uploads are validated and stored securely
- **SQL Injection Prevention** - Parameterized queries using mysql2

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure XAMPP MySQL is running
   - Check database credentials in `.env` file
   - Verify database name matches in `.env`

2. **Port Already in Use**
   - Change `PORT` in `.env` file
   - Or stop the process using port 5000

3. **CORS Errors**
   - Ensure backend CORS is configured correctly
   - Check that frontend is making requests to correct API URL

4. **File Upload Issues**
   - Ensure `uploads/resumes/` directory exists
   - Check file size limits
   - Verify file format is supported

5. **JWT Token Errors**
   - Clear browser localStorage
   - Login again to get a new token
   - Check JWT_SECRET in `.env`

## 📝 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=placement_cell
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

[Your Name]

## 🙏 Acknowledgments

- Express.js community
- MySQL documentation
- All contributors and testers

---

**Note**: This is a project for educational purposes. For production use, consider additional security measures, error handling, and scalability improvements.
