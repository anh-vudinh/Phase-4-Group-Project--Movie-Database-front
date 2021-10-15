import React, {useState, useEffect} from "react";
import ReviewReadMore from "./ReviewReadMore";

function Review({movie, apiKey, apiPrefixURL, reviewsArray,  setReviewsArray, reviewsArrayBE,  setReviewsArrayBE, BASE_URL_BACK, blankAvatar, sessionUsername, sessionToken, sessionProfilePic, displayReadMore, setDisplayReadMore}){

    const [readMoreDetails, setReadMoreDetails] =  useState([])
    const avatarPrefix ="https://www.themoviedb.org/t/p/w100_and_h100_face"
    const maxReviewContentLength = 500

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`${apiPrefixURL}movie/${movie.id}/reviews?api_key=${apiKey}`)
            .then(res=> res.json())
            .then(reviewsArrayTMDB => { 
                setReviewsArray(reviewsArrayTMDB.results) 
            })
            fetch(`${BASE_URL_BACK}users/getReviews/${movie.id}`)
            .then(resp=> resp.json())
            .then(reviewsArrayBE => {
                setReviewsArrayBE(reviewsArrayBE)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])


    function handleReadMoreClick(review, source){
        if(source === "TMDB"){
            setReadMoreDetails(review)
        }else{
            const {id, author, updated_at, rating, content, avatar_path} = review
            const convertReview = {
                id: id,
                author: author,
                content: content,
                author_details:{
                    avatar_path: avatar_path,
                    rating: rating,
                },
                updated_at: updated_at
            }
            setReadMoreDetails(convertReview)
        }
        setDisplayReadMore(true)
    }


    const review = reviewsArray === undefined ? 
        null
        :
        reviewsArray.map((review, index) =>
            <div className="ReviewCardContainer" key={index}>
                    <div className="reviewSecA">
                        <div className="AuthorPicture">
                            <img alt="author" src={review.author_details.avatar_path === null ? blankAvatar : review.author_details.avatar_path.includes("http") ? review.author_details.avatar_path.slice(1)  : `${avatarPrefix}${review.author_details.avatar_path}`}/>
                        </div>
                        <div className="AuthorName">
                                <p>{review.author}</p>
                        </div>
                    </div>
                    <div className="reviewSecB">
                        <div className="DateAndRating">
                            <div className="Date">{`${review.updated_at.slice(5, 7)}-${review.updated_at.slice(8, 10)}-${review.updated_at.slice(0, 4)}`}</div>
                            <div className="Rating">{review.author_details.rating} / 10 ⭐ </div>
                        </div>

                        <div className="ReviewContentContainer">
                            <p className="ReviewContent">{review.content.substr(0,maxReviewContentLength)} {review.content.length < maxReviewContentLength? "" : "....."}</p>
                            <div className="readMoreBtnContainer">
                                <button className="readMoreBtn" onClick={()=> handleReadMoreClick(review, "TMDB")}>Read More</button>
                            </div>
                        </div>
                    </div>
            </div>
        )

    const reviewBE = reviewsArrayBE === undefined ? 
    null
    :
    reviewsArrayBE.map((review, index) =>
        <div className="ReviewCardContainer" key={index}>
                <div className="reviewSecA">
                    <div className="AuthorPicture">
                        <img alt="author" src={review.avatar_path === null ? blankAvatar : review.avatar_path.includes("http") ? review.avatar_path.slice(1)  : `${avatarPrefix}${review.avatar_path}`}/>
                    </div>
                    <div className="AuthorName">
                            <p>{review.author}</p>
                    </div>
                </div>
                <div className="reviewSecB">
                    <div className="DateAndRating">
                        <div className="Date">{`${review.updated_at.slice(5, 7)}-${review.updated_at.slice(8, 10)}-${review.updated_at.slice(0, 4)}`}</div>
                        <div className="Rating">{review.rating} / 10 ⭐ </div>
                    </div>

                    <div className="ReviewContentContainer">
                        <p className="ReviewContent">{review.content.substr(0,maxReviewContentLength)} {review.content.length < maxReviewContentLength? "" : "....."}</p>
                        <div className="readMoreBtnContainer">
                            <button className="readMoreBtn" onClick={()=> handleReadMoreClick(review, "BE")}>Read More</button>
                        </div>
                    </div>
                </div>
        </div>
    )


    return(
        <>
            <div className="reviewSectionA">
                <div className="reviewColumnA">
                    
                </div>
                <div className ="Review-Movie">
                    {review.length ===0?
                        <div className="ReviewCardContainer" key={review.id}>
                            <div className="reviewSecA">
                                <div className="AuthorPicture">
                                    <img alt="author" src={blankAvatar}/>
                                </div>
                                <div className="AuthorName">
                                        <p></p>
                                </div>
                            </div>
                            <div className="reviewSecB">
                                <div className="DateAndRating">
                                    <div className="Date"></div>
                                    <div className="Rating">0 / 10 ⭐ </div>
                                </div>

                                <div className="ReviewContentContainer">
                                    <p className="ReviewContent">Be the first to leave a Review!</p>
                                </div>
                            </div>
                        </div>
                    :
                        <>  
                            {review}
                            {reviewBE}
                        </>
                    }
                </div>
            </div>
            {displayReadMore? 
                <ReviewReadMore 
                    readMoreDetails={readMoreDetails}
                    displayReadMore={displayReadMore} setDisplayReadMore={setDisplayReadMore}
                    blankAvatar={blankAvatar}
                    avatarPrefix={avatarPrefix}
                    sessionUsername={sessionUsername}
                    sessionToken={sessionToken}
                    sessionProfilePic={sessionProfilePic}
                    BASE_URL_BACK={BASE_URL_BACK}
                    movie={movie}
                /> 
            : null}
        </>
    )
}
export default Review