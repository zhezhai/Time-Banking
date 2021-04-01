import React, { useEffect } from "react";
import { TBContext } from "../context/context";
import { Button } from "react-bootstrap";
import { axiosNode } from "../helpers/axios";
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
  const { setCurrentUser, isLoggedIn, setIsLoggedIn } = React.useContext(
    TBContext
  );

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
        <NavLink to="/myinfo">MyInfo</NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/myservice">MyService</NavLink>
          <NavLink to="/post_service">PostService</NavLink>
          <NavLink to="/payment">Payment</NavLink>
          <NavLink to="/provider_confirm">ProviderConfirm</NavLink>
        </NavMenu>
        {!isLoggedIn && (
          <NavBtn>
            <NavBtnLink to="/login">Sign In</NavBtnLink>
          </NavBtn>
        )}
        <NavBtn>
          <Button
            onClick={() => {
              axiosNode.get("/logout").then((response) => {
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
    </>
  );
}

export default Navbar;
