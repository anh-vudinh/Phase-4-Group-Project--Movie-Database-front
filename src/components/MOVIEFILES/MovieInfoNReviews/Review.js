import React, {useState, useEffect} from "react";
import CommentForm from "./CommentForm"

function Review({movie, apiKey, apiPrefixURL, blankAvatar}){

    const [reviewsArray, setReviewsArray] = useState([])
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

    const avatarPrefix ="https://www.themoviedb.org/t/p/w100_and_h100_face"
    const review = reviewsArray === undefined ? 
        null
        :
        reviewsArray.map(reviews =>
            <div className="ReviewCardContainer" key={reviews.id}>
                <div className="AuthorProfie">
                    <div className="AuthorPicture">
                        <img alt="author" src={reviews.author_details.avatar_path === null ? blankAvatar : reviews.author_details.avatar_path.includes("http") ? reviews.author_details.avatar_path.slice(1)  : `${avatarPrefix}${reviews.author_details.avatar_path}` }></img>
                        <div className="AuthorName">
                            <p>{reviews.author}</p>
                        </div>
                    </div>

                    <div className="DateAndRating">
                        <div className="Date">{`${reviews.updated_at.slice(5, 7)}-${reviews.updated_at.slice(8, 10)}-${reviews.updated_at.slice(0, 4)}`}</div>
                        <div className="Rating">{reviews.author_details.rating} / 10 ⭐ </div>
                    </div>

                    <div className="ReviewContentContainer">
                        <p className="ReviewContent">{reviews.content.substr(0,maxReviewContentLength)} {reviews.content.length < maxReviewContentLength? "" : "....."}</p>
                    </div>
                    <div className="readMoreContainer">
                        <button className="readMoreBtn">Read More</button>
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
                        <div className="ReviewCardContainer">
                            <div className="AuthorProfie">
                                <div className="AuthorPicture">
                                    <img alt="author" src={blankAvatar}/>
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
            {/* <CommentForm 
                reviewsArray={reviewsArray} 
                setReviewsArray={setReviewsArray} 
                movie={movie}
            /> */}
        </>
    )
}
export default Review