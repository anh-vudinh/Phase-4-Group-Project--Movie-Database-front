import React,{useState, useEffect} from "react"
import MovieList from "./page1/MovieList"
import Header from "./Header"
import Search from "./Search"
import WatchList from "./WatchList"
import MoviePage from "./page2/MoviePage"

function TVContainer(){
    const [movie, setMovie]= useState([])
    const [moviesData, setMoviesData] = useState([])
    const [totalPagesCount, setTotalPagesCount]= useState(100)
    const [isLoadMoreMovies, setIsLoadMoreMovies] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [watchListArray, setWatchListArray] = useState([])
    const [togglePage2, setTogglePage2] =useState(false)
    const [toggleHeaderInfo, setToggleHeaderInfo] = useState(false)
    const broken_path = `https://www.movie-trailer.co.uk/static/images/site/blank-poster.jpg`
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl = "https://api.themoviedb.org/3/"
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"
    const [movieCateogry, setmovieCateogry] = useState("tv/popular")
    const [suffix, setSuffix]= useState("") // rename the state
    const [searchSuffix, setSearchSuffix] = useState("")
    const searchUrl = (movieCateogry === 'Genres' || movieCateogry === 'Year Release')  ?
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${pageNumber}${suffix}` : 
    `${apiUrl}${movieCateogry}?api_key=${apiKey}${searchSuffix}&page=${pageNumber}`
    useEffect(() => {
        fetch(searchUrl)
        .then(res=> res.json())
        .then(moviesListData => {
            setTotalPagesCount(moviesListData.total_pages)
            setMoviesData(moviesListData.results)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadMoreMovies, movieCateogry, suffix, searchSuffix])
    console.log(moviesData)
    return (
        <div id="movieContainer">

            <Header 
                apiKey={apiKey} 
                apiUrl={apiUrl} 
                totalPagesCount={totalPagesCount} 
                moviesDataLength={moviesData.length} 
                poster_prefixURL={poster_prefixURL}
                setSuffix={setSuffix}
                setmovieCateogry={setmovieCateogry}
                broken_path={broken_path}
                setMovie={setMovie}
                movie={movie}
                setToggleHeaderInfo={setToggleHeaderInfo}
                toggleHeaderInfo={toggleHeaderInfo}
                setTogglePage2={setTogglePage2}
                togglePage2={togglePage2}
            />
            
            <MoviePage 
                movie={movie}
                togglePage2={togglePage2}
                poster_prefixURL={poster_prefixURL}
                broken_path={broken_path}
            />
            
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
            />


            <Search 
                setmovieCateogry={setmovieCateogry} 
                apiKey={apiKey} 
                setMoviesData={setMoviesData} 
                setTotalPagesCount={setTotalPagesCount}
                setSuffix={setSuffix}
                setSearchSuffix={setSearchSuffix}
                setTogglePage2={setTogglePage2}
            />

            <WatchList 
                watchListArray={watchListArray} 
                setWatchListArray={setWatchListArray} 
                poster_prefixURL={poster_prefixURL}
                broken_path={broken_path}
                setMovie={setMovie}
                setTogglePage2={setTogglePage2}
            />

        </div>
    )
}
export default TVContainer