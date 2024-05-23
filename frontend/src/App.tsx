import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';


const App: React.FC = () => {
  return (
    <div>
      <h1>Chat App</h1>
      <SignUp />
      <Login />
    </div>
  );
};

export default App;
