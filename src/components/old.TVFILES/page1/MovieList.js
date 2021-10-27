import React from "react";
import MovieCard from "./MovieCard";
import arrowIcon from "../../../assets/arrowIcon.png"
function MovieList({moviesData, poster_prefixURL, totalPagesCount, setPageNumber, pageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path, setWatchListArray, watchListArray, setMovie, togglePage2, setTogglePage2}){
    const displayMovies = moviesData.map(movie => 
    <MovieCard key={movie.id} 
    movie={movie} 
    poster_prefixURL={poster_prefixURL} 
    broken_path={broken_path}
    setWatchListArray={setWatchListArray}
    watchListArray={watchListArray}
    setMovie={setMovie}
    setTogglePage2={setTogglePage2}
    />)
    // console.log(moviesData)
    function handleLoadMoreMovies(){
        setPageNumber(pageNumber => pageNumber < totalPagesCount ? pageNumber + 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    function preivousPageLoad(){
        setPageNumber(pageNumber => pageNumber > 1 ? pageNumber - 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    return (
        <div className="cardContainer">
            {togglePage2 === true? null : <img className="leftArrow"src={arrowIcon} alt="left arrow" onClick={preivousPageLoad}/>}
            {togglePage2 === true? null : displayMovies}
            {togglePage2 === true? null : <img className="rightArrow"src={arrowIcon} alt="right arrow"  onClick={handleLoadMoreMovies}></img>}
        </div>
    )
}
export default MovieList