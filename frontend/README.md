# Job Search App

## Overview

This project began as a practice exercise for Test-Driven Development (TDD) and for coding with React and TypeScript together. Over time, it developed into a more complete application that can be used for simple job searches. The app is built using the MERN stack (MongoDB, Express, React, Node.js) with an integrated web scraper - see bottom of README for details of webscraper directory. The web scraper fetches job listings from RemoteOK and serves them as an API endpoint. The frontend allows users to search for jobs, save them, and view saved jobs.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Web Scraper](#web-scraper)
- [MERN Stack App](#mern-stack-app)
- [API Routes](#api-routes)
- [Usage](#usage)
- [Testing](#testing)
- [Mutual Documentation](#mutual-documentation)

## Features

- Job scraping from RemoteOK
- User authentication (sign up and login)
- Job search functionality
- Save jobs to user profile
- View saved jobs

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- Python (for the web scraper)
- Flask (for the web scraper API)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/job-search-app.git
    cd job-search-app
    ```

2. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```

3. Install frontend dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

4. Install web scraper dependencies:
    ```sh
    cd ../webscraper
    pip install -r requirements.txt
    ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

Create a `.env` file in the `webscraper` directory and add the following:
    ```env
    FLASK_APP=api.py
    ```

## Web Scraper

The web scraper is responsible for fetching job listings from RemoteOK and serving them via a Flask API endpoint.

### Running the Web Scraper

To run the web scraper API server:
    ```sh
    cd webscraper
    flask run
    ```

The web scraper will be available at `http://127.0.0.1:5000/api/jobs`. It accepts two query parameters: `query` (e.g., 'developer') and `location` (e.g., 'Vancouver').

## MERN Stack App

The MERN stack app consists of the frontend (React) and the backend (Express with Node.js).

### Running the Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Start the backend server:
    ```sh
    npm start
    ```

### Running the Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Start the frontend server:
    ```sh
    npm start
    ```

## API Routes

### Authentication Routes

- `POST /auth/signup`: User sign up
- `POST /auth/login`: User login

### Job Routes

- `GET /jobs`: Get job listings from the database
- `POST /jobs/save-job`: Save a job to the database
- `GET /jobs/saved-jobs`: Get saved jobs from the database

### Web Scraper API

- `GET /api/jobs`: Fetch jobs from RemoteOK using the web scraper

## Usage

1. Start the web scraper API server using `flask run`.
2. Start the backend server using `npm start` in the `backend` directory.
3. Start the frontend server using `npm start` in the `frontend` directory.
4. Sign up or login to the application.
5. Search for jobs using the search form.
6. Save jobs you are interested in.
7. View your saved jobs.

## Testing

### Backend Tests

To run backend tests:
    ```sh
    cd backend
    npm test
    ```

### Frontend Tests

To run frontend tests:
    ```sh
    cd frontend
    npm test
    ```

## Mutual Documentation

The web scraper project is hosted in a separate GitHub repository. For detailed information about the web scraper, please visit [the web scraper repository](https://github.com/dpak33/webScraper).

This mutual documentation approach ensures that both the web scraper and the MERN stack app point to each other, providing a clear understanding of how the components interact.