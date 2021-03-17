import React, { useState, useEffect } from "react";
import { TBContext } from "../context/context";
import { Button } from "react-bootstrap";
import Axios from "axios";
import cookie from "react-cookies";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
  } = React.useContext(TBContext);

  const setUser = () => {
    if (cookie.load("user")) {
      setCurrentUser(cookie.load("user"));
      setIsLoggedIn(true);
    }
    if (cookie.load("admin")) {
      setCurrentUser(cookie.load("admin"));
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/" >
            Dashboard
          </NavLink>
          <NavLink to="/myservice" >
            MyService
          </NavLink>
          <NavLink to="/post_service" >
            PostService
          </NavLink>
          <NavLink to="/payment" >
            Payment
          </NavLink>
          <NavLink to="/provider_confirm" >
            ProviderConfirm
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {!isLoggedIn && (
          <NavBtn>
            <NavBtnLink to="/login">Sign In</NavBtnLink>
          </NavBtn>
        )}
        <NavBtn>
          <Button
            onClick={() => {
              Axios.get("http://localhost:3001/logout").then((response) => {
                console.log(response.data);
                cookie.remove("user");
                cookie.remove("admin");
                setIsLoggedIn(false);
              });
            }}
          >
            Sign out
          </Button>
        </NavBtn>
      </Nav>
      {/* {!isLoggedIn && (
              <Link to="/login" className="btn btn-primary">
                login
              </Link>
            )}
            <button
              className="btn btn-primary"
              onClick={() => {
                Axios.get("http://localhost:3001/logout").then((response) => {
                  console.log(response.data);
                  cookie.remove("user");
                  cookie.remove("admin");
                  setIsLoggedIn(false);
                });
              }}
            >
              logout
            </button> */}
    </>
  );
}

export default Navbar;
