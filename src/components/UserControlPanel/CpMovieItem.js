import React from "react";
import parseDate from "../functions/parseDate"

function CpMovieItem({movie,handleMovieClick, poster_prefixURL}) {
    
    const {movie_backdrop, movie_name, movie_year} = movie
  
    return (
        <div className="movieItem" onClick={()=> handleMovieClick(movie)} >
            <div className="movieItemImg">
                <img src={`${poster_prefixURL}${movie_backdrop}`}/>
            </div>
            <div className="movieItemText">
                <p>{movie_name}</p>
                <p>({parseDate(movie_year).slice(-4)})</p>
            </div>
            <div className="movieItemCB">
                <input type="checkbox" value={movie}/>
            </div>
        </div>
    )
    
}


export default CpMovieItem;