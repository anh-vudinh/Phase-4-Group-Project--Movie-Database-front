import React, {useState, useEffect} from "react";
import CpMovieItem from "./CpMovieItem";

function CpMovies({BASE_URL_BACK, poster_prefixURL, selectedWL, selectedMoviesArray, setSelectedMoviesArray}) {
   
    const [moviesArray, setMoviesArray] = useState([])
    
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
            console.log(data)
            setMoviesArray(data)}
        )

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