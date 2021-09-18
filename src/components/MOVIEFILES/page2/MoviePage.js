import React from 'react'
import Cast from "./Cast"
import Review from "./Review";

function MoviePage({movie,togglePage2, poster_prefixURL, broken_path, apiKey}){
    
    return(
        <div className="MoviePage2Container">
            <Cast movie={movie} togglePage2={togglePage2} poster_prefixURL={poster_prefixURL} broken_path={broken_path} apiKey={apiKey}/>
            <Review movie={movie} togglePage2={togglePage2} apiKey={apiKey}/>
        </div>
    )
}

export default MoviePage