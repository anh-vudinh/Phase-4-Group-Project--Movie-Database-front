import React, { useState } from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function TextArea(){
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
    function handleSubmit(){
        const textToSave = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    
    return(
        <div className="textAreaContainer">
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(e)=> setEditorState(e)}
            />
            <button className="reviewFormSubmitButton">Submit</button>
        </div>
    )
}

export default TextArea