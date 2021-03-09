import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { TBContext } from "../context/context";
import Axios from "axios";
import cookie from "react-cookies";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { currentAccount, isLoggedIn, setIsLoggedIn } = React.useContext(
    TBContext
  );

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const user_status = cookie.load("user");
    if (user_status) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <NavbarStyle>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <h3>welcome {currentAccount}</h3>
            {!isLoggedIn && (
              <Link to="/login" className="btn btn-primary">
                login
              </Link>
            )}
            <button
              className="btn btn-primary"
              onClick={() => {
                Axios.get("http://localhost:3001/logout").then((response) => {
                  console.log(response.data);
                  if ((response.data = "session destroyed")) {
                    cookie.remove("user");
                    setIsLoggedIn(false);
                  } else {
                    console.log("already logged out");
                  }
                });
              }}
            >
              logout
            </button>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {NavbarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </NavbarStyle>
    </>
  );
}

const NavbarStyle = styled.div`
  .navbar {
    background-color: #060b26;
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  h3 {
    color: white;
    margin: auto;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
    display: flex;
  }

  .nav-menu {
    background-color: #060b26;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }
`;

export default Navbar;
