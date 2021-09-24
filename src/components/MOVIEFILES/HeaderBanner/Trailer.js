import React, { useEffect} from "react"
import Video from "./Video"


function Trailer({movie, apiKey, movieArray, setMovieArray, apiPrefixURL}){

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`${apiPrefixURL}movie/${movie.id}/videos?api_key=${apiKey}`)
            .then(res =>res.json())
            .then(data => 
                data === undefined ? null : setMovieArray(data.results)
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    const movieTrailer = (movieArray === undefined || movieArray.length === 0 )? null : 
    <Video
        key={movieArray[0].id}
        videoID={movieArray === undefined ? "JL2PB7NJ090" : movieArray[0].key}
    />

    return(
        <div className="trailerContainer">
            {movieTrailer}
        </div>
    )
}

export default Trailer