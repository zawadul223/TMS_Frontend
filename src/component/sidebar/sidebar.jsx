import React from 'react';
import '../../App.css'
import { SidebarData } from "./sidebar_data"
import Logo from '../../assets/bjit-logo2.svg'
import { key } from 'localforage';
import { Container, Button } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className='Sidebar'>
      <div className='logo'>
        <img src={Logo} alt='Logo' />
      </div>
      <ul className='SidebarList'>
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className='row' id={window.location.pathname == val.link ? "active" : " "} onClick={() => { window.location.pathname = val.link }}>
              {" "}
              <div id="title">{val.title}</div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
