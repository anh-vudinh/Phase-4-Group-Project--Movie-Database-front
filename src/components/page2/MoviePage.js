import React from 'react'
import Cast from "./Cast"
import Review from "./Review";
import Trailer from './Trailer';
function MoviePage({movie,togglePage2, poster_prefixURL, broken_path}){
    return(
        <div className="MoviePage2Container">
            <Trailer movie={movie} togglePage2={togglePage2}/>
            <Cast movie={movie} togglePage2={togglePage2} poster_prefixURL={poster_prefixURL} broken_path={broken_path}/>
            <Review movie={movie} togglePage2={togglePage2}/>
        </div>
    )
}


export default MoviePage