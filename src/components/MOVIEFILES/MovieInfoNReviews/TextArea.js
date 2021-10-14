import React, { useState } from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

function TextArea(){
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
    function handleSubmit(){
        const textToSave = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(JSON.stringify(textToSave.toString()))
    }
    
    return(
        <>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(e)=> setEditorState(e)}
            />
            <button className="reviewFormSubmitButton" onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default TextArea