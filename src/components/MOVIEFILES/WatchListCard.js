import React from "react";


function WatchListCard({watchListCardObj, setIsWatchedMP2C, BASE_URL_BACK, deleteWLDataFromDB, sessionToken, poster_prefixURL, broken_path, setTogglePage2, setMovieID}){
    
    // ! Take note that our database keys are different from TMDB keys 
    const {movie_backdrop, movie_rating, movie_name, movie_year, movie_id} = watchListCardObj

    function handleWLCardClick(){
        setTogglePage2(true)
        setMovieID(movie_id)
        setIsWatchedMP2C(true)
    }

    function handleDeleteWLCClick(){
        deleteWLDataFromDB({movie_id: movie_id, token: sessionToken}, `${BASE_URL_BACK}watchlistcards/deleteWLC`)
    }

    return (
        <div className ="watchListCard">
            <img className="watchListCardBackground" src={movie_backdrop === null? broken_path: `${poster_prefixURL}${movie_backdrop}`} alt={movie_name} />
            <div className="watchListCardText" onClick={handleWLCardClick}>
                <span className="watchListCardTitleSpan">{`${movie_name} (${movie_year.slice(0,4)})`}</span>
                <span className="watchListCardRatingSpan">         
                    <button className={movie_rating < 1? "watchListCardRatingLess10" : "watchListCardRating"}
                    style={{
                        borderColor: (movie_rating*10) === 50? `rgb(255,255,0)` 
                        : (movie_rating*10) < 50? `rgb(255,${255*((movie_rating*10)/50)},0)` 
                        : `rgb(${255*(1-(movie_rating*10)/100)},255,0)`,
                        color: (movie_rating*10) === 50? `rgb(255,255,0)` 
                        : (movie_rating*10) < 50? `rgb(255,${255*((movie_rating*10)/50)},0)` 
                        : `rgb(${255*(1-(movie_rating*10)/100)},255,0)`
                    }}
                    >
                            {movie_rating * 10}
                    </button>
                </span>
            </div>
            <button className="watchListCardDelete" onClick={handleDeleteWLCClick}>Remove</button> 
        </div>
    )
}


export default WatchListCard