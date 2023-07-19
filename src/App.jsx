import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './component/pages/login.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from './component/sidebar/sidebar'
import Notice from './component/pages/notice';
import { Container } from 'postcss'

function App() {

  const currentPath = window.location.pathname;


  return (
    <div className='App'>
      {currentPath !== "/login" && <Sidebar />}
      <div className="content">
        <Router>
          <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/notice" element={<Notice />} />
          </Routes>
          </Container>
        </Router>
      </div>
    </div>
  )
}

export default App
