import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import JobSearchForm from './jobsearch/JobSearchForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Chat App</h1>
      <SignUp />
      <Login />
      <JobSearchForm />
    </div>
  );
};

export default App;
