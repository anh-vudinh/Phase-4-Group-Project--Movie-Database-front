import React,{useState} from "react";

function CommentForm({reviewsArray, setReviewsArray, movie}){
    const defaultName ="Default Name"
    const username = "DefaultUsername"
    const [newReviewRating, setNewReviewRating] = useState("")
    const [newReviewContent, setNewReviewContent] = useState("")
    function handleSubmit(e){
        const date = `${new Date().toISOString()}`
        e.preventDefault()
        const newData = {
            id:movie.id,
            results:{
                id:`${reviewsArray.length + 1}`,
                author: defaultName,
                content: newReviewContent,
                updated_at: date,
                author_details : {
                    rating: parseInt(newReviewRating),
                    avatar_path: null,
                    username:username
                }
            }
        }

        setReviewsArray([...reviewsArray, newData.results])
        setNewReviewRating("")
        setNewReviewContent("")
    }
    return(
        <div className="CommentForm">
            <form onSubmit={handleSubmit}>
                <input className="ratingInput" type='number' max="10" name="rating" placeholder="Rating / ⭐" onChange={(e)=>setNewReviewRating(e.target.value)} value={newReviewRating}></input>
                <textarea className="contentInput" type='text' name="content" placeholder="Tell Us Your Thoughts..." onChange={(e)=>setNewReviewContent(e.target.value)} value={newReviewContent}></textarea>
                <input className="reviewFormSubmitButton" type="submit"></input>
            </form>
        </div>
    )
}
export default CommentForm