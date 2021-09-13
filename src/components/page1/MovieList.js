import React from "react";
import MovieCard from "./MovieCard";

function MovieList({moviesData}){

    const displayMovies = moviesData.map(movie =>
        //console.log(movie);
        //<p>TESTING</p>
        <MovieCard key={movie.id} movie={movie} />
    )

    return (
        <div>{displayMovies}</div>
    )
}

export default MovieList