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
