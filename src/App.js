import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { AdminLogin } from './Component/AdminLogin';
import { EmpForm } from './Component/EmpForm';
import { AdminDashboard } from './Component/AdminDashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<AdminLogin />}></Route>
        </Routes>
        <Routes>
          <Route path='/employeeform' element={<EmpForm />}></Route>
          <Route path='/admindash' element={<AdminDashboard />}></Route>
        </Routes>
      </Router>

      {/* <AdminLogin/> */}
      {/* <EmpForm /> */}
    </>
  );
}

export default App;
