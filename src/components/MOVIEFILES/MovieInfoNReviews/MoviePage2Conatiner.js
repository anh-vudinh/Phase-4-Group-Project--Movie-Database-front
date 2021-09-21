import React from 'react'
import Cast from "./Cast"
import Review from "./Review";
import MovieExtraInfo from "./MovieExtraInfo"

function MoviePage2Container({movie,togglePage2, poster_prefixURL, broken_path, apiKey, setToggleShowMoreCast, toggleShowMoreCast}){
    
    return(
        <div className="MoviePage2Container">
            <MovieExtraInfo movie={movie}/>

            <Cast 
                movie={movie} 
                togglePage2={togglePage2} 
                poster_prefixURL={poster_prefixURL} 
                broken_path={broken_path} 
                apiKey={apiKey}
                toggleShowMoreCast={toggleShowMoreCast}
                setToggleShowMoreCast={setToggleShowMoreCast}
            />
            <Review 
                movie={movie} 
                togglePage2={togglePage2} 
                apiKey={apiKey}
            />
        </div>
    )
}

export default MoviePage2Container