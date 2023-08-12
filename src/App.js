import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import AppLayout from './AppLayout';
import { AuthProvider, PrivateRoute } from './components/Auth';

const App = () => {
  return (
    <AuthProvider>
      <Router>

        <Routes>
          <Route element={<Login />} path='/login' />
          <Route
            path='/*'
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          />
        </Routes>

      </Router>
    </AuthProvider>
  );
};

export default App;