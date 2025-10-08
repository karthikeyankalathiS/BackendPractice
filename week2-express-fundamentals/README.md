# TeamFlow API - Week 2 Express.js Fundamentals

A RESTful API for TeamFlow project management platform built with Express.js, demonstrating Week 2 learning objectives.

## 🎯 Week 2 Learning Objectives Completed

- ✅ **Express.js routing and middleware**
- ✅ **CRUD APIs with in-memory storage**
- ✅ **Error handling middleware**
- ✅ **Postman API testing**

## 🚀 Features

### User Management
- Create, read, update, delete users
- User roles (admin, manager, member)
- User search and filtering
- User statistics

### Project Management
- Create, read, update, delete projects
- Project status tracking
- Team member management
- Project filtering by status and owner

### API Features
- RESTful API design
- Comprehensive error handling
- Input validation
- CORS support
- Security headers (Helmet)
- Request logging (Morgan)

## 📁 Project Structure

```
src/
├── app.js                 # Main Express application
├── controllers/           # Request handlers
│   ├── userController.js
│   └── projectController.js
├── middleware/            # Custom middleware
│   ├── errorHandler.js
│   └── notFound.js
├── models/               # Data models and services
│   ├── User.js
│   └── Project.js
└── routes/               # API routes
    ├── userRoutes.js
    └── projectRoutes.js
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

3. **Server will run on:** `http://localhost:3000`

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status

### Users API
- `GET /api/users` - Get all users (with optional query params)
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects API
- `GET /api/projects` - Get all projects (with optional query params)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project
- `DELETE /api/projects/:id/members/:userId` - Remove member from project

## 🧪 Testing with Postman

1. **Import the collection:**
   - Open Postman
   - Click "Import"
   - Select `TeamFlow_API.postman_collection.json`

2. **Test the API:**
   - Start the server: `npm start`
   - Run the requests in the collection
   - Check responses and error handling

## 📝 Example Requests

### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@teamflow.com",
  "role": "member"
}
```

### Create Project
```bash
POST /api/projects
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Complete redesign of company website",
  "ownerId": 1,
  "status": "planning"
}
```

### Query Parameters
```bash
# Get users by role
GET /api/users?role=admin

# Search users
GET /api/users?search=john

# Get projects by status
GET /api/projects?status=active

# Get projects by owner
GET /api/projects?owner=1
```

## 🔧 Key Express.js Concepts Demonstrated

### 1. Routing
- Express Router for modular routes
- Route parameters (`:id`)
- Query parameters (`?search=john`)
- HTTP methods (GET, POST, PUT, DELETE)

### 2. Middleware
- Application-level middleware (CORS, Helmet, Morgan)
- Route-level middleware
- Error handling middleware
- Custom middleware functions

### 3. Request/Response Handling
- JSON body parsing
- URL-encoded data parsing
- Response formatting
- Status codes

### 4. Error Handling
- Global error handler
- Custom error messages
- HTTP status codes
- Error logging

## 🎓 Learning Outcomes

By completing this project, you understand:

1. **Express.js Fundamentals**
   - Setting up Express applications
   - Routing and middleware concepts
   - Request/response cycle

2. **API Design**
   - RESTful API principles
   - HTTP methods and status codes
   - Resource-based URLs

3. **Data Management**
   - In-memory data storage
   - CRUD operations
   - Data validation

4. **Error Handling**
   - Middleware-based error handling
   - Custom error responses
   - Input validation

5. **API Testing**
   - Postman collection setup
   - Endpoint testing
   - Response validation

## 🚀 Next Steps

Ready for Week 3? The next phase covers:
- Database integration (MongoDB/PostgreSQL)
- Advanced Express.js features
- Authentication and authorization
- File uploads and more!

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Postman Documentation](https://learning.postman.com/)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
