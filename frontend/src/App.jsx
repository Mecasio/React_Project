import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/Register';
import AdmissionDashboard from './pages/Adm_Dashboard';
import Login from './components/Login';
import EnrolledDashboard from './pages/Erlm_Dashboard';
import StudentPage from './pages/Erlm_Student_Page';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DepartmentRegistration from './components/DprtmntRegistration';
import DepartmentRoom from './components/DprtmntRoom';
import DepartmentProf from './components/DprtmntProf';
import DepartmentCourse from './components/DprtmntCourse';


function App() {

  //Set the default font of entire app into poppins
  const theme = createTheme({
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
           <Route path="/register" element={<Register />} />
           <Route path="/" element={<Login />}/>
           <Route path="/login" element={<Login />}/>
           <Route path="/room_registration" element={<DepartmentRoom/>}/>
           <Route path="/course_registration" element={<DepartmentCourse/>}/>
           <Route path="/department_registration" element={<DepartmentRegistration/>}/>
           <Route path="/professor_registration" element={<DepartmentProf/>}/>
           <Route path="/admission_dashboard" element={<AdmissionDashboard />} />
           <Route path="/enrollment_dashboard" element={<EnrolledDashboard />} />
           <Route path="/enrolled_student" element={<StudentPage />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </ThemeProvider>
  )
}

export default App
