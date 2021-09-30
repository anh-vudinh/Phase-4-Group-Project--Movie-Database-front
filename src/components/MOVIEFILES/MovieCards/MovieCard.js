import React, {useState} from "react";
import eyeballicon from "../../../assets/eyeballicon.png"
import eyeballClosedicon from "../../../assets/eyeballClosedicon.png"

function MovieCard({apiKey, apiPrefixURL, setStartModalTimer, setMovieCardModalPosition, setModalMovieID, movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray, setMovie, setTogglePage2, setGenresList}){
    
    const {title, poster_path, release_date, id} = movie
    const [isWatched, setIsWatched] = useState(false)
    const movieCardModalWidth = 275

    function handleCardImageClick(){
            fetch(`${apiPrefixURL}movie/${id}?api_key=${apiKey}`)
            .then(res =>res.json())
            .then(fullMovieData => {
                setMovie(fullMovieData)
                setGenresList(fullMovieData.genres)
            })
            setTimeout(()=> {setTogglePage2(true)}, 170)
    }

    function handleWatchListAddClick(){
        //add function to find match? if any matches dont allow add to watchlists
        switch(watchListArray.length){
            case 0:{
                setWatchListArray([...watchListArray, movie])
                setIsWatched(true)
                break;
            }
            default:{ //checks to see if the movie.id to add matches any movie ids currently in the watchlist, if return false then add clicked movie
                if(watchListArray.find(watchListItem => watchListItem.id === movie.id)  === undefined){
                    setWatchListArray([...watchListArray, movie])
                    setIsWatched(true)
                }
            }
        }
    }

    function handleCardImageHover(e, movie){
        const movieCardsContainerWidth = document.querySelector(".movieCardsContainer").clientWidth                         //checks to see if modal will go off screen
        if(movieCardModalWidth + (e.target.offsetParent.offsetLeft + e.target.width) > movieCardsContainerWidth){
            //position modal to the left
            setMovieCardModalPosition([(e.target.offsetParent.offsetLeft - 300), 
                (e.target.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetParent.offsetTop - 10)])
        }else{
            //position modal to the right
            setMovieCardModalPosition([(e.target.offsetParent.offsetLeft + e.target.width), 
                (e.target.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetParent.offsetTop - 10)])
        }
        // setMouseMovePosition([e.pageY, e.pageX])
        setModalMovieID(movie.id)       //shares the movieID with the modal Component
        setStartModalTimer(true)        //toggles useState to start useEffect() in MovieList
    }
    
    function handleMouseLeave(){
        setStartModalTimer(false)
    }


    return (  
        <div className="movieCard">
            <img className="cardImage" onMouseLeave={handleMouseLeave} onMouseOver={(e)=>handleCardImageHover(e, movie)} onClick={handleCardImageClick} src={poster_path === null ? broken_path : `${poster_prefixURL}${poster_path}`} alt={title}/>
            <img src={isWatched? eyeballicon : eyeballClosedicon} className="eyeBallIcon" alt="eyeBall" onClick={handleWatchListAddClick} />
            <div className="cardTextContainer">
                {title === "" ? "No Title" : 
                    <p className="cardText">{`${title}`}
                        <span className="cardDate">{release_date === undefined ? "No Release Date" : ` (${release_date.slice(0,4)})`}</span>
                    </p>
                }
            </div>
        </div>
    )
}


export default MovieCard