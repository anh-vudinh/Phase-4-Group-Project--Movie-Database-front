import './App.css';
import MovieContainer from './components/MovieContainer';
import NavBar from './components/NavBar';
import TVContainer from './components/TVFILES/TVContainer'
import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
function App() {

  const [page, setPage] = useState("/")
  return (
    <div> 
      <NavBar onChangePage={setPage}/>
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
