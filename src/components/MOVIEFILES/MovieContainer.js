import React,{useState, useEffect} from "react"
import MovieList from "./MovieCards/MovieList"
import Header from "./HeaderBanner/Header"
import Search from "./Search"
import WatchList from "./WatchList"
import BlankPoster from "../../assets/blankposter.jpg"
import MoviePage2Container from "./MovieInfoNReviews/MoviePage2Conatiner"
import YoutubeFreeMovie from "./HeaderBanner/YoutubeFreeMovie"

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

    const broken_path = BlankPoster
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl = "https://api.themoviedb.org/3/"
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

    const searchUrl = (movieCateogry === 'Genres' || movieCateogry === 'Year Release')  ?
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}${yearOrGenreSuffix}` : 
    `${apiUrl}${movieCateogry}?api_key=${apiKey}${searchSuffix}&page=${pageNumber}`
    
    useEffect(() => {
        fetch(searchUrl)
        .then(res=> res.json())
        .then(moviesListData => {
            if(moviesListData.total_pages === 0){
                setNoResultsFound(true)
            }else{
                setNoResultsFound(false)
                setTotalPagesCount(moviesListData.total_pages)
                //console.log(pageNumber)
                if(Number.isInteger(moviesListData.page/2) === true){
                    setMoviesData([...moviesData, ...moviesListData.results])
                }else{
                    //console.log(Number.isInteger(Math.floor(moviesListData.page/2)/2) === true)
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
                apiUrl={apiUrl} 
                totalPagesCount={totalPagesCount} 
                moviesDataLength={moviesData.length} 
                poster_prefixURL={poster_prefixURL}
                setYearOrGenreSuffix={setYearOrGenreSuffix}
                setmovieCateogry={setmovieCateogry}
                broken_path={broken_path}
                setMovie={setMovie}
                movie={movie}
                setToggleHeaderInfo={setToggleHeaderInfo}
                toggleHeaderInfo={toggleHeaderInfo}
                setTogglePage2={setTogglePage2}
                togglePage2={togglePage2}
                genresList={genresList}
                setGenresList={setGenresList}
                movieID={movieID} 
                setMovieID={setMovieID}
                movieArray={movieArray}
                setMovieArray={setMovieArray}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                isLoadMoreMovies={isLoadMoreMovies} 
                setPageNumber={setPageNumber}
            />

        {togglePage2? 
            <MoviePage2Container
                movie={movie}
                togglePage2={togglePage2}
                poster_prefixURL={poster_prefixURL}
                broken_path={broken_path}
                apiKey={apiKey}
            />
        : null}

        {togglePage2? null :
            <MovieList 
                moviesData={moviesData} 
                poster_prefixURL={poster_prefixURL} 
                totalPagesCount={totalPagesCount}
                setPageNumber = {setPageNumber}
                pageNumber={pageNumber}
                setIsLoadMoreMovies ={setIsLoadMoreMovies}
                isLoadMoreMovies={isLoadMoreMovies}
                broken_path={broken_path}
                setWatchListArray={setWatchListArray}
                watchListArray={watchListArray}
                setMovie={setMovie}
                togglePage2 = {togglePage2}
                setTogglePage2={setTogglePage2}
                setGenresList={setGenresList}
                apiKey={apiKey}
                noResultsFound={noResultsFound}
                searchSuffix={searchSuffix}
            />
        }

            <Search 
                setmovieCateogry={setmovieCateogry} 
                apiKey={apiKey} 
                setMoviesData={setMoviesData} 
                setTotalPagesCount={setTotalPagesCount}
                setYearOrGenreSuffix={setYearOrGenreSuffix}
                setSearchSuffix={setSearchSuffix}
                setTogglePage2={setTogglePage2}
                setPageNumber={setPageNumber}
                setIsLoadMoreMovies={setIsLoadMoreMovies}
                isLoadMoreMovies={isLoadMoreMovies}
            />

            <WatchList 
                watchListArray={watchListArray} 
                setWatchListArray={setWatchListArray} 
                poster_prefixURL={poster_prefixURL}
                broken_path={broken_path}
                setMovie={setMovie}
                setTogglePage2={setTogglePage2}
                setMovieID={setMovieID}
            />

            <YoutubeFreeMovie 
                movie={movie}
                setMovieArray={setMovieArray}
            />
        </div>
    )
}
export default MovieContainer