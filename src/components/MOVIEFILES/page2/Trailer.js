import React, { useEffect, useState } from "react"
import Video from "./video"


function Trailer({movie, apiKey}){

    const [movieArray, setMovieArray] = useState([])

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`)
            .then(res =>res.json())
            .then(data => 
                data === undefined ? null : setMovieArray(data.results)
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    const movieTrailer = (movieArray === undefined || movieArray.length === 0 )? null : <Video key={movieArray[0].id} linkID={movieArray === undefined ? "JL2PB7NJ090" : movieArray[0].key}/>
    
    return(
        <div className="trailerContainer">
            {movieTrailer}
        </div>
    )
}
export default Trailer