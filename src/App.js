import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import DnDApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import { AppProvider } from "./context";
import AppContextProvider from "./components/context/appContext";

export const TOKEN_STORAGE_ID = "dnd-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const history = useHistory();

  console.debug("App", "infoLoaded=", infoLoaded, "currentUser=", currentUser, "token=", token);

  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          DnDApi.token = token;
          let currentUser = await DnDApi.getCurrentUser(username);
          console.log("Fetched User:", currentUser);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await DnDApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await DnDApi.login(loginData);
      console.log("Received token:", token);
      setToken(token);
      console.log("Token after setToken:", token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <AppProvider>
        <AppContextProvider>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="App">
              <Navigation logout={logout} />
              <Routes login={login} signup={signup} />
            </div>
          </UserContext.Provider>
        </AppContextProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;