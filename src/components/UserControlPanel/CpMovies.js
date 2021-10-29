import React, {useEffect} from "react";
import CpMovieItem from "./CpMovieItem";

function CpMovies({BASE_URL_BACK, moviesArray, setMoviesArray, poster_prefixURL, selectedWL, selectedMoviesArray, setSelectedMoviesArray}) {
   
    useEffect(()=> {
        if (selectedWL === "") return;
        const dataToSend={watchlist_id:selectedWL.id}
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }
        fetch(`${BASE_URL_BACK}/watchlists/cpWLmovies`,headers)
        .then(resp => resp.json())
        .then(data => {
            setMoviesArray(data)}
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWL])


    const movieList = moviesArray.map(movie => 
        <CpMovieItem 
            key={movie.id}
            movie={movie}  
            handleMovieClick={handleMovieClick}
            poster_prefixURL={poster_prefixURL}
        />
    )

    function handleMovieClick(movie, isChecked){
        if(isChecked){
            setSelectedMoviesArray([...selectedMoviesArray, movie])
        }else{
            setSelectedMoviesArray(selectedMoviesArray.filter(mov => mov.id !== movie.id))
        }
    }

    function handleMovieDelete(){
        if (selectedWL === "") return;
        if (selectedMoviesArray.length === 0) return;
        sendToDB(`/watchlists/cpWLMoviesDelete`)
    }
    
    function sendToDB(fetchURL){
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({moviesArray: selectedMoviesArray, selectedWL: selectedWL})
        }
        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => {
            setSelectedMoviesArray([])
            setMoviesArray(data)
        })
    }

    return (
        <div className="userMoviesContainer">
            <div className="userMoviesColumnTitle">
                <p>Movies</p>
            </div>
            <div className="userMovieItemsContainer">
                {movieList}
            </div>
            <button onClick={handleMovieDelete}>Delete</button>
        </div>
    )
}


export default CpMovies;