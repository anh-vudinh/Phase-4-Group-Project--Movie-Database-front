import React,{useState, useEffect} from "react"
import MovieList from "./MovieCards/MovieList"
import Header from "./HeaderBanner/Header"
import Search from "./Search"
import WatchList from "./WatchList"
import MoviePage2Container from "./MovieInfoNReviews/MoviePage2Conatiner"
import BlankPoster from "../../assets/blankposter.jpg"

//useEffects() exist in : [dependencies]
// MovieContainer : [isLoadMoreMovies, yearOrGenreSuffix, searchSuffix]
// MovieList : [startModalTimer]
// MovieCardModal : [opacityValue]
// Header : [movieID]
// YoutubeFreeMovie : [movie, toggleRetryFetch]
// Trailer : [movie]
// Crackle : [movie]

function MovieContainer({sessionToken, sessionUsername, sessionProfilePic, BASE_URL_BACK}){
    const [movie, setMovie]= useState([])
    const [moviesData, setMoviesData] = useState([])
    const [genresList, setGenresList] = useState([])
    const [watchListArray, setWatchListArray] = useState([])
    const [movieArray, setMovieArray] = useState([])
    const [previousPage, setPreviousPage] = useState(0)
    const [totalPagesCount, setTotalPagesCount]= useState(100)
    const [isLoadMoreMovies, setIsLoadMoreMovies] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [togglePage2, setTogglePage2] =useState(false)
    const [toggleHeaderInfo, setToggleHeaderInfo] = useState(false)
    const [isWatchedMP2C, setIsWatchedMP2C] = useState(false)
    const [movieID, setMovieID] = useState("movie/popular")         //belongs to Header.js, moved up for watchlist cards not populating header with full details
    const [movieCateogry, setmovieCateogry] = useState("movie/popular")
    const [yearOrGenreSuffix, setYearOrGenreSuffix]= useState("")
    const [searchSuffix, setSearchSuffix] = useState("")
    const [noResultsFound, setNoResultsFound] = useState(false)
    const [waitForLoad, setWaitForLoad] = useState(false)
    const [currentPageCounter, setCurrentPageCounter] = useState(1)
    const [pagesToLoad, setPagesToLoad] = useState(2)               //each page is 20 movies
    const [genreTitle, setGenreTitle] = useState({title:"Genres",extTitle:""})
    const [yearTitle, setYearTitle] = useState({title:"Year Release",extTitle:""})
    const [toggleEyeballRefresh, setToggleEyeballRefresh] = useState(false)
    
    const enableCrackleVideo = true
    const enableYoutubeVideo = true
    const broken_path = BlankPoster
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiPrefixURL = "https://api.themoviedb.org/3/"
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face"


    const searchUrl = (movieCateogry === 'Genres' || movieCateogry === 'Year Release')  ?
    `${apiPrefixURL}discover/movie?api_key=${apiKey}&page=${pageNumber}${yearOrGenreSuffix}` : 
    `${apiPrefixURL}${movieCateogry}?api_key=${apiKey}${searchSuffix}&page=${pageNumber}`
    
    useEffect(() => {
        fetch(searchUrl)                                                                    // URL alternates to populate movieList for pageload, main categories, 
        .then(res=> res.json())                                                             // sub categories, and search movie by name results
        .then(moviesListData => {
            if(moviesListData.errors === undefined){                                        // catch error messages, which means the page requested does not exist (requesting page greater than totalpages)
                if(moviesListData.total_pages === 0){
                    setNoResultsFound(true)                                                 // search, enable no results page
                }else{
                    setNoResultsFound(false)                                                // search, disable no results page
                    setTotalPagesCount(moviesListData.total_pages)                          // sets max amount of pages
                if(currentPageCounter === 1 || pagesToLoad === 1){                          // load first page of pages
                        setPreviousPage(pageNumber)
                        setWaitForLoad(true)                                                // activate the loading circle until pages are done loading
                        setMoviesData(moviesListData.results)                               // clear out moviesData array and overwrite with first page
                        setCurrentPageCounter(currentPageCounter+1)                         // increment page Counter
                        if(pagesToLoad !== 1) {                                             // normal procedure if user is not only loading 1 page
                            setPageNumber(pageNumber+1)                                     // increment page number by 1 to fetch next page
                            setIsLoadMoreMovies(!isLoadMoreMovies)}                         // toggle this.UseEffect() to run again
                        if(pagesToLoad === 1) setTimeout(()=>setWaitForLoad(false),130)     // if user only wanted to load 1 page then disable loading circle
                        return
                    }else if(currentPageCounter === pagesToLoad){                           // load last page of pages
                        setMoviesData([...moviesData, ...moviesListData.results])           // spread last page into current array
                        setCurrentPageCounter(1)                                            // reset the page Counter back to default
                        setTogglePage2(false)                                               // disable page2 enable page1 if not already             
                        setTimeout(()=>setWaitForLoad(false),(150*pagesToLoad))                           // disable loading circle to display movies array
                        return
                    }else{                                                                  // load all other pages but first and last pages
                        setMoviesData([...moviesData, ...moviesListData.results])           // spread current page loaded into current array
                        setPageNumber(pageNumber+1)                                         // increment page number by 1 to fetch next page
                        setCurrentPageCounter(currentPageCounter+1)                         // increment page Counter to keep track of pages already added to array
                        setIsLoadMoreMovies(!isLoadMoreMovies)                              // toggle this.UseEffect() to run again
                    }
                }
            }else{                                                                          // reset as psuedo last page if api returns error message because pages do not exist and 
                setCurrentPageCounter(1)
                setTimeout(()=>setWaitForLoad(false),130)
                setTogglePage2(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadMoreMovies, yearOrGenreSuffix, searchSuffix, pagesToLoad])

    function handleWatchListAddClick(movie, isWatched){
        if(sessionToken === null) return;                               // only valid users can send requests to server
        const {title, poster_path, release_date, id, vote_average} = movie

        if(!isWatched){                                                 // not yet added to WL so add to WL
            const dataToSend = {
                token: sessionToken,
                movie_id: id,
                movie_name: title,
                movie_backdrop: poster_path,
                movie_year: release_date,
                movie_rating: vote_average
            }
            
            switch(watchListArray.length){                              // checks to see if movie is allowed to be added into watchlist
                case 0:{                                                // handles adding the first movie into an empty watchlist    
                    sendWLDataToDB(dataToSend, `${BASE_URL_BACK}users/addWLC`)
                    break;
                }
                default:{                                               // checks to see if the movie.id to add matches any movie ids currently in the watchlist, if return false then add clicked movie
                    if(watchListArray.find(watchListItem => watchListItem.id === movie.id)  === undefined){
                        sendWLDataToDB(dataToSend, `${BASE_URL_BACK}users/addWLC`)
                    }
                }
            }
        }else{                                                          // already added in WL so remove from WL
            const dataToSend = {
                token: sessionToken,
                movie_id: id
            }
            deleteWLDataFromDB(dataToSend, `${BASE_URL_BACK}users/deleteWLC`)
        }
    }

    function sendWLDataToDB(dataToSend, fetchURL){
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }

        fetch(fetchURL, headers)
        .then(resp => resp.json())
        .then(movieData => {
            setWatchListArray([...watchListArray, movieData])
        })
    }

    function deleteWLDataFromDB(dataToSend, fetchURL){
        const headers = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }
        fetch(fetchURL, headers)
        .then(resp => resp.json())
        .then(movieData => {
            setWatchListArray(watchListArray.filter(watchListItem => watchListItem.id !== movieData.id))
        })
    }


    return (
        <div className="movieContainer">
            <Header
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                blankPoster={BlankPoster}
                broken_path={broken_path}
                genresList={genresList}
                isLoadMoreMovies={isLoadMoreMovies}
                movie={movie} movieArray={movieArray}
                movieID={movieID}
                moviesData={moviesData}
                poster_prefixURL={poster_prefixURL}
                setGenresList={setGenresList}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                setMovie={setMovie}
                setMovieArray={setMovieArray}
                setmovieCateogry={setmovieCateogry}
                setMovieID={setMovieID}
                setPageNumber={setPageNumber}
                setToggleHeaderInfo={setToggleHeaderInfo}
                setYearOrGenreSuffix={setYearOrGenreSuffix}
                toggleHeaderInfo={toggleHeaderInfo}
                togglePage2={togglePage2}
                totalPagesCount={totalPagesCount}
                enableCrackleVideo={enableCrackleVideo}
                enableYoutubeVideo={enableYoutubeVideo}
            />

            {togglePage2? null :
                <MovieList
                    apiKey={apiKey}
                    apiPrefixURL={apiPrefixURL}
                    broken_path={broken_path}
                    moviesData={moviesData}
                    noResultsFound={noResultsFound}
                    poster_prefixURL={poster_prefixURL} 
                    searchSuffix={searchSuffix}
                    setGenresList={setGenresList}
                    setMovie={setMovie}
                    totalPagesCount={totalPagesCount}
                    waitForLoad={waitForLoad}
                    previousPage={previousPage}
                    currentPageCounter={currentPageCounter} setCurrentPageCounter={setCurrentPageCounter}
                    isLoadMoreMovies={isLoadMoreMovies} setIsLoadMoreMovies={setIsLoadMoreMovies}
                    pageNumber={pageNumber} setPageNumber={setPageNumber}
                    pagesToLoad={pagesToLoad} setPagesToLoad={setPagesToLoad}
                    togglePage2={togglePage2} setTogglePage2={setTogglePage2}
                    watchListArray={watchListArray} setWatchListArray={setWatchListArray}
                    genreTitle={genreTitle} setGenreTitle={setGenreTitle}
                    yearTitle={yearTitle} setYearTitle={setYearTitle}
                    handleWatchListAddClick={handleWatchListAddClick}
                    sessionToken={sessionToken}
                    toggleEyeballRefresh={toggleEyeballRefresh}
                    setIsWatchedMP2C={setIsWatchedMP2C}
                />
            }

            {togglePage2? 
                <MoviePage2Container
                    apiKey={apiKey}
                    apiPrefixURL={apiPrefixURL}
                    broken_path={broken_path}
                    movie={movie}
                    poster_prefixURL={poster_prefixURL}
                    togglePage2={togglePage2}
                    handleWatchListAddClick={handleWatchListAddClick}
                    isWatchedMP2C={isWatchedMP2C} setIsWatchedMP2C={setIsWatchedMP2C}
                    sessionToken={sessionToken}
                    sessionUsername={sessionUsername}
                    sessionProfilePic={sessionProfilePic}
                    BASE_URL_BACK={BASE_URL_BACK}
                />
            : null}

            <Search 
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                isLoadMoreMovies={isLoadMoreMovies}
                movieCateogry={movieCateogry}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                setmovieCateogry={setmovieCateogry}
                setMoviesData={setMoviesData}
                setPageNumber={setPageNumber}
                setSearchSuffix={setSearchSuffix}
                setTotalPagesCount={setTotalPagesCount}
                setYearOrGenreSuffix={setYearOrGenreSuffix}
                togglePage2={togglePage2}
                yearOrGenreSuffix={yearOrGenreSuffix}
                genreTitle={genreTitle} setGenreTitle={setGenreTitle}
                yearTitle={yearTitle} setYearTitle={setYearTitle}
            />

            <WatchList 
                broken_path={broken_path}
                poster_prefixURL={poster_prefixURL}
                setMovie={setMovie}
                setMovieID={setMovieID}
                setTogglePage2={setTogglePage2}
                setWatchListArray={setWatchListArray}
                watchListArray={watchListArray}
                sessionToken={sessionToken}
                BASE_URL_BACK={BASE_URL_BACK}
                deleteWLDataFromDB={deleteWLDataFromDB}
                toggleEyeballRefresh={toggleEyeballRefresh} setToggleEyeballRefresh={setToggleEyeballRefresh}
                setIsWatchedMP2C={setIsWatchedMP2C}
            />
        </div>
    )
}
export default MovieContainer