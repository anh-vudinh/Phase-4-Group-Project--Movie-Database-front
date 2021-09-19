import React from "react"

function Video({linkID}){
    return (
        <iframe 
            width="800" 
            height="500" 
            src={`https://www.youtube.com/embed/${linkID}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
    )
}

export default Video