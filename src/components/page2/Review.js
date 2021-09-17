import React, {useState, useEffect} from "react";
import blankAvatar from "../../assets/blankAvatar.jpg"
import CommentForm from "./CommentForm";
function Review({movie, togglePage2}){
const [reviewsArray, setReviewsArray] = useState([])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=9b9db796275919f97fb742c582ab0008`)
            .then(res=> res.json())
            .then(reviewsArray => { 
               // console.log("review",reviewsArray)
                setReviewsArray(reviewsArray.results) 
    })},[movie])
    const avatarPrefix ="https://www.themoviedb.org/t/p/w64_and_h64_face"
    const review = reviewsArray === undefined ? null : reviewsArray.map(reviews =>
        <div className="ReviewCardContainer" key={reviews.id}>
            <div className="AuthorProfie">
                <div className="AuthorPicture">
                    <img src={reviews.author_details.avatar_path === null ? blankAvatar : reviews.author_details.avatar_path.includes("http") ? reviews.author_details.avatar_path.slice(1)  : `${avatarPrefix}${reviews.author_details.avatar_path}` }></img>
                    <div className="AuthorName">
                        <p>{reviews.author}</p>
                    </div>
                </div>
                <div className="DateAndRating">
                    <div className="Date">{`${reviews.updated_at.slice(5, 7)}-${reviews.updated_at.slice(8, 10)}-${reviews.updated_at.slice(0, 4)}`}</div>
                    {/* <div className="Date">{reviews.updated_at}</div> */}
                    <div className="Rating">{reviews.author_details.rating} / 10 ⭐ </div>
                </div>
                <div className="ReviewContentContainer">
                    <p className="ReviewContent">{reviews.content}</p>
                </div>
            </div>
        </div>
            )
            console.log("this is reviewArray Data",reviewsArray)
            //console.log(review)
    return(
        <>
        <div className ={togglePage2? "Review-Movie" : "hidden"}>
            {togglePage2? review : null}
        </div>
        <CommentForm reviewsArray={reviewsArray} setReviewsArray={setReviewsArray} movie={movie}/>
        </>
    )
}
export default Review