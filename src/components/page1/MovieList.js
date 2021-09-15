import React from "react";
import MovieCard from "./MovieCard";

function MovieList({moviesData, poster_prefixURL, totalPagesCount, setPageNumber, pageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path}){

    const displayMovies = moviesData.map(movie => <MovieCard key={movie.id} movie={movie} poster_prefixURL={poster_prefixURL} broken_path={broken_path}/>)
    
    function handleLoadMoreMovies(){

        setPageNumber(pageNumber => pageNumber < totalPagesCount ? pageNumber + 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    function preivousPageLoad(){

        setPageNumber(pageNumber => pageNumber > 1 ? pageNumber - 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    return (
    
        <div id="cardContainer">{displayMovies}
        
        <button onClick={preivousPageLoad}> Previous page </button>
        <button onClick={handleLoadMoreMovies}>Next Page</button>
        
        </div>
        
        
    )
}

export default MovieList