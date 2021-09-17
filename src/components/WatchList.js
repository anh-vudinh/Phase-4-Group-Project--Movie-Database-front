import React from "react";
import WatchListCard from "./WatchListCard";

function WatchList({setWatchListArray, watchListArray, poster_prefixURL, broken_path, setMovie, setTogglePage2}){
    function handleDelete(id){
        const updateWatchList = watchListArray.filter(movieList => movieList.id !== id)
        setWatchListArray(updateWatchList)
    }
    const watchListItem = watchListArray.map(watchListCardObj => 
        <WatchListCard key={watchListCardObj.id} watchListCardObj={watchListCardObj} poster_prefixURL={poster_prefixURL} broken_path={broken_path} handleDelete={handleDelete} setMovie={setMovie} setTogglePage2={setTogglePage2}/>
    )


    return(

        <div className={watchListItem.length > 0? "watchListContainer": "hidden" }> 
            
            {watchListItem}
        </div>
    


    )}


export default WatchList