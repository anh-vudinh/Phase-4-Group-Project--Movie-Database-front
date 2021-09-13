import React from "react";
import MovieCard from "./MovieCard";

function MovieList({moviesData}){

    const displayMovies = moviesData.map(movie => <MovieCard key={movie.id} movie={movie} />)

    return (
         <div id="cardContainer">{displayMovies}</div>
    )
}

export default MovieList