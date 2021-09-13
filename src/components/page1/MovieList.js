import React from "react";
import MovieCard from "./MovieCard";

function MovieList({moviesData, poster_prefixURL}){

    const displayMovies = moviesData.map(movie => <MovieCard key={movie.id} movie={movie} poster_prefixURL={poster_prefixURL}/>)

    return (
         <div id="cardContainer">{displayMovies}</div>
    )
}

export default MovieList