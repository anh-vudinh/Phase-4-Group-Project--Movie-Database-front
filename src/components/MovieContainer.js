import React,{useState, useEffect} from "react"
import MovieList from "./page1/MovieList"
import Header from "./Header"
import Search from "./Search"

function MovieContainer(){
    const [moviesData, setMoviesData] = useState([])
    const [totalPagesCount, setTotalPagesCount]= useState(100)
    const [isLoadMoreMovies, setIsLoadMoreMovies] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl = "https://api.themoviedb.org/3/movie/"
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"
    //const youtubeTrailer_prefixURL = "https://www.youtube.com/watch?v="
    const [movieCateogry, setmovieCateogry] = useState("popular")
    

    useEffect(() => {
        fetch(`${apiUrl}${movieCateogry}?api_key=${apiKey}&page=${pageNumber}`)
        .then(res=> res.json())
        .then(moviesListData => {
            setTotalPagesCount(moviesListData.total_pages)
            setMoviesData(moviesListData.results)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadMoreMovies])

    return (
        <div id="movieContainer">
            <Header apiKey={apiKey} apiUrl={apiUrl} 
            totalPagesCount={totalPagesCount} 
            moviesDataLength={moviesData.length} 
            poster_prefixURL={poster_prefixURL}/>




            <MovieList 
            moviesData={moviesData} 
            poster_prefixURL={poster_prefixURL} 
            totalPagesCount={totalPagesCount}
            setPageNumber = {setPageNumber}
            pageNumber={pageNumber}
            setIsLoadMoreMovies ={setIsLoadMoreMovies}
            isLoadMoreMovies={isLoadMoreMovies}/>

            <Search setmovieCateogry={setmovieCateogry} apiKey={apiKey}/>
        </div>
    )
}

export default MovieContainer