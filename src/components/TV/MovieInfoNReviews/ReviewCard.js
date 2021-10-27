import React from "react";

function ReviewCard({avatar_path, review, author, rating, updated_at, parseSanitizeHTML, handleReadMoreClick, content, maxReviewContentLength, source, parseDateTime, blankAvatar, avatarPrefix}){

    return(
        <div className="ReviewCardContainer">
            <div className="reviewSecA">
                <div className="AuthorPicture">
                    <img alt="author" src={avatar_path === null ? blankAvatar : avatar_path.includes("http") ? avatar_path.slice(1)  : `${avatarPrefix}${avatar_path}`}/>
                </div>
                <div className="AuthorName">
                    <p>{author}</p>
                </div>
            </div>
            <div className="reviewSecB">
                <div className="DateAndRating">
                    <div className="Date">{source === "EmptyCard"? null : parseDateTime(updated_at)}</div>
                    <div className="Rating">{rating} / 10 ⭐ </div>
                </div>
                <div className="ReviewContentContainer">
                    <div className="ReviewContent">
                        <br/>
                        <>{parseSanitizeHTML(content.substr(0,maxReviewContentLength))} {content.length < maxReviewContentLength? "" : "....."}</>
                    </div>
                    {/* <div className="readMoreBtnContainer">
                    {source === "EmptyCard"? null :<button className="readMoreBtn" onClick={()=> handleReadMoreClick(review, source)}>Read More</button>}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard