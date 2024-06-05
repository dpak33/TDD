import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import JobSearchForm from './jobsearch/JobSearchForm';
import SavedJobs from './jobsearch/SavedJobs';
import PrivateRoute from './components/PrivateRoute';

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

const Toggle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="toggle-container" onClick={() => {
      if (window.location.pathname === '/jobsearch') {
        navigate('/savedjobs');
      } else {
        navigate('/jobsearch');
      }
    }}>
      <span>↩</span>
      <h3>{window.location.pathname === '/jobsearch' ? 'To Saved Jobs' : 'To Job Search'}</h3>
    </div>
  );
};

export default App;