import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './component/pages/login.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const sidebar_data = [
    { title: "Dashboard", slug: "/", icon: "" },
    { title: "Blogs", slug: "/blog", icon: "" },
    { title: "Faq", slug: "/faq", icon: "" },
    { title: "Gallerys", slug: "/gallerys", icon: "" },
    { title: "Catalog", slug: "/products", icon: "" },
    { title: "Pop Up", slug: "/popup", icon: "" },
    { title: "Slider", slug: "/slider", icon: "" },
    { title: "Pages", slug: "/pages", icon: "" },
    { title: "Contacts", slug: "/contacts", icon: "" },
    { title: "Certificates", slug: "/certificate", icon: "" },
    { title: "Testmonial", slug: "/testmonial", icon: "" },
    { title: "Subscribes", slug: "/subscribes", icon: "" },
 
  ];

  return (
    <>
    <div className="sidebar__section">
            <Sidebar Logo={Logo} sidebar_data={sidebar_data} />
          </div>
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<LoginPage />}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
