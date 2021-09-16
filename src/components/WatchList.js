import react from "react";
import WatchListCard from "./WatchListCard";

function WatchList({setWatchListArray, watchListArray, poster_prefixURL, broken_path}){
    
    const watchListItem = watchListArray.map(watchListCardObj => 
        <WatchListCard key={watchListCardObj.id} watchListCardObj={watchListCardObj} poster_prefixURL={poster_prefixURL} broken_path={broken_path} />
    )


    return(

        <div className={watchListItem.length > 0? "watchListContainer": "hidden" }> 
            
            {watchListItem}
        </div>
    


    )}


export default WatchList