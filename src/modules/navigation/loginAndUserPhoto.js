import React, { useContext, useState, useEffect } from "react";
import NavBar from "../../signUp/nav-bar";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import Context from "../../context/context";
import * as userService from "../../services/users-service";

export default function LoginAndUserPhoto() {
  const { isAuthenticated } = useAuth0();
  const context = useContext(Context);
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const [userMetadata, setUserMetadata] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const readUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: audience,
          scope: "read:current_user",
        });
        const data = await userService.getUserMetadata(user, accessToken);
        return setUserMetadata(data);
      } catch (error) {
        console.log("This Error message is because of that user information is coming slower than pages " + error);
      }
    };
    return readUserMetadata();
  }, [user, getAccessTokenSilently, audience]);
  //this is for @media navbar
  const click = context.navbarOpen;
  const handleClick = () => context.navbarOpenHandler(!click);
  const recentLocatin = localStorage.getItem('path')
  return (
    <>
      <li className="nav-button">
        <NavLink
          to={recentLocatin}
          activeclassname="active"
          className="nav-links"
          onClick={handleClick}
        >
          <NavBar />{/* login and logout buttons */}
        </NavLink>
      </li>
      {isAuthenticated ? (
        <li className="nav-button">
          <NavLink
            activeclassname="active"
            className="nav-links"
            to="/personalPage"
            onClick={handleClick}
          >
            <img
              className="navbar-personal-photo"
              alt="Me"
              src={userMetadata?.picture ? userMetadata?.picture : user.picture}
            />
        </NavLink>
      </li>  ) : null}
    </>
  );
}
