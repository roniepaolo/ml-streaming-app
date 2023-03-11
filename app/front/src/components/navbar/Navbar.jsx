import React, {useState} from 'react';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from '../../assets/logo.png'
import './navbar.css'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="churn__navbar">
      <div className="churn__navbar-links">
        <div className="churn__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="churn__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#howdoesitwork">How does it work?</a></p>
        </div>
      </div>

      <div className="churn__navbar-demo">
        <a href="#demo"><button type="button">Demo</button></a>
      </div>
      <div className="churn__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#2d2e2f" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#2d2e2f" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="churn__navbar-menu_container scale-up-center">
            <div className="churn__navbar-menu_container-links">
              <p><a href="#home">Home</a></p>
              <p><a href="#howdoesitwork">How does it work?</a></p>
            </div>
            <div className="churn__navbar-menu_container-links-demo">
              <button type="button">Demo</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;