import React,{useState, useEffect} from "react"
import MovieList from "./page1/MovieList"
import Header from "./Header"

function MovieContainer(){
    const [moviesData, setMoviesData] = useState([])
    const [totalPagesCount, setTotalPagesCount]= useState(100)
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl = "https://api.themoviedb.org/3/movie/"
    const [movieCateogry, setmovieCateogry] = useState("popular")

    useEffect(async () => {
        await fetch(`${apiUrl}${movieCateogry}?api_key=${apiKey}&page=1`)
        .then(res=> res.json())
        .then(moviesListData => {
            setTotalPagesCount(moviesListData.total_pages)
            setMoviesData(moviesListData.results)
        })
        // eslint-disable-next-line
    }
    ,[])




    return (
        <div id="movieContainer">
            <Header apiKey={apiKey} apiUrl={apiUrl} totalPagesCount={totalPagesCount} moviesDataLength={moviesData.length} />
            <MovieList moviesData={moviesData} />
        </div>
    )
}

export default MovieContainer