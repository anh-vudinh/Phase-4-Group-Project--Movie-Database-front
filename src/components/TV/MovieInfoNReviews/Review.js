import React, {useState, useEffect} from "react";
import parse from "html-react-parser"
import sanitizeHtml from 'sanitize-html';
import ReviewReadMore from "./ReviewReadMore";
import ReviewCard from "./ReviewCard";

function Review({movie, apiKey, apiPrefixURL, reviewsArrayBE, isLoggedIn, cookies, setReviewsArrayBE, BASE_URL_BACK, blankAvatar, displayReadMore, setDisplayReadMore}){

    const [reviewsArray, setReviewsArray] = useState([])
    const [readMoreDetails, setReadMoreDetails] =  useState([])
    const maxReviewContentLength = 500
    const avatarPrefix ="https://www.themoviedb.org/t/p/w100_and_h100_face"

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`${apiPrefixURL}tv/${movie.id}/reviews?api_key=${apiKey}`)
            .then(res=> res.json())
            .then(reviewsArrayTMDB => { 
                setReviewsArray(reviewsArrayTMDB.results) 
            })
            // fetch(`${BASE_URL_BACK}/reviews/${movie.id}`)
            // .then(resp=> resp.json())
            // .then(reviewsArrayBE => {
            //     setReviewsArrayBE(reviewsArrayBE)
            // })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])


    const review = reviewsArray.map((review, index) =>
        <ReviewCard
            key={index}
            source={"TMDB"}
            avatarPrefix={avatarPrefix}
            blankAvatar={blankAvatar}
            maxReviewContentLength={maxReviewContentLength}
            review={review}
            avatar_path={review.author_details.avatar_path}
            author={review.author}
            updated_at={review.updated_at}
            rating={review.author_details.rating}
            content={review.content}
            parseDateTime={parseDateTime}
            parseSanitizeHTML={parseSanitizeHTML}
            handleReadMoreClick={handleReadMoreClick}
        />
    )

    // const reviewBE = reviewsArrayBE.map((review, index) =>
    //     <ReviewCard
    //         key={index}
    //         source={"BE"}
    //         avatarPrefix={avatarPrefix}
    //         blankAvatar={blankAvatar}
    //         maxReviewContentLength={maxReviewContentLength}
    //         review={review}
    //         avatar_path={review.avatar_path}
    //         author={review.author}
    //         updated_at={review.updated_at}
    //         rating={review.rating}
    //         content={review.content}
    //         parseDateTime={parseDateTime}
    //         parseSanitizeHTML={parseSanitizeHTML}
    //         handleReadMoreClick={handleReadMoreClick}
    //     />
    // )

    function parseDateTime(dateTime){
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric'
          };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTime)).replace(",", " - ")
    }

    function parseSanitizeHTML(string){
        return parse(sanitizeHtml(string))
    }

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

    return(
        <>
            <div className="reviewSectionA">
                <div className="reviewColumnA">
                    
                </div>
                <div className ="Review-Movie">
                    {/* {review.length === 0 && reviewBE.length === 0? */}
                    {review.length === 0 ?
                        <ReviewCard
                            source={"EmptyCard"}
                            avatarPrefix={avatarPrefix}
                            blankAvatar={blankAvatar}
                            maxReviewContentLength={maxReviewContentLength}
                            avatar_path={null}
                            author={""}
                            updated_at={Date()}
                            rating={5}
                            content={"Be the first to leave a Review!"}
                            parseDateTime={parseDateTime}
                            parseSanitizeHTML={parseSanitizeHTML}
                        />
                    :
                        <>  
                            {review}
                            {/* {reviewBE} */}
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
                    BASE_URL_BACK={BASE_URL_BACK}
                    movie={movie}
                    parseDateTime={parseDateTime}
                    parseSanitizeHTML={parseSanitizeHTML}
                    cookies={cookies}
                    isLoggedIn={isLoggedIn}
                    
                /> 
            : null}
        </>
    )
}
export default Review