import React, {useState, useEffect} from "react";
import WatchListCard from "./WatchListCard";
import eyeballIcon from "../../assets/watchListEyeballIcon.png"
function WatchList({setWatchListArray, watchListArray, poster_prefixURL, broken_path, setMovie, setTogglePage2, setMovieID}){
    
    const [toggleShowWatchList, setToggleShowWatchList] = useState(false)
    const [watchListPos, setWatchListPos] = useState([window.innerWidth*0.93, window.innerHeight*0.10]) // [X,Y]
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      if(toggleShowWatchList){
        if(watchListPos[0]+200 > windowDimensions.width){
            setWatchListPos([windowDimensions.width-200, watchListPos[1]])
        }
      } else{
        if(watchListPos[0]+80 > windowDimensions.width){
            setWatchListPos([windowDimensions.width-80, watchListPos[1]])
        }
      }
      return () => window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowDimensions, toggleShowWatchList]);
  
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
  
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }
    
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