import React, { useState } from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

function TextArea({movie, sessionToken, readMoreArrayBE, setReadMoreArrayBE, readMoreDetails, displayReadMore, reviewsArrayBE, setReviewsArrayBE, BASE_URL_BACK}){
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    function handleSubmit(){
        if(sessionToken === null) return;
        const textToSave = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        submitReviewOrResponse(textToSave)
    }
    
    function submitReviewOrResponse(textToSave){
        if(movie === undefined) return;
        if (displayReadMore){
            const dataToSend = {
                token: sessionToken,
                comment: textToSave,
                movie_id: movie.id,
                movie_name: movie.title,
                review_id: readMoreDetails.id
            }

            const headers = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }

            fetch(`${BASE_URL_BACK}/users/addResponse`, headers)
            .then(resp=> resp.json())
            .then(data=> {
                const {id, author, updated_at, content, avatar_path} = data
                const convertedData = {
                    id: id,
                    author: author,
                    content: content,
                    avatar_path: avatar_path,
                    updated_at: updated_at
                }
                setReadMoreArrayBE([...readMoreArrayBE, convertedData])
            })
        }else{
            const dataToSend = {
                token: sessionToken,
                comment: textToSave,
                movie_id: movie.id,
                movie_name: movie.title,
            }
            
            const headers = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }

            fetch(`${BASE_URL_BACK}/users/addReview`, headers)
            .then(resp=> resp.json())
            .then(data=> {
                const {id, author, updated_at, content, avatar_path, rating} = data
                const convertedData = {
                    id: id,
                    author: author,
                    content: content,
                    avatar_path: avatar_path,
                    rating: rating,
                    updated_at: updated_at
                }
                setReviewsArrayBE([...reviewsArrayBE, convertedData])
                console.log(convertedData)
            })
        }
    }


    return(
        <>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                // toolbarOnFocus
                onEditorStateChange={(e)=> setEditorState(e)}
            />
            <button className="reviewFormSubmitButton" onClick={handleSubmit}>{sessionToken === null? "Log in to Post" : "Submit"}</button>
        </>
    )
}

export default TextArea