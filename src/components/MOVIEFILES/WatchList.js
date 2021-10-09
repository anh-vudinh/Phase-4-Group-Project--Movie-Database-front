import React, {useState} from "react";
import WatchListCard from "./WatchListCard";
import eyeballIcon from "../../assets/watchListEyeballIcon.png"
function WatchList({setWatchListArray, watchListArray, poster_prefixURL, broken_path, setMovie, setTogglePage2, setMovieID}){
    
    const [toggleShowWatchList, setToggleShowWatchList] = useState(false)
    const [watchListPos, setWatchListPos] = useState([1700,122]) // [X,Y]

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

    function handleOnClickToggleWatchlist(e){
        setToggleShowWatchList(!toggleShowWatchList)
    }

    function handleOnDragEndWLIcon(e){
        setWatchListPos([e.pageX-(e.target.scrollWidth/2), e.pageY-(e.target.scrollHeight/2)])
    }

    return(
        <>
            <div className={toggleShowWatchList? "watchListToggleContainerHide" : "watchListToggleContainerShow"} onDragEnd={handleOnDragEndWLIcon} onClick={handleOnClickToggleWatchlist} draggable="true"
                style={{top:`${watchListPos[1]}px`, left:`${watchListPos[0]}px`}}>
                    <p>{toggleShowWatchList? "Hide Watchlist" : ""}</p>
                    <img className="watchListToggleImage" src={eyeballIcon} alt="eyeballicon"/>
                    <div className="watchListToggleCounter">{watchListArray.length}</div>
            </div>
            <div className={toggleShowWatchList && watchListArray.length > 0? "watchListContainer": "hidden" } 
                style={{top:`${watchListPos[1]+50}px`, left:`${watchListPos[0]-280}px`}}> 
                    {toggleShowWatchList? watchListItem : null}
            </div>
        </>
    )
}

export default WatchList