import React,{useState} from "react";
    
function CommentForm({reviewsArray, setReviewsArray, movie, togglePage2}){
    //console.log("inside CommentForm",reviewsArray)
    const defaultName ="Default Name"
    const username = "DefaultUsername"
    const [newRating, setNewRating] = useState("")
    const [newContent, setNewContent] = useState("")
    function handleSubmit(e){
        const date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
        //console.log(date)
        e.preventDefault()
        const newData = {
            id:movie.id,
            results:{
                author: defaultName,
                content: newContent,
                updated_at: date,
                author_details : {
                    rating: parseInt(newRating),
                    avatar_path: null,
                    username:username
                }
            }
        }
        //console.log("this is data",newData.results)
        setReviewsArray([...reviewsArray, newData.results])
    }
    return(
        <div className={togglePage2? "CommentForm" : "hidden"} >
            <form onSubmit={handleSubmit}>
                <input className="ratingInput" type='number' max="10" name="rating" placeholder="Rating / ⭐" onChange={(e)=>setNewRating(e.target.value)} value={newRating}></input>
                <textarea className="contentInput" type='text' name="content" placeholder="Tell Us Your Thoughts..." onChange={(e)=>setNewContent(e.target.value)} value={newContent}></textarea>
                <input className="reviewFormSubmitButton" type="submit"></input>
            </form>
        </div>
    )
}
export default CommentForm