import React, {useState, useEffect} from "react";
import CommentForm from "./CommentForm"
import ReviewReadMore from "./ReviewReadMore";

function Review({movie, apiKey, apiPrefixURL, blankAvatar, sessionUsername, sessionProfilePic}){

    const [reviewsArray, setReviewsArray] = useState([])
    const [displayReadMore, setDisplayReadMore] = useState(false)
    const [readMoreDetails, setReadMoreDetails] =  useState([])
    const avatarPrefix ="https://www.themoviedb.org/t/p/w100_and_h100_face"
    const maxReviewContentLength = 500

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`${apiPrefixURL}movie/${movie.id}/reviews?api_key=${apiKey}`)
            .then(res=> res.json())
            .then(reviewsArray => { 
                setReviewsArray(reviewsArray.results) 
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])


    function handleReadMoreClick(review){
        setReadMoreDetails(review)
        setDisplayReadMore(true)
    }


    const review = reviewsArray === undefined ? 
        null
        :
        reviewsArray.map(review =>
            <div className="ReviewCardContainer" key={review.id}>
                    <div className="reviewSecA">
                        <div className="AuthorPicture">
                            <img alt="author" src={review.author_details.avatar_path === null ? blankAvatar : review.author_details.avatar_path.includes("http") ? review.author_details.avatar_path.slice(1)  : `${avatarPrefix}${review.author_details.avatar_path}` }></img>
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
                                <button className="readMoreBtn" onClick={()=> handleReadMoreClick(review)}>Read More</button>
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
                        review
                    }
                </div>
            </div>
            {displayReadMore? 
                <ReviewReadMore 
                    readMoreDetails={readMoreDetails}
                    setDisplayReadMore={setDisplayReadMore}
                    blankAvatar={blankAvatar}
                    avatarPrefix={avatarPrefix}
                    sessionUsername={sessionUsername}
                    sessionProfilePic={sessionProfilePic}
                /> 
            : null}
        </>
    )
}
export default Review