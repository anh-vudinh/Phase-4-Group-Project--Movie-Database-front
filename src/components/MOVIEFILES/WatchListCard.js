import React from "react";


function WatchListCard({watchListCardObj, poster_prefixURL, broken_path, handleDelete, setMovie, setTogglePage2, setMovieID}){
    const {backdrop_path, vote_average, title, release_date, id} = watchListCardObj

    return (
        <div className ="watchListCard"
        >
            <img className="watchListCardBackground" src={backdrop_path === null? broken_path: `${poster_prefixURL}${backdrop_path}`} alt={title} />
            <div className="watchListCardText" onClick={() => {
                setTogglePage2(true)
                setMovieID(id)
            }}>
                <span className="watchListCardTitleSpan">{`${title} (${release_date.slice(0,4)})`}</span>
                <span className="watchListCardRatingSpan">         
                    <button className={vote_average < 1? "watchListCardRatingLess10" : "watchListCardRating"}
                    style={{
                        borderColor: (vote_average*10) === 50? `rgb(255,255,0)` 
                        : (vote_average*10) < 50? `rgb(255,${255*((vote_average*10)/50)},0)` 
                        : `rgb(${255*(1-(vote_average*10)/100)},255,0)`,
                        color: (vote_average*10) === 50? `rgb(255,255,0)` 
                        : (vote_average*10) < 50? `rgb(255,${255*((vote_average*10)/50)},0)` 
                        : `rgb(${255*(1-(vote_average*10)/100)},255,0)`
                    }}
                    >
                            {vote_average * 10}
                    </button>
                </span>
            
            </div>
            
            <button onClick={()=> handleDelete(id)} className="watchListCardDelete">Remove</button>
            
        </div>
    )
}


export default WatchListCard