import React,{useState, useEffect} from "react"
import MovieList from "./MovieCards/MovieList"
import Header from "./HeaderBanner/Header"
import Search from "./Search"
import WatchList from "./WatchList"
import CrackleFreeMovie from "./HeaderBanner/Crackle"
import MoviePage2Container from "./MovieInfoNReviews/MoviePage2Conatiner"
import YoutubeFreeMovie from "./HeaderBanner/YoutubeFreeMovie"
import BlankPoster from "../../assets/blankposter.jpg"

function MovieContainer(){
    const [movie, setMovie]= useState([])
    const [moviesData, setMoviesData] = useState([])
    const [genresList, setGenresList] = useState([])
    const [watchListArray, setWatchListArray] = useState([])
    const [movieArray, setMovieArray] = useState([])
    const [totalPagesCount, setTotalPagesCount]= useState(100)
    const [isLoadMoreMovies, setIsLoadMoreMovies] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [togglePage2, setTogglePage2] =useState(false)
    const [toggleHeaderInfo, setToggleHeaderInfo] = useState(false)
    const [movieID, setMovieID] = useState("movie/popular")       ///belongs to Header.js, moved up for watchlist cards not populating header with full details
    const [movieCateogry, setmovieCateogry] = useState("movie/popular")
    const [yearOrGenreSuffix, setYearOrGenreSuffix]= useState("") // rename the state
    const [searchSuffix, setSearchSuffix] = useState("")
    const [noResultsFound, setNoResultsFound] = useState(false)
    const [waitForLoad, setWaitForLoad] = useState(false)

    const broken_path = BlankPoster
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiPrefixURL = "https://api.themoviedb.org/3/"
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

    const searchUrl = (movieCateogry === 'Genres' || movieCateogry === 'Year Release')  ?
    `${apiPrefixURL}discover/movie?api_key=${apiKey}&page=${pageNumber}${yearOrGenreSuffix}` : 
    `${apiPrefixURL}${movieCateogry}?api_key=${apiKey}${searchSuffix}&page=${pageNumber}`
    
    useEffect(() => {
        fetch(searchUrl)
        .then(res=> res.json())
        .then(moviesListData => {
            if(moviesListData.total_pages === 0){
                setNoResultsFound(true)
            }else{
                setMoviesData([])
                setNoResultsFound(false)
                setTotalPagesCount(moviesListData.total_pages)
                if(Number.isInteger(moviesListData.page/2) === true){
                    setMoviesData([...moviesData, ...moviesListData.results])
                    setTimeout(()=>setWaitForLoad(false),130)
                }else{
                    setWaitForLoad(true)
                    setMoviesData(moviesListData.results)
                    setPageNumber(pageNumber+1)
                    setIsLoadMoreMovies(!isLoadMoreMovies)
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadMoreMovies, yearOrGenreSuffix, searchSuffix])


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
                moviesDataLength={moviesData.length}
                poster_prefixURL={poster_prefixURL}
                setGenresList={setGenresList}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                setMovie={setMovie}
                setMovieArray={setMovieArray}
                setmovieCateogry={setmovieCateogry}
                setMovieID={setMovieID}
                setPageNumber={setPageNumber}
                setToggleHeaderInfo={setToggleHeaderInfo}
                setTogglePage2={setTogglePage2}
                setYearOrGenreSuffix={setYearOrGenreSuffix}
                toggleHeaderInfo={toggleHeaderInfo}
                togglePage2={togglePage2}
                totalPagesCount={totalPagesCount}
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
                isLoadMoreMovies={isLoadMoreMovies}
                moviesData={moviesData}
                noResultsFound={noResultsFound}
                pageNumber={pageNumber}
                poster_prefixURL={poster_prefixURL} 
                searchSuffix={searchSuffix}
                setGenresList={setGenresList}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                setMovie={setMovie}
                setPageNumber={setPageNumber}
                setTogglePage2={setTogglePage2}
                setWatchListArray={setWatchListArray}
                togglePage2={togglePage2}
                totalPagesCount={totalPagesCount}
                waitForLoad={waitForLoad}
                watchListArray={watchListArray}
            />
        }

            <Search 
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                isLoadMoreMovies={isLoadMoreMovies}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                setmovieCateogry={setmovieCateogry}
                setMoviesData={setMoviesData}
                setPageNumber={setPageNumber}
                setSearchSuffix={setSearchSuffix}
                setTogglePage2={setTogglePage2}
                setTotalPagesCount={setTotalPagesCount}
                setYearOrGenreSuffix={setYearOrGenreSuffix}
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

            <YoutubeFreeMovie 
                movie={movie}
                setMovieArray={setMovieArray}
            />
            
            <CrackleFreeMovie
                movie={movie}
                togglePage2={togglePage2}
            />

        </div>
    )
}
export default MovieContainer