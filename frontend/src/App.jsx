import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/Register';
import AdmissionDashboard from './pages/Adm_Dashboard';
import Login from './components/Login';
import EnrolledDashboard from './pages/Erlm_Dashboard';
import StudentPage from './pages/Erlm_Student_Page';

function App() {

  return (
    
      <Router>
        <Routes>
         <Route path="/" element={<Register />} />
         <Route path="/login" element={<Login />}/>
         <Route path="/admission_dashboard" element={<AdmissionDashboard />} />
         <Route path="/enrollment_dashboard" element={<EnrolledDashboard />} />
         <Route path="/enrolled_student" element={<StudentPage />} />
        </Routes>
      </Router>
    
  )
}

export default App
