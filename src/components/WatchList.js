import react from "react";
import WatchListCard from "./WatchListCard";

function WatchList({setWatchListArray, watchListArray, poster_prefixURL}){
    
    const watchListItem = watchListArray.map(watchListCardObj => 
        <WatchListCard key={watchListCardObj.id} watchListCardObj={watchListCardObj} poster_prefixURL={poster_prefixURL} />
    )


    return(
        <div className="watchListContainer"> 
        
            {watchListItem}
        
        </div>
    


    )}


export default WatchList