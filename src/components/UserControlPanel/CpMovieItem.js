import React from "react";


function CpMovieItem({movie,handleMovieClick}) {
    const {movie_backdrop, movie_name, movie_year} = movie
  
    
    return (
        <div className="movieItem"  onClick={()=> handleMovieClick(movie)} >
        <p>{movie_name}</p>
        <p>{movie_backdrop}</p>
        <p>{movie_year}</p>
        <input type="checkbox" value={movie} />
        </div>
        )
    
}


export default CpMovieItem;