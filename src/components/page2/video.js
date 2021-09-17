import React from "react"



function Video({linkID}){
    //const youtubeTrailer_prefixURL = "https://www.youtube.com/watch?v="
    //const [movieKey, setMovieKey] = useState([])
    // <iframe width="1142" height="642" src="https://www.youtube.com/embed/LRMTr2VZcr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    return (<iframe 
    width="800" 
    height="500" 
    src={`https://www.youtube.com/embed/${linkID}`}
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

    </iframe>)

}

export default Video