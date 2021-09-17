import React, { useEffect, useState } from "react"
import Video from "./video"


function Trailer({movie, togglePage2}){
    //const youtubeTrailer_prefixURL = "https://www.youtube.com/watch?v="
    //console.log("intrailer",movie)
    const [movieArray, setMovieArray] = useState([])
 

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=9b9db796275919f97fb742c582ab0008`)
        .then(res =>res.json())
        .then(data => 
           data === undefined ? null : setMovieArray(data.results)
        )
    },[movie])

    const movieTrailer = togglePage2 === false ? null : <Video key={movieArray[0].id} linkID={movieArray[0].key === undefined ? "JL2PB7NJ090" : movieArray[0].key}/>
    //.map(movieKey => <Video key={movieKey.id} linkID={movieKey.key}/>)
   //console.log("2",movieArray)
    return(
        <div className="trailerContainer">
            {movieTrailer}
        </div>
    )
}
export default Trailer