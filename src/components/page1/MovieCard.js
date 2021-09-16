import React from "react";

function MovieCard({movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray}){
    const {title, poster_path, release_date} = movie
   
    
    return (  
        <div className="movieCard">
            <img className="cardImage" onClick={()=> setWatchListArray([...watchListArray, movie])} 
            src={poster_path === null ? broken_path   : 

                                        `${poster_prefixURL}${poster_path}`  } alt={title}></img>
            <div className="cardText"><p className="cardReleaseDate">{release_date === "" ? "No Release Date" : release_date}</p></div>
        </div>
    )
}


export default MovieCard