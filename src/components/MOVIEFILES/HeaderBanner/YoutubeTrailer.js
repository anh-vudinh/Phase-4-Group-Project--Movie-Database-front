import React, { useEffect} from "react"
import YoutubeVideo from "./YoutubeVideo"

function YoutubeTrailer({movie, apiKey, movieArray, setMovieArray, apiPrefixURL}){

    useEffect(()=>{                                                                         // when movie state changes, fetch youtube trailer links of the new movie
        if(movie.id !== undefined){
            fetch(`${apiPrefixURL}movie/${movie.id}/videos?api_key=${apiKey}`)
            .then(res =>res.json())
            .then(data => 
                data === undefined ? null : setMovieArray(data.results)                     // set the returned trailers into movieArray
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    const movieTrailer = (movieArray === undefined || movieArray.length === 0 )? null :     // as long as a trailer exist, create Video component using link from the first trailer in the Array
        <YoutubeVideo
            key={movieArray[0].id}
            videoID={movieArray === undefined ? "JL2PB7NJ090" : movieArray[0].key}
        />

    return(
        <div className="trailerContainer">
            <div className="YTtrailer">
                {movieTrailer}
            </div>
        </div>
    )
}

export default YoutubeTrailer