import React from "react";
import MovieCard from "./MovieCard";
import arrowIcon from "../../../assets/arrowIcon.png"
function MovieList({apiKey, moviesData, poster_prefixURL, totalPagesCount, setPageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path, setWatchListArray, watchListArray, setMovie, togglePage2, setTogglePage2, setGenresList, setToggleHeaderInfo}){
    
    const displayMovies = moviesData.map(movie => 
        <MovieCard key={movie.id} 
            movie={movie} 
            poster_prefixURL={poster_prefixURL} 
            broken_path={broken_path}
            setWatchListArray={setWatchListArray}
            watchListArray={watchListArray}
            setMovie={setMovie}
            setTogglePage2={setTogglePage2}
            setGenresList={setGenresList}
            apiKey={apiKey}
            setToggleHeaderInfo={setToggleHeaderInfo}
        />
    )

    function handleLoadMoreMovies(){
        setPageNumber(pageNumber => pageNumber < totalPagesCount ? pageNumber + 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    function preivousPageLoad(){
        setPageNumber(pageNumber => pageNumber > 1 ? pageNumber - 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    return (
        <div className={togglePage2? "hidden" : "cardContainer"}>
            {togglePage2? null : <img className="leftArrow"src={arrowIcon} alt="left arrow" onClick={preivousPageLoad}/>}
            {togglePage2? null : displayMovies}
            {togglePage2? null : <img className="rightArrow"src={arrowIcon} alt="right arrow" onClick={handleLoadMoreMovies}/>}
        </div>
    )
}
export default MovieList