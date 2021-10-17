import React, {useState, useEffect} from "react";
import MovieCard from "./MovieCard";
import MovieCardModal from "./MovieCardModal";
import arrowIcon from "../../../assets/arrowIcon.png"
import loadingOrange from "../../../assets/loadingOrange.gif"
import PagesToLoadOptions from "./PagesToLoadOptions";

function MovieList({apiKey, sessionToken, setIsWatchedMP2C, toggleEyeballRefresh, handleWatchListAddClick, genreTitle, setGenreTitle, yearTitle, setYearTitle, apiPrefixURL, pagesToLoad, previousPage, currentPageCounter,setCurrentPageCounter, setPagesToLoad, moviesData, poster_prefixURL, totalPagesCount, waitForLoad, setPageNumber, pageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path, setWatchListArray, watchListArray, setMovie, setTogglePage2, setGenresList, noResultsFound, searchSuffix}){
    
    const cardContainerMinHeight = 744
    const [toggleMovieCardModal, setToggleMovieCardModal] = useState(false)
    const [movieCardModalPosition, setMovieCardModalPosition] = useState([0,0])
    const [movieCardModalDetails, setMovieCardModalDetails] = useState({})
    const [startModalTimer, setStartModalTimer] = useState(false)
    const [modalMovieID, setModalMovieID] = useState(100)
    const [timeoutID, setTimeoutID] = useState()
    const [opacityValue, setOpacityValue] = useState(0)
    
    const displayMovies = moviesData.map((movie, index) => 
        <MovieCard key={`${movie.id}${index}`} 
            movie={movie} 
            poster_prefixURL={poster_prefixURL} 
            broken_path={broken_path}
            setMovie={setMovie}
            setTogglePage2={setTogglePage2}
            setGenresList={setGenresList}
            apiKey={apiKey}
            apiPrefixURL={apiPrefixURL}
            setStartModalTimer={setStartModalTimer}
            setMovieCardModalPosition={setMovieCardModalPosition}
            setModalMovieID={setModalMovieID}
            genreTitle={genreTitle} setGenreTitle={setGenreTitle}
            yearTitle={yearTitle} setYearTitle={setYearTitle}
            handleWatchListAddClick={handleWatchListAddClick}
            watchListArray={watchListArray}
            moviesData={moviesData}
            sessionToken={sessionToken}
            toggleEyeballRefresh={toggleEyeballRefresh}
            setIsWatchedMP2C={setIsWatchedMP2C}
        />
    )

    useEffect(()=>{
        if(startModalTimer === true){                                           // start timer top open modal, client must hover for 1500 ms to trigger
            document.body.style.cursor = `wait`                                 // changes cursor to hourglass
            setTimeoutID(setTimeout(handleWait, 1500))                          // if user hovers for movie card image for 1.5 seconds, create the modal through handlewait
            //return() => clearTimeout(timeoutID)
        }else{                         
            document.body.style.cursor = "default"                              // switches back to normal cursor                                           
            setToggleMovieCardModal(false)                                      // close the modal if it's open, this belongs solely to MovieCard handleMouseLeave()                                          // reset opacity so that the next time it's run modal can fade in
            //return() => clearTimeout(timeoutID)                                 // if client removes their hover, the handlewait is cancelled and modal does not open
        }
        return() => clearTimeout(timeoutID)   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startModalTimer])


    function handleLoadMoreMovies(){
        setPageNumber(pageNumber < totalPagesCount ? pageNumber + 1 : 1)                                                    // increments up 1 page count and toggles fetch, dependent on error catcher in useEffect() of MovieContainer to prevent nonexistent pages from populating the main array
        setIsLoadMoreMovies(!isLoadMoreMovies)                                                                              // toggles the useEffect fetch in MovieContainer
    }
    
    function preivousPageLoad(){
        if(pageNumber <= totalPagesCount && pageNumber > pagesToLoad){                                                      // the default previous button logic handles going backwards from highest pages to lowest pages
            setPageNumber(pageNumber-(pagesToLoad)-(pagesToLoad-1) > 0? pageNumber-(pagesToLoad)-(pagesToLoad-1) : 1)       // logic to catch if pages go below 1, set pages to 1, api does not have pages < 0, error message returned
        }else{
            setPageNumber(totalPagesCount-(pagesToLoad-1))                                                                  // logic to handle going backwards through first elements of array to its last elements, looping from lowest to highest
        }
        setIsLoadMoreMovies(!isLoadMoreMovies)                                                                              // toggles the useEffect fetch in MovieContainer
    }


    function handleWait(){                                                      // if client hovers for 1.5 seconds, fetch full movie data from api, 
        fetch(`${apiPrefixURL}movie/${modalMovieID}?api_key=${apiKey}`)         // and set the data into a use state to pass data to the modal componenet
        .then(res => res.json())                                                // this timer was done to minimize calls to the api
        .then(movieObj => {
            setMovieCardModalDetails(movieObj)
            document.body.style.cursor = "default"
            setToggleMovieCardModal(true)                                       // toggle to allow the modal to be created
        })
    }

    return (
        <>
            <PagesToLoadOptions 
                pageNumber={pageNumber}
                setPagesToLoad={setPagesToLoad}
                pagesToLoad={pagesToLoad}
                currentPageCounter={currentPageCounter}
                setPageNumber={setPageNumber}
                setCurrentPageCounter={setCurrentPageCounter}
                totalPagesCount={totalPagesCount}
                previousPage={previousPage}
            />
            {noResultsFound? <div className="noResults"><h1>NO RESULTS FOUND</h1><h2>{searchSuffix.slice(7)}</h2></div> : null}
            
            <div className={noResultsFound? "hidden" : "cardContainer"} style={{minHeight: `${cardContainerMinHeight*(moviesData.length/20)}px`}}>
                <div className={waitForLoad? "hidden" : "arrowsContainer"}>
                    <div className="leftArrowContainer">
                        <img className="leftArrow"src={arrowIcon} alt="left arrow" onClick={preivousPageLoad}/>
                    </div>
                    <div className="rightArrowContainer">
                        <img className="rightArrow"src={arrowIcon} alt="right arrow" onClick={handleLoadMoreMovies}/>
                    </div>
                </div>
                <div className="movieCardsContainer" style={{minHeight: `${cardContainerMinHeight*(moviesData.length/20)}px`}}>
                    {waitForLoad? <div className="loadingOrangeDiv"><img className="loadingOrangeImage" src={loadingOrange} alt="loadingCircle"></img></div> : displayMovies}
                </div>
            </div>

            <MovieCardModal
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                movieCardModalPosition={movieCardModalPosition}
                movieCardModalDetails={movieCardModalDetails}
                opacityValue={opacityValue}
                setOpacityValue={setOpacityValue}
                startModalTimer={startModalTimer}
                toggleMovieCardModal={toggleMovieCardModal}
            />
        </>
    )
}
export default MovieList