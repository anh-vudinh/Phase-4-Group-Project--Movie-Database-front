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


    const movieList = moviesArray.map((movie,index) => 
        <CpMovieItem 
            key={index}
            movie={movie}  
            handleMovieClick={handleMovieClick}
            poster_prefixURL={poster_prefixURL}
        />
    )

    function handleMovieClick(movie){
        setSelectedMoviesArray([...selectedMoviesArray,movie])
    }

    return (
        <div className="userMoviesContainer">
            <div className="userMoviesColumnTitle"><p>Movies</p></div>
            {movieList}
        </div>
          
    )

    
}


export default CpMovies;