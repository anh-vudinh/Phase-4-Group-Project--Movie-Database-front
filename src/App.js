import './App.css';
import MovieContainer from './components/MOVIEFILES/MovieContainer';
import NavBar from './components/NavBar';
import TVContainer from './components/TVFILES/TVContainer'
import { Switch, Route } from "react-router-dom";
import React from "react";

function App() {

  return (
    <div className="webpageContainer"> 
      <NavBar onChangePage={"/"}/>
        <Switch>
          <Route exact path="/">
            <MovieContainer/>
          </Route>

          <Route path="/tvShows">
            <TVContainer/>
          </Route>
        </Switch>
    </div>
    
  );
}

export default App;
