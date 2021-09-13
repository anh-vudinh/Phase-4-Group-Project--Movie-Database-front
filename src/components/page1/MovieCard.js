import React from "react";

function MovieCard({movie}){
    const {title, poster_path, release_date} = movie
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

    return (  
        <div className="movieCard">
            <img className="cardImage" src={`${poster_prefixURL}${poster_path}`} alt={title}></img>
            <div className="cardText"><p className="cardReleaseDate">{release_date}</p></div>
        </div>
    )
}


export default MovieCard