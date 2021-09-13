import React,{useState, useEffect} from "react"
import MovieList from "./page1/MovieList"
import Header from "./Header"
function MovieContainer(){
    const [moviesData, setMoviesData] = useState([])
    const [totalPagesCount, setTotalPagesCount]= useState(0)
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl = "https://api.themoviedb.org/3/movie/"
    const [movieCateogry, setmovieCateogry] = useState("popular")


    useEffect(() => {

        // fetch(`${apiUrl}${movieId}?api_key=${apiKey}`)
        fetch(`${apiUrl}${movieCateogry}?api_key=${apiKey}&page=1`)
        .then(res=> res.json())
        .then(moviesListData => {
            console.log(moviesListData)
            // console.log(moviesListData.total_results)
            setTotalPagesCount(moviesListData.total_pages)
            setMoviesData(moviesListData.results)
        })
    }
    ,[])




    return (
        <div>
            <Header totalPages={totalPagesCount} apiKey={apiKey} apiUrl={apiUrl}/>
            <MovieList moviesData={moviesData} />
        </div>
    )
}

export default MovieContainer