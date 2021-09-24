import React from 'react'
import Cast from "./Cast"
import Review from "./Review";
import MovieExtraInfo from "./MovieExtraInfo"
import BlankAvatarM from "../../../assets/blankAvatarM.png"
import BlankAvatarF from "../../../assets/blankAvatarF.png"
import BlankAvatar from "../../../assets/blankAvatar.png"

function MoviePage2Container({movie,togglePage2, poster_prefixURL, broken_path, apiKey, setToggleShowMoreCast, toggleShowMoreCast}){
    
    return(
        <div className="MoviePage2Container">
        
            <MovieExtraInfo 
                movie={movie}
                togglePage2={togglePage2}
            />

            <Cast 
                movie={movie} 
                togglePage2={togglePage2} 
                poster_prefixURL={poster_prefixURL} 
                broken_path={broken_path} 
                apiKey={apiKey}
                toggleShowMoreCast={toggleShowMoreCast}
                setToggleShowMoreCast={setToggleShowMoreCast}
                blankAvatarM={BlankAvatarM}
                blankAvatarF={BlankAvatarF}
                blankAvatar={BlankAvatar}
            />

            <Review 
                movie={movie} 
                togglePage2={togglePage2} 
                apiKey={apiKey}
                blankAvatar={BlankAvatar}
            />
        </div>
    )
}

export default MoviePage2Container