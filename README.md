# Student Management System - Full Stack Application

This project consists of an Angular frontend and a NestJS backend for managing student records.

## Project Structure

```
├── src/                    # Angular Frontend
│   ├── app/
│   │   ├── auth/           # Authentication components
│   │   ├── students/       # Student management components
│   │   ├── auth.service.ts # Authentication service
│   │   └── student.service.ts # Student service (HTTP client)
│   └── ...
├── backend/                # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── students/       # Students module
│   │   ├── common/dto/     # Data Transfer Objects
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   └── ...
└── README.md
```

## Features

### Backend (NestJS)
- **Students API**:
  - `GET /api/students` - Get all students
  - `GET /api/students/:id` - Get student by ID
  - `POST /api/students` - Create new student
  - `PUT /api/students/:id` - Update student
  - `DELETE /api/students/:id` - Delete student

- **Authentication API**:
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration

- **CORS enabled** for Angular frontend
- **TypeScript** with proper typing
- **Modular architecture** with separate modules for students and auth

### Frontend (Angular)
- **HTTP Client** integration for API calls
- **Student Management**: Create, read, update, delete students
- **Authentication**: Login and register functionality
- **Responsive UI** with forms and data tables
- **Observable-based** service layer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run start:dev
   ```
   Backend runs on: http://localhost:3000

2. **Start the Frontend Server**:
   ```bash
   npm start
   # or
   ng serve
   ```
   Frontend runs on: http://localhost:4200

### API Testing

You can test the API endpoints using tools like Postman or curl:

**Get All Students**:
```bash
curl http://localhost:3000/api/students
```

**Login**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

**Create Student**:
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "dob": "2000-01-01",
    "gender": "Male",
    "grade": "10",
    "country": "Egypt"
  }'
```

## Technology Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Programming language
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend
- **Angular** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **HttpClient** - HTTP communication

## Data Models

### Student
```typescript
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string; // ISO format: YYYY-MM-DD
  gender: 'Male' | 'Female';
  grade: string;
  country: string;
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
```

## Default Credentials

For testing the authentication system, use:
- **Email**: admin@example.com
- **Password**: admin123

## Development Notes

- The backend uses in-memory storage for simplicity
- CORS is configured to allow requests from http://localhost:4200
- All API endpoints are prefixed with `/api`
- The frontend automatically reloads the student list after CRUD operations
- Error handling is implemented for both frontend and backend

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL)
- Implement JWT authentication
- Add user roles and permissions
- Include file upload for student photos
- Add pagination for large datasets
- Implement search and filtering
- Add unit and integration tests
