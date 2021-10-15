import React, {useState} from "react";
import Cast from "./Cast"
import Review from "./Review";
import MovieExtraInfo from "./MovieExtraInfo"
import TextArea from './TextArea';
import BlankAvatarM from "../../../assets/blankAvatarM.png"
import BlankAvatarF from "../../../assets/blankAvatarF.png"
import BlankAvatar from "../../../assets/blankAvatar.png"

function MoviePage2Container({movie, sessionUsername, BASE_URL_BACK, sessionProfilePic, isWatchedMP2C, sessionToken, setIsWatchedMP2C, poster_prefixURL, broken_path, apiKey, apiPrefixURL, handleWatchListAddClick}){

    const [displayReadMore, setDisplayReadMore] = useState(false)
    const [reviewsArray, setReviewsArray] = useState([])
    const [reviewsArrayBE, setReviewsArrayBE] = useState([])

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
                sessionToken={sessionToken}
                BASE_URL_BACK={BASE_URL_BACK}
                displayReadMore={displayReadMore} setDisplayReadMore={setDisplayReadMore}
                reviewsArray={reviewsArray} setReviewsArray={setReviewsArray}
                reviewsArrayBE={reviewsArrayBE} setReviewsArrayBE={setReviewsArrayBE}
            />

            <div className="textAreaContainer">
                <div className="textArea">
                    <TextArea
                        movie={movie}
                        sessionToken={sessionToken}
                        displayReadMore={displayReadMore} setDisplayReadMore={setDisplayReadMore}
                        BASE_URL_BACK={BASE_URL_BACK}
                        reviewsArrayBE={reviewsArrayBE} setReviewsArrayBE={setReviewsArrayBE}
                        sessionUsername={sessionUsername}
                        sessionProfilePic={sessionProfilePic}
                    />
                </div>
            </div>
        </div>
    )
}

export default MoviePage2Container