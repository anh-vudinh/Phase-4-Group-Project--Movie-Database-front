import React, {useState} from "react";
import eyeballicon from "../../../assets/eyeballicon.png"
import eyeballClosedicon from "../../../assets/eyeballClosedicon.png"

function MovieCard({apiKey, apiPrefixURL, genreTitle, setGenreTitle, yearTitle, setYearTitle, setStartModalTimer, setMovieCardModalPosition, setModalMovieID, movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray, setMovie, setTogglePage2, setGenresList}){
    
    const {title, poster_path, release_date, id} = movie
    const [isWatched, setIsWatched] = useState(false)
    const movieCardModalWidth = 275

    function handleCardImageClick(){                                // this fetch is specifically to pull the full data of selected movie
            fetch(`${apiPrefixURL}movie/${id}?api_key=${apiKey}`)   // after image is clicked, because the movieCards do not provide full data
            .then(res =>res.json())                                 // header details rely on the full data
            .then(fullMovieData => {
                setMovie(fullMovieData)                             // this changes the data stored in movie state, Header component, and Videos rely on this data, possibly all components
                setGenresList(fullMovieData.genres)                 // feeds genreslist to header
            })
            setTimeout(()=> {setTogglePage2(true)}, 170)            // enables the MoviePage2Container, disables MovieList
            setYearTitle({...yearTitle, extTitle:""})               // resets title of year mainCategory
            setGenreTitle({...genreTitle, extTitle:""})             // resets title of genre mainCategory
    }

    function handleWatchListAddClick(){
        switch(watchListArray.length){                              // checks to see if movie is allowed to be added into watchlist
            case 0:{                                                // handles adding the first movie into an empty watchlist
                setWatchListArray([...watchListArray, movie])       
                setIsWatched(true)
                break;
            }
            default:{                                               // checks to see if the movie.id to add matches any movie ids currently in the watchlist, if return false then add clicked movie
                if(watchListArray.find(watchListItem => watchListItem.id === movie.id)  === undefined){
                    setWatchListArray([...watchListArray, movie])
                    setIsWatched(true)
                }
            }
        }
    }

    function handleCardImageHover(e, movie){
        const movieCardsContainerWidth = document.querySelector(".movieCardsContainer").clientWidth                         // checks to see if modal will go off screen
        if(movieCardModalWidth + (e.target.offsetParent.offsetLeft + e.target.width) > movieCardsContainerWidth){           // and adjust whether modal populates to the left or righ tof the movie image
            //position modal to the left
            setMovieCardModalPosition([(e.target.offsetParent.offsetLeft - 300), 
                (e.target.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetParent.offsetTop - 10)])
        }else{
            //position modal to the right
            setMovieCardModalPosition([(e.target.offsetParent.offsetLeft + e.target.width), 
                (e.target.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetParent.offsetTop - 10)])
        }
        setModalMovieID(movie.id)       // shares the movieID with the modal Component
        setStartModalTimer(true)        // toggles useState to start useEffect() in MovieList
    }
    
    function handleMouseLeave(){        // when users leaves the cardImage, toggle the Movielist.useEffect() to land in first else statement to remove modal
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