import React, {useState} from "react";
import WatchListCard from "./WatchListCard";
import eyeballIcon from "../../assets/eyeballicon.png"
function WatchList({setWatchListArray, watchListArray, poster_prefixURL, broken_path, setMovie, setTogglePage2, setMovieID}){
    
    const [toggleShowWatchList, setToggleShowWatchList] = useState(false)

    function handleDelete(id){
        const updateWatchList = watchListArray.filter(movieList => movieList.id !== id)
        setWatchListArray(updateWatchList)
    }

    const watchListItem = watchListArray.map((watchListCardObj, index) => 
        <WatchListCard key={index} 
            watchListCardObj={watchListCardObj} 
            poster_prefixURL={poster_prefixURL} 
            broken_path={broken_path} 
            handleDelete={handleDelete} 
            setMovie={setMovie} 
            setTogglePage2={setTogglePage2} 
            setMovieID={setMovieID}
        />
    )

    function handleOnClickToggleWatchlist(){
        setToggleShowWatchList(!toggleShowWatchList)
    }

    return(
        <>
            <div className={toggleShowWatchList? "watchListToggleContainerHide" : "watchListToggleContainerShow"} onClick={handleOnClickToggleWatchlist}>
                <p>{toggleShowWatchList? "Hide Watchlist" : ""}</p>
                <img className="watchListToggleImage" src={eyeballIcon} alt="eyeballicon"/>
                <div className="watchListToggleCounter">{watchListArray.length}</div>
            </div>
            <div className={toggleShowWatchList && watchListArray.length > 0? "watchListContainer": "hidden" }> 
                {toggleShowWatchList? watchListItem : null}
            </div>
        </>
    )
}

export default WatchList