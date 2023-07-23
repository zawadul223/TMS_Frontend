import { useState } from 'react'
import './App.css'
//import UserDropdown from './component/user_icon/user_icon'
import LoginPage from './component/pages/login.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from './component/sidebar/sidebar'
import Notice from './component/pages/notice';
import { Container } from 'react-bootstrap';
import Batches from './component/pages/batches';
import BatchDetails from './component/pages/batch_detail';


function App() {

  const currentPath = window.location.pathname;


  return (
    <div className='App'>
      {currentPath !== "/login" && (
        <>
        <Sidebar /> 
        
        </>
      
      )}
      
      <div className="content">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/allnotice" element={<Notice />} />
            <Route path='/batch' element={<Batches />} />
            <Route path='/batch_detail' element={<BatchDetails />} />
          </Routes>
        </Router>
      </div>
      
    </div>
  )
}

export default App
