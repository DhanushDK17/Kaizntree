import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginOrDashboard/>}></Route>
        <Route exact path="/register" element={<RegisterPage/>}></Route>
        <Route exact path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  );
}

function LoginOrDashboard() {

  useEffect(() => {
    
  }, []);

  // If the user is not authenticated, show the login page
  return <LoginPage />;
}

export default App;
