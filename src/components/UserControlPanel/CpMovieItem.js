import React from "react";
import parseDate from "../functions/parseDate"

function CpMovieItem({movie,handleMovieClick, poster_prefixURL}) {
    
    const {movie_backdrop, movie_name, movie_year} = movie
  
    function handleCheckBoxClick(e){
        handleMovieClick(movie, e.target.checked)
    }

    return (
        <div className="movieItem">
            <div className="movieItemImg">
                <img src={`${poster_prefixURL}${movie_backdrop}`} alt="movie poster"/>
            </div>
            <div className="movieItemText">
                <p>{`${movie_name} (${parseDate(movie_year).slice(-4)})`}</p>
            </div>
            <div className="movieItemCB">
                <input type="checkbox" onChange={handleCheckBoxClick}/>
            </div>
        </div>
    )
    
}


export default CpMovieItem;