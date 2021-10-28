import React, { useState} from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import './App.css';
import NavBar from './components/NavBar';
import Login from "./components/Login";
import MovieContainer from './components/MOVIEFILES/MovieContainer';
import TVContainer from './components/TV/TVContainer'
import ControlPanelContaier from './components/UserControlPanel/ControlPanelContainer';
function App() {

  const BASE_URL_BACK = "http://localhost:9292"
  const cookies = new Cookies()
  const [toggleLoginContainer, setToggleLoginContainer] = useState(false)
  const [sessionUsername, setSessionUsername] = useState("")
  const [sessionProfilePic, setSessionProfilePic] = useState(null)
  const [onLogOut, setOnLogOut] = useState(1)                                     // used to reset the eyeballs on moviecards to "not watched" after logout
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="webpageContainer"> 
      <NavBar 
        onChangePage={"/"}
        sessionUsername={sessionUsername} setSessionUsername={setSessionUsername}
        setToggleLoginContainer={setToggleLoginContainer}
        setOnLogOut={setOnLogOut}
        cookies={cookies}
        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
      />
      
      <Switch>
        <Route exact path="/">
          <MovieContainer
            cookies={cookies}
            isLoggedIn={isLoggedIn}
            BASE_URL_BACK={BASE_URL_BACK}
            onLogOut={onLogOut} setOnLogOut={setOnLogOut}
          />
        </Route>

        <Route path="/tvShows">
          <TVContainer/>
        </Route>

        <Route path="/controlPanel">
          <ControlPanelContaier
            BASE_URL_BACK={BASE_URL_BACK}
          />
        </Route>
      </Switch>



      <Login
        cookies={cookies}
        BASE_URL_BACK={BASE_URL_BACK}
        setSessionUsername={setSessionUsername}
        toggleLoginContainer={toggleLoginContainer} setToggleLoginContainer={setToggleLoginContainer}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default App;
