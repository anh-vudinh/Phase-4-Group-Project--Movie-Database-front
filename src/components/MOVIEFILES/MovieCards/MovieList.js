import React, {useState, useEffect} from "react";
import MovieCard from "./MovieCard";
import MovieCardModal from "./MovieCardModal";
import arrowIcon from "../../../assets/arrowIcon.png"
import loadingOrange from "../../../assets/loadingOrange.gif"
import PagesToLoadOptions from "./PagesToLoadOptions";

function MovieList({apiKey, apiPrefixURL, pagesToLoad, currentPageCounter,setCurrentPageCounter, setPagesToLoad, moviesData, poster_prefixURL, totalPagesCount, waitForLoad, setPageNumber, pageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path, setWatchListArray, watchListArray, setMovie, setTogglePage2, setGenresList, noResultsFound, searchSuffix}){
    
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
            setWatchListArray={setWatchListArray}
            watchListArray={watchListArray}
            setMovie={setMovie}
            setTogglePage2={setTogglePage2}
            setGenresList={setGenresList}
            apiKey={apiKey}
            apiPrefixURL={apiPrefixURL}
            setStartModalTimer={setStartModalTimer}
            setMovieCardModalPosition={setMovieCardModalPosition}
            setModalMovieID={setModalMovieID}
        />
    )

    function handleLoadMoreMovies(){
        setPageNumber(pageNumber < totalPagesCount ? pageNumber + 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    function preivousPageLoad(){
        if(pageNumber <= totalPagesCount && pageNumber > pagesToLoad){
            setPageNumber(pageNumber-(pagesToLoad)-(pagesToLoad-1))
        }else{
            setPageNumber(totalPagesCount-(pagesToLoad-1))
        }
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }

    useEffect(()=>{
        if(startModalTimer === true){                               //start timer top open modal, client must hover for 1500 ms to trigger
            document.body.style.cursor = `wait`
            setTimeoutID(setTimeout(handleWait, 1500))
        }else{                         
            document.body.style.cursor = "default"                             //if client removes their hover, the handlewait is cancelled and modal does not open
            clearTimeout(timeoutID)
            setToggleMovieCardModal(false)
            setOpacityValue(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startModalTimer])

    function handleWait(){
        fetch(`${apiPrefixURL}movie/${modalMovieID}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(movieObj => {
            setMovieCardModalDetails(movieObj)
        })
        document.body.style.cursor = "default"
        setTimeout(()=>setToggleMovieCardModal(true),150)
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
            />
            {noResultsFound? <div className="noResults"><h1>NO RESULTS FOUND</h1><h2>{searchSuffix.slice(7)}</h2></div> : null}
            <div className={noResultsFound? "hidden" : "cardContainer"} style={{minHeight: `${cardContainerMinHeight*pagesToLoad}px`}}>
                <div className={waitForLoad? "hidden" : "arrowsContainer"}>
                    <img className="leftArrow"src={arrowIcon} alt="left arrow" onClick={preivousPageLoad}/>
                    <img className="rightArrow"src={arrowIcon} alt="right arrow" onClick={handleLoadMoreMovies}/>
                </div>
                <div className="movieCardsContainer" style={{minHeight: `${cardContainerMinHeight*pagesToLoad}px`}}>
                    {waitForLoad? <div className="loadingOrangeDiv"><img className="loadingOrangeImage" src={loadingOrange} alt="loadingCircle"></img></div> : displayMovies}
                </div>
            </div>
            {toggleMovieCardModal?
                <MovieCardModal
                    apiKey={apiKey}
                    apiPrefixURL={apiPrefixURL}
                    movieCardModalPosition={movieCardModalPosition}
                    movieCardModalDetails={movieCardModalDetails}
                    opacityValue={opacityValue}
                    setOpacityValue={setOpacityValue}
                />
                : null
            }
        </>
    )
}
export default MovieList