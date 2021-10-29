import React from "react";

function CpSearchItem({movie, broken_path}) {

    const {poster_path, release_date, title} = movie
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face"

    return (
        <div className="cpSearchMovieCard" draggable="true">
            <img className="cpSearchCardImage" src={poster_path === null ? broken_path : `${poster_prefixURL}${poster_path}`} alt={title} title={title}/>
            {/* <img src={isWatched? eyeballicon : eyeballClosedicon} className="eyeBallIcon" alt="eyeBall" onClick={handleWLCToggle} /> */}
            <div className="cpSearchCardTextContainer">
                <p className="cpSearchCardDate">{release_date === undefined ? "No Release Date" : ` (${release_date.slice(0,4)})`}</p>
            </div>
        </div>
    )
}


export default CpSearchItem;