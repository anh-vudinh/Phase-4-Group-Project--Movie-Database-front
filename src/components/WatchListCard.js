import react from "react";


function WatchListCard({watchListCardObj, poster_prefixURL}){
    const {backdrop_path, vote_average, title, release_date} = watchListCardObj
    return (
        <div className ="watchListCard">
            <img className="watchListCardBackground" src={`${poster_prefixURL}${backdrop_path}`} alt={title}/>
            <div className="watchListCardText">
                <span className="watchListCardTitleSpan">{`${title} (${release_date.slice(0,4)})`}</span>
                <span className="watchListCardRatingSpan">
                        
                    <button className="watchListCardRating">{vote_average * 10}%</button>
                </span>
            </div>
        </div>
    )
}


export default WatchListCard