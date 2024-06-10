Job Search App
Please read all, particularly testing information.

See deployed form at: https://tdd-frontend.netlify.app/login

Overview
This project began as a practice exercise for Test-Driven Development (TDD) and for coding with React and TypeScript together. Over time, it developed into a more complete application that can be used for simple job searches. The app is built using the MERN stack (MongoDB, Express, React, Node.js) with an integrated web scraper - see bottom of README for details of webscraper directory and find installation instructions in other directory. Please note that webscraper must be up and running before you try to interact with its API endpoint here. The web scraper fetches job listings from RemoteOK and serves them as an API endpoint. The frontend allows users to search for jobs, save them, and view saved jobs.

Table of Contents
Overview
Features
Setup Instructions
Web Scraper
MERN Stack App
API Routes
Usage
Testing
Mutual Documentation
Features
Job scraping from RemoteOK
User authentication (sign up and login)
Job search functionality
Save jobs to user profile
View saved jobs
Setup Instructions
Prerequisites
Node.js
MongoDB
Python (for the web scraper)
Flask (for the web scraper API)
Installation
Clone the repository:

git clone https://github.com/dpak33/TDD.git
cd TDD
Install backend dependencies:

cd backend
npm install
Install frontend dependencies:

cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory and add the following: env PORT=8000 MONGODB_URI=your_mongodb_uri JWT_SECRET=your_jwt_secret 

Create a .env file in the webscraper directory and add the following: env FLASK_APP=api.py 

Web Scraper
The web scraper is responsible for fetching job listings from RemoteOK and serving them via a Flask API endpoint.

Running the Web Scraper
To run the web scraper API server: sh cd webscraper flask run 

The web scraper will be available at http://127.0.0.1:5000/api/jobs, which is the call made within the job search component of this app. It accepts two query parameters: query (e.g., 'developer') and location (e.g., 'Vancouver').

MERN Stack App
The MERN stack app consists of the frontend (React) and the backend (Express with Node.js).

Running the Backend
Navigate to the backend directory:

cd backend
Start the backend server:

npm start
Running the Frontend
Navigate to the frontend directory:

cd frontend
Start the frontend server:

npm start
API Routes
Authentication Routes
POST /auth/signup: User sign up
POST /auth/login: User login
Job Routes
POST /jobs/save-job: Save a job to the database
GET /jobs/saved-jobs: Get saved jobs from the database
Web Scraper API
GET http://127.0.0.1:5000/api/jobs: Fetch jobs from RemoteOK using the web scraper.
Usage
Start the web scraper API server using flask run.
Start the backend server using npm start in the backend directory.
Start the frontend server using npm start in the frontend directory.
Sign up or login to the application.
Search for jobs using the search form.
Save jobs you are interested in.
View your saved jobs.
Testing
IMPORTANT: The test files operate on the same development database used to store users and their associated information. As a result, deletion operations within the test suites will reset the database to a clean slate. This means that all user data will be erased, and users will need to sign up again to access the app.

If sign-in no longer works after running the test suite, this is due to the database reset and not an error with the app. Please bear this in mind when running tests.

Backend Tests
To run backend tests: sh cd backend npm test 

Frontend Tests
To run frontend tests: sh cd frontend npm test 

Mutual Documentation
The web scraper project is hosted in a separate GitHub repository. For detailed information about the web scraper, please visit the web scraper repository.

This mutual documentation approach ensures that both the web scraper and the MERN stack app point to each other, providing a clear understanding of how the components interact.
