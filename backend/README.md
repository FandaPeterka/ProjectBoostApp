# Project Backend

This backend provides RESTful API functionality for managing projects and tasks, with user authentication and authorization. Built with **Node.js** and **Express**, it connects to a **MongoDB** database through **Mongoose** for storing user, project, and task data. Authentication is handled with **JWT (JSON Web Tokens)**, ensuring secure access to project resources.

## Features

- **User Authentication**: Signup and login using JWT tokens.
- **Project Management**: Create, read, update, and delete projects.
- **Task Management**: Add tasks to projects, mark them as complete, and delete them.
- **Authorization Middleware**: Protect routes so only authenticated users can access their own projects and tasks.

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
```

2.	Navigate to the backend directory:
```bash
cd backend
```

3.	Install dependencies:
```bash
npm install
```

## Environment Variables
Create a .env file in the backend directory and add the following variables:
```plaintext
MONGO_URI=<Your MongoDB URI>
SECRET=<JWT Secret>
PORT=3000
```

## Available Scripts
- Start Server: Starts the server using Nodemon for development.
```bash
npm run dev
```

## API Endpoints

Authentication Routes

- POST /api/user/signup: Register a new user.
- POST /api/user/login: Login an existing user.

## Project Routes

Each project route requires the user to be authenticated.

- GET /api/projects/: Retrieve all projects for the logged-in user.
- GET /api/projects/:projectId: Retrieve a specific project by ID.
- POST /api/projects/: Create a new project.
- PUT /api/projects/:projectId: Update project details.
- DELETE /api/projects/:projectId: Delete a project and its associated tasks.

## Task Routes

Each task route requires the user to be authenticated.

- GET /api/projects/:projectId/tasks: Retrieve all tasks for a specific project.
- GET /api/projects/tasks/:taskId: Retrieve a specific task by ID.
- POST /api/projects/:projectId/tasks: Create a new task within a project.
- PATCH /api/projects/tasks/:taskId: Update task details.
- DELETE /api/projects/tasks/:taskId: Delete a task.
- POST /api/projects/:projectId/tasks/:taskId/complete: Mark a task as completed.

## Code Structure

- controllers: Contains all the logic for handling requests and responses.
- middleware: Authentication middleware for verifying JWT tokens and securing routes.
- models: Mongoose models defining the schemas for User, Project, and Task.
- routes: Route definitions for projects, tasks, and user authentication.
- server.js: Main entry point for the backend server.

# Detailed Code Descriptions

## Controllers

- projectController.js:
- getAllProjects: Retrieves all projects for the logged-in user.
- getProject: Retrieves a specific project and its tasks by ID.
- createProject: Creates a new project with initial tasks.
- updateProject: Updates project details.
- deleteProject: Deletes a project and its tasks.
- getAllTasks: Retrieves tasks for a specific project.
- getTask: Retrieves a specific task by ID.
- createTask: Adds a new task to a project.
- updateTask: Updates task details.
- deleteTask: Deletes a task.
- completeTask: Marks a task as completed.
- userController.js:
- signupUser: Registers a new user.
- loginUser: Authenticates a user and provides a JWT.

## Middleware

- requireAuth.js: Verifies JWTs and attaches user information to the request object, ensuring only authenticated users access certain routes.

## Models

- Project Model: Defines project attributes and references tasks and the owning user.
- Task Model: Defines task attributes, including text, state, and reference to the parent project.
- User Model: Defines user attributes, including unique email and username, with password encryption.

## Dependencies

- express: Web framework for building REST APIs.
- mongoose: MongoDB object modeling tool.
- jsonwebtoken: Used for creating and verifying JWT tokens.
- bcrypt: Library for hashing passwords.
- validator: Validates and sanitizes user inputs.





