import React, { useEffect, useState } from "react"
import Video from "./video"


function Trailer({movie}){

    const [movieArray, setMovieArray] = useState([])

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=9b9db796275919f97fb742c582ab0008`)
            .then(res =>res.json())
            .then(data => data === undefined ? null : setMovieArray(data.results))
        }

    },[movie])

    const movieTrailer = (movieArray === undefined || movieArray.length === 0 )? null : <Video key={movieArray[0].id} linkID={movieArray === undefined ? "JL2PB7NJ090" : movieArray[0].key}/>
    
    return(
        <div className="trailerContainer">
            {movieTrailer}
        </div>
    )
}
export default Trailer