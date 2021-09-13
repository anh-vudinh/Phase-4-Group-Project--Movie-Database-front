import React from "react";

function MovieCard({movie, poster_prefixURL}){
    const {title, poster_path, release_date} = movie

    return (  
        <div className="movieCard">
            <img className="cardImage" src={`${poster_prefixURL}${poster_path}`} alt={title}></img>
            <div className="cardText"><p className="cardReleaseDate">{release_date}</p></div>
        </div>
    )
}


export default MovieCard