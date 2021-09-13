import React,{useState, useEffect} from "react"
import MovieList from "./page1/MovieList"
function MovieContainer(){
    const [moviesData, setMoviesData] = useState([])
    //const [movieId, setMovieID]= useState(600)
    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl ='https://api.themoviedb.org/3/movie/popular'
    
    useEffect(() => {

        // fetch(`${apiUrl}${movieId}?api_key=${apiKey}`)
        fetch(`${apiUrl}?api_key=${apiKey}&page=1`)
        .then(res=> res.json())
        .then(moviesListData => {
            //console.log(moviesListData.results)
            setMoviesData(moviesListData.results)
        })
    }
    ,[])




    return (
        <div>
            <MovieList moviesData={moviesData} />
        </div>
    )
}

export default MovieContainer