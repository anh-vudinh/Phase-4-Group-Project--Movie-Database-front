import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Login from "./components/Login";
import MovieContainer from './components/MOVIEFILES/MovieContainer';
import TVContainer from './components/TVFILES/TVContainer'

function App() {

  const BASE_URL_BACK = "http://localhost:9292/"
  const [toggleLoginContainer, setToggleLoginContainer] = useState(false)
  const [sessionToken, setSessionToken] = useState(null)
  const [sessionUsername, setSessionUsername] = useState("")
  const [sessionProfilePic, setSessionProfilePic] = useState(null)

  return (
    <div className="webpageContainer"> 
      <NavBar 
        onChangePage={"/"}
        setSessionToken={setSessionToken}
        sessionUsername={sessionUsername} setSessionUsername={setSessionUsername}
        setToggleLoginContainer={setToggleLoginContainer}
      />
      
      <Switch>
        <Route exact path="/">
          <MovieContainer
            sessionToken={sessionToken}
            sessionUsername={sessionUsername}
            sessionProfilePic={sessionProfilePic}
            BASE_URL_BACK={BASE_URL_BACK}
          />
        </Route>

        <Route path="/tvShows">
          <TVContainer/>
        </Route>
      </Switch>

      <Login
        BASE_URL_BACK={BASE_URL_BACK}
        sessionToken={sessionToken} setSessionToken={setSessionToken}
        setSessionUsername={setSessionUsername}
        toggleLoginContainer={toggleLoginContainer} setToggleLoginContainer={setToggleLoginContainer}
      />
    </div>
    
  );
}

export default App;
