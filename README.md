# Meal Planning Website with Llama AI Integration

This project is a meal planning website that leverages Llama AI for generating meal plans based on user preferences. It consists of a Node.js backend and a React frontend.

## Prerequisites

Before you begin, ensure you have the following installed on your computer:

1. **Node.js**  
   Download and install Node.js from the [official website](https://nodejs.org/). This will also install npm (Node Package Manager), which is required for managing dependencies.

2. **Git** (optional)  
   If you want to clone the repository, install Git from the [official website](https://git-scm.com/).

## Getting Started

### 1. Clone the Repository

Clone the project repository to your local machine using Git:

```bash
git clone <repository-url>
```
### 2. Install Dependencies
Navigate to both the backend and frontend directories and install the required dependencies:

```bash
cd meal-planning-backend
npm install
```
```bash
cd ../meal-planning-frontend
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the meal-planning-backend directory and add the following environment variables:
```bash
env
PORT=5001
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
HF_API_KEY=<your-hugging-face-api-key>
```
### 4. Run the Application
Start both the backend and frontend servers:


#### In the backend directory
```bash
cd meal-planning-backend
node server.js
```
####  In a new terminal, in the frontend directory
```bash
cd meal-planning-frontend
npm start
```
The backend server will run on http://localhost:5001 and the frontend server will run on http://localhost:3000.

# Project Structure
## Backend
#### server.js: Entry point for the backend server.
#### routes/: Contains route files for different API endpoints.
#### models/: Contains Mongoose models for MongoDB collections.
#### middleware/: Contains middleware functions for authentication and other purposes.
## Frontend
#### src/: Contains the source code for the React frontend.
#### components/: Contains React components.
#### App.js: Main component that sets up routing and context providers.
#### index.js: Entry point for the React application.
#### public/: Contains static assets and the main HTML file.
## Key Features
#### User Authentication: Users can register and log in to the application.
#### Meal Planning: Users can create, view, and delete meal plans.
#### Recipe Management: Users can view recipes and add them to their meal plans.
#### Chatbot Integration: A chatbot powered by Llama AI to assist users with meal planning.
Available Scripts
In the project directory, you can run:
```bash
npm start
```
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
```bash
npm test
```
Launches the test runner in interactive watch mode.
```bash
npm run build
```
Builds the app for production to the build folder.
```bash
npm run eject
```
Note: This is a one-way operation. Once you eject, you can't go back!

Learn More
You can learn more about it in the [Create React App documentation](https://createjs.com/getting-started).

To learn React, check out the React documentation.
