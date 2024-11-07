# Project Management Application

## Application Screenshots

### Application Overview

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="/images/FocusBooster1.png" width="500px">
  <img src="/images/FocusBooster2.png" width="500px">
  <img src="/images/FocusBooster3.png" width="500px">
  <img src="/images/FocusBooster4.png" width="500px">
</div>

---

### Login and Registration

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="/images/FocusBooster5.png" width="500px">
  <img src="/images/FocusBooster6.png" width="500px">
</div>

---

### Main Application Interface

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="/images/FocusBooster7.png" width="500px">
  <img src="/images/FocusBooster8.png" width="500px">
  <img src="/images/FocusBooster9.png" width="500px">
  <img src="/images/FocusBooster10.png" width="500px">
</div>

---

### Animated Backgrounds

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="/images/FocusBooster11.png" width="500px">
  <img src="/images/FocusBooster12.png" width="500px">
  <img src="/images/FocusBooster13.png" width="500px">
  <img src="/images/FocusBooster14.png" width="500px">
  <img src="/images/FocusBooster15.png" width="500px">
  <img src="/images/FocusBooster16.png" width="500px">
</div>

## Overview

This Project Management Tool enables users to efficiently manage projects and tasks with user authentication, task tracking, and visually engaging 3D animations. The app uses a modular architecture to ensure scalability and maintainability, separating frontend and backend functionalities.

---

## Features

- **User Authentication**: Secure login and signup with JWT tokens, using authentication middleware.
- **Project & Task Management**: Users can create, edit, delete projects and associated tasks, tracking task completion.
- **3D Visual Animations**: Enhanced user experience with 3D animations using `react-three/fiber` and `@react-three/drei`.

---

## Project Structure

### Frontend
The **frontend** is built using **React.js** and **Tailwind CSS**:
- **Pages**: Contains main application pages like `Login`, `Signup`, and `FocusBooster`.
- **Components**: Contains core app components. 
- **UI**: Reusable graphical components for consistent styling and interaction.
- **Context and Hooks**: Manages global state for user authentication and project data with React Context API and custom hooks.

### Backend
The **backend** is developed with **Node.js** and **Express.js**:
- **Controllers**: Implements logic for CRUD operations for projects and tasks.
- **Middleware**: JWT-based authentication middleware to protect routes.
- **Models**: MongoDB schemas for `User`, `Project`, and `Task` using Mongoose.

---

## Technologies Used

### Frontend
- **React.js**: Framework for building interactive UIs.
- **Tailwind CSS**: Utility-first CSS framework for responsive styling.
- **React-Three-Fiber and Drei**: Libraries for 3D animations and models.
- **Framer Motion**: Animation library for fluid and smooth UI interactions.
- **EmailJS**: Service for sending transactional emails, like welcome messages.

### Backend
- **Express.js**: Framework for building RESTful APIs.
- **Mongoose**: ODM for MongoDB, managing database interactions.
- **jsonwebtoken**: Library for creating and verifying JWT tokens.
- **bcrypt**: Utility for hashing passwords, ensuring secure storage.
- **validator**: Validates and sanitizes user input fields.

---

## Installation and Setup

1. **Clone the Repository**: Clone this repository to your local environment and open it in your code editor.
2. **Install Dependencies**: Navigate to the `frontend` and `backend` directories and run `npm install` to install all required packages.
3. **Configure Environment Variables**: Create `.env` files in both the `frontend` and `backend` directories and add the corresponding variables as described above.
4. **Run the Application**:
   - Start the backend server by running `npm run dev` in the `backend` directory.
   - Start the frontend by running `npm run dev` in the `frontend` directory.
5. **Access the App**: Open the application in your browser to register, log in, and start managing projects and tasks.

---

### Frontend Environment Variables

The frontend environment variables enable the integration with EmailJS for sending emails, such as welcome or notification emails.

Add the following variables to your `frontend/.env` file:
```plaintext
`VITE_APP_EMAILJS_SERVICE_ID`: Your EmailJS service ID.
`VITE_APP_EMAILJS_TEMPLATE_ID`: The EmailJS template ID used for sending emails.
`VITE_APP_EMAILJS_PUBLIC_KEY`: Your public key from EmailJS.
```
Replace each placeholder with your own secure values from your EmailJS account.

### Backend Environment Variables

The backend environment variables enable the application to connect securely to the MongoDB database, run on a specific port, and secure JWT authentication.

Add the following variables to your `backend/.env` file:
```plaintext
`PORT`: The port number where the server will run (e.g., 4000).
`MONGO_URI`: The MongoDB connection URI for accessing the database.
`SECRET`: A secret key for signing JWT tokens, used for secure authentication.
```
Ensure each placeholder is replaced with your actual, secure values.

## Summary

This Project Management Tool is built for modularity and scalability, using best practices in user authentication, task management, and UI/UX design. With a secure backend, reusable frontend components, and configurable environment settings, it provides an efficient, responsive, and visually appealing tool for organizing and tracking projects.
