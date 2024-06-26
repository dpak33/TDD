import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import JobSearchForm from './jobsearch/JobSearchForm';
import SavedJobs from './jobsearch/SavedJobs';
import PrivateRoute from './components/PrivateRoute';
import Toggle from './components/Toggle';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <h1>Job Search App</h1>
        <Toggle />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/jobsearch"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <JobSearchForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/savedjobs"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <SavedJobs />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;