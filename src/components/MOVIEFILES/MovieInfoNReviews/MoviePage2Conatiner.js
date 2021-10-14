import React from 'react'
import Cast from "./Cast"
import Review from "./Review";
import MovieExtraInfo from "./MovieExtraInfo"
import TextArea from './TextArea';
import BlankAvatarM from "../../../assets/blankAvatarM.png"
import BlankAvatarF from "../../../assets/blankAvatarF.png"
import BlankAvatar from "../../../assets/blankAvatar.png"

function MoviePage2Container({movie, sessionUsername, sessionProfilePic, isWatchedMP2C, sessionToken, setIsWatchedMP2C, poster_prefixURL, broken_path, apiKey, apiPrefixURL, handleWatchListAddClick}){

    return(
        <div className="MoviePage2Container">
        
            <MovieExtraInfo 
                movie={movie}
                handleWatchListAddClick={handleWatchListAddClick}
                isWatchedMP2C={isWatchedMP2C} setIsWatchedMP2C={setIsWatchedMP2C}
                sessionToken={sessionToken}
            />

            <Cast 
                movie={movie}
                poster_prefixURL={poster_prefixURL} 
                broken_path={broken_path} 
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                blankAvatarM={BlankAvatarM}
                blankAvatarF={BlankAvatarF}
                blankAvatar={BlankAvatar}
            />

            <Review 
                movie={movie} 
                apiKey={apiKey}
                apiPrefixURL={apiPrefixURL}
                blankAvatar={BlankAvatar}
                sessionUsername={sessionUsername}
                sessionProfilePic={sessionProfilePic}
            />

            <div className="textAreaContainer">
                <div className="textArea">
                    <TextArea/>
                </div>
            </div>
        </div>
    )
}

export default MoviePage2Container