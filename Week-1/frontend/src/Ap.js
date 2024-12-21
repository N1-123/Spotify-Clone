import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Context'; // No need to import AuthProvider here
import Signup from "./components/Signup";
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route 
        path="/" 
        element={token ? <Home /> : <Navigate to="/signin" />} // Redirect to signin if no token
      />
    </Routes>
  );
}

export default App;