import './App.css';
import MovieContainer from './components/MovieContainer';
import NavBar from './components/NavBar';
import TVContainer from './components/TVFILES/TVContainer'

function App() {


  return (
    <div> 
      <NavBar/>
      <MovieContainer/>
      {/* <TVContainer/> */}
    </div>
    
  );
}

export default App;
