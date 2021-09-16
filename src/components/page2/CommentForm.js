import React,{useState} from "react";
import blankAvatar from "../../assets/blankAvatar.jpg"

function CommentForm({reviewsArray, setReviewsArray, movie}){
    console.log("inside CommentForm",reviewsArray)
    
    const defaultName ="Default Name"
    const username = "DefaultUsername"
    

    const [newRating, setNewRating] = useState("")
    const [newContent, setNewContent] = useState("")
    function handleSubmit(e){
    
        e.preventDefault()
        const newData = {
            id:movie.id,
            results:[{
                author: defaultName,
                content: "",
                created_at:  `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
                author_details : {
                    rating: newRating,
                    avatar_path: null,
                    username:username
                }
            }]
        }
        console.log("this is data",newData.results)
      
       
        setReviewsArray([...reviewsArray, newData.results])
    }
    
    return(
        <div className="CommentForm">
            <form onSubmit={handleSubmit}>
                <input type='number'name="rating" onChange={(e)=>setNewRating(e.target.value)} value={newRating}></input>
                <input type='text' name="content" onChange={(e)=>setNewContent(e.target.value)} value={newContent}></input>
                <input type="submit"></input>
            </form>
            
        </div>
    )
}




export default CommentForm