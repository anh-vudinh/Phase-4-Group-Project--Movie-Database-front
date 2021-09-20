import React from "react";

function MovieExtraInfo({movie}){
    const {budget, revenue, popularity, production_countries} = movie
    //budget, revenue, popularity, production_countries[0].name
    return(
        <div className="extraMovieInfoContainer">

        </div>
    )
}

export default MovieExtraInfo