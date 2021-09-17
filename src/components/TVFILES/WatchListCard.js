import React from "react";


function WatchListCard({watchListCardObj, poster_prefixURL, broken_path,handleDelete, setMovie, setTogglePage2}){
    const {backdrop_path, vote_average, name, first_air_date, id} = watchListCardObj
    
    return (
        <div className ="watchListCard"  
        >
            <img className="watchListCardBackground" src={backdrop_path === null? broken_path: `${poster_prefixURL}${backdrop_path}`} alt={name} />
            <div className="watchListCardText" onClick={() => {
            setTogglePage2(true)
            setMovie(watchListCardObj)}}>
                <span className="watchListCardTitleSpan">{`${name} (${first_air_date.slice(0,4)})`}</span>
                <span className="watchListCardRatingSpan">         
                    <button className={vote_average < 1? "watchListCardRatingLess10" : "watchListCardRating"}>{vote_average * 10}%</button>
                </span>
            
            </div>
            
            <button onClick={()=> handleDelete(id)} className="watchListCardDelete">Remove</button>
            
        </div>
    )
}


export default WatchListCard