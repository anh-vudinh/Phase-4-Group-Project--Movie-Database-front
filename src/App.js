import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Login from "./components/Login";
import MovieContainer from './components/MOVIEFILES/MovieContainer';
import TVContainer from './components/TVFILES/TVContainer'

function App() {

  const [toggleLoginContainer, setToggleLoginContainer] = useState(false)
  const [sessionToken, setSessionToken] = useState(null)
  const [sessionUsername, setSessionUsername] = useState("")
  const [sessionProfilePic, setSessionProfilePic] = useState("")

  // // start service worker
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register("./service-worker.js")
  //   .then((reg) => {
  //     // registration worked
  //     console.log('Registration succeeded. Scope is ' + reg.scope);
  //   }).catch((error) => {
  //     // registration failed
  //     console.log('Registration failed with ' + error);
  //   });
  // }
  // // end service worker


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
          />
        </Route>

        <Route path="/tvShows">
          <TVContainer/>
        </Route>
      </Switch>

      <Login
        sessionToken={sessionToken} setSessionToken={setSessionToken}
        setSessionUsername={setSessionUsername}
        toggleLoginContainer={toggleLoginContainer} setToggleLoginContainer={setToggleLoginContainer}
      />
    </div>
    
  );
}

export default App;
