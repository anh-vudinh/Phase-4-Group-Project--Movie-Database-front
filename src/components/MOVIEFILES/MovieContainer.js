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

function MovieContainer(){
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
    const [movieID, setMovieID] = useState("movie/popular")         //belongs to Header.js, moved up for watchlist cards not populating header with full details
    const [movieCateogry, setmovieCateogry] = useState("movie/popular")
    const [yearOrGenreSuffix, setYearOrGenreSuffix]= useState("")
    const [searchSuffix, setSearchSuffix] = useState("")
    const [noResultsFound, setNoResultsFound] = useState(false)
    const [waitForLoad, setWaitForLoad] = useState(false)
    const [currentPageCounter, setCurrentPageCounter] = useState(1)
    const [pagesToLoad, setPagesToLoad] = useState(2)               //each page is 20 movies
    
    const enableCrackleVideo = true
    const enableYoutubeVideo = true
    const broken_path = BlankPoster
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiPrefixURL = "https://api.themoviedb.org/3/"
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

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
                        setTimeout(()=>setWaitForLoad(false),130)                           // disable loading circle to display movies array
                        setTogglePage2(false)                                               // disable page2 enable page1 if not already
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

        {togglePage2? 
            <MoviePage2Container
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                broken_path={broken_path}
                movie={movie}
                poster_prefixURL={poster_prefixURL}
                togglePage2={togglePage2}
            />
        : null}

        {togglePage2? null :
            <MovieList
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                broken_path={broken_path}
                currentPageCounter={currentPageCounter}
                isLoadMoreMovies={isLoadMoreMovies}
                moviesData={moviesData}
                noResultsFound={noResultsFound}
                pageNumber={pageNumber}
                pagesToLoad={pagesToLoad}
                poster_prefixURL={poster_prefixURL} 
                searchSuffix={searchSuffix}
                setCurrentPageCounter={setCurrentPageCounter}
                setGenresList={setGenresList}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                setMovie={setMovie}
                setPageNumber={setPageNumber}
                setPagesToLoad={setPagesToLoad}
                setTogglePage2={setTogglePage2}
                setWatchListArray={setWatchListArray}
                togglePage2={togglePage2}
                totalPagesCount={totalPagesCount}
                waitForLoad={waitForLoad}
                watchListArray={watchListArray}
                previousPage={previousPage}
            />
        }

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
            />

            <WatchList 
                broken_path={broken_path}
                poster_prefixURL={poster_prefixURL}
                setMovie={setMovie}
                setMovieID={setMovieID}
                setTogglePage2={setTogglePage2}
                setWatchListArray={setWatchListArray}
                watchListArray={watchListArray}
            />
        </div>
    )
}
export default MovieContainer