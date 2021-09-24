import React from "react";
import MovieCard from "./MovieCard";
import arrowIcon from "../../../assets/arrowIcon.png"
import loadingOrange from "../../../assets/loadingOrange.gif"

function MovieList({apiKey, apiPrefixURL, moviesData, poster_prefixURL, totalPagesCount, waitForLoad, setPageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path, setWatchListArray, watchListArray, setMovie, setTogglePage2, setGenresList, noResultsFound, searchSuffix}){
    const displayMovies = moviesData.map((movie, index) => 
        <MovieCard key={`${movie.id}${index}`} 
            movie={movie} 
            poster_prefixURL={poster_prefixURL} 
            broken_path={broken_path}
            setWatchListArray={setWatchListArray}
            watchListArray={watchListArray}
            setMovie={setMovie}
            setTogglePage2={setTogglePage2}
            setGenresList={setGenresList}
            apiKey={apiKey}
            apiPrefixURL={apiPrefixURL}
        />
    )

    function handleLoadMoreMovies(){
        setPageNumber(pageNumber => pageNumber < totalPagesCount ? pageNumber + 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    function preivousPageLoad(){
        setPageNumber(pageNumber => pageNumber > 2 ? pageNumber - 3 : totalPagesCount-1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    return (
        <>
            {noResultsFound? <div className="noResults"><h1>NO RESULTS FOUND</h1><h2>{searchSuffix.slice(7)}</h2></div> : null}
            <div className={noResultsFound? "hidden" : "cardContainer"}>
                
                <div className="arrowsContainer">
                    <img className="leftArrow"src={arrowIcon} alt="left arrow" onClick={preivousPageLoad}/>
                    <img className="rightArrow"src={arrowIcon} alt="right arrow" onClick={handleLoadMoreMovies}/>
                </div>
                <div className="movieCardsContainer">
                    {waitForLoad? <div className="loadingOrangeDiv"><img className="loadingOrangeImage" src={loadingOrange} alt="loadingCircle"></img></div> : displayMovies}
                </div>
            </div>
        </>
    )
}
export default MovieList