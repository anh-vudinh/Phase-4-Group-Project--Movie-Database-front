import React from "react";
import MovieCard from "./MovieCard";

function MovieList({moviesData, poster_prefixURL, totalPagesCount}){

    const displayMovies = moviesData.map(movie => <MovieCard key={movie.id} movie={movie} poster_prefixURL={poster_prefixURL}/>)
    console.log(totalPagesCount/20)
    return (
         <div id="cardContainer">{displayMovies}</div>
    )
}

export default MovieList