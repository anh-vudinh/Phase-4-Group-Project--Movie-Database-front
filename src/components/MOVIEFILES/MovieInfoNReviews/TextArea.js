import React, { useState } from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';

function TextArea({movie, sessionToken, readMoreArrayBE, setReadMoreArrayBE, readMoreDetails, displayReadMore, reviewsArrayBE, setReviewsArrayBE, BASE_URL_BACK}){
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    function handleSubmit(){
        if(sessionToken === null) return;
        const textToSave = sanitizeHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        submitReviewOrResponse(textToSave)
    }
    
    function submitReviewOrResponse(textToSave){
        if (displayReadMore){
            const dataToSend = {
                token: sessionToken,
                comment: textToSave,
                movie_id: movie.id,
                movie_name: movie.title,
                review_id: readMoreDetails.id
            }
            sendDataToDB("responses/addResponse", dataToSend)

        }else{
            const dataToSend = {
                token: sessionToken,
                comment: textToSave,
                movie_id: movie.id,
                movie_name: movie.title,
            }
            sendDataToDB("reviews/addReview", dataToSend)
        }
    }

    function sendDataToDB(fetchURL, dataToSend){
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }

        fetch(`${BASE_URL_BACK}${fetchURL}`, headers)
        .then(resp=> resp.json())
        .then(data=> {
            displayReadMore? 
            setReadMoreArrayBE([...readMoreArrayBE, data]) 
            : setReviewsArrayBE([...reviewsArrayBE, data])
        })
    }

    return(
        <>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(e)=> setEditorState(e)}
            />
            <button className="reviewFormSubmitButton" onClick={handleSubmit}>{sessionToken === null? "Log in to Post" : "Submit"}</button>
        </>
    )
}

export default TextArea