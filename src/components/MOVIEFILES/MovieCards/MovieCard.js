import React, {useState, useEffect} from "react";
import eyeballicon from "../../../assets/eyeballicon.png"
import eyeballClosedicon from "../../../assets/eyeballClosedicon.png"

function MovieCard({apiKey, moviesData, setIsWatchedMP2C, onLogOut, setOnLogOut, toggleEyeballRefresh, sessionToken, watchListArray, handleWatchListAddClick, apiPrefixURL, genreTitle, setGenreTitle, yearTitle, setYearTitle, setStartModalTimer, setMovieCardModalPosition, setModalMovieID, movie, poster_prefixURL, broken_path, setMovie, setTogglePage2, setGenresList}){
    const {title, poster_path, release_date, id} = movie
    const [isWatched, setIsWatched] = useState(false)
    const movieCardModalWidth = 280

    useEffect(()=>{
        if(onLogOut === 0){                                         // switches all eyes to "not watched", only runs once after log out
            setIsWatched(false)
            setOnLogOut(onLogOut => onLogOut+1)
        }
        if(sessionToken === null) return;                           // if no one is logged in, it will block the next line of code from running. Helps save unregistered clients processing power
        setIsWatched(watchListArray.find(movie => movie.movie_id === id) === undefined? false : true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[toggleEyeballRefresh, sessionToken])

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
            setIsWatchedMP2C(isWatched)                             // passes out variable for MoviePage2Container.js
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

    function handleWLCToggle(){
        if(sessionToken === null) return;
        handleWatchListAddClick(movie, isWatched)
        setIsWatched(isWatched => !isWatched)
    }

    return (  
        <div className="movieCard">
            <img className="cardImage" onMouseLeave={handleMouseLeave} onMouseOver={(e)=>handleCardImageHover(e, movie)} onClick={handleCardImageClick} src={poster_path === null ? broken_path : `${poster_prefixURL}${poster_path}`} alt={title}/>
            <img src={isWatched? eyeballicon : eyeballClosedicon} className="eyeBallIcon" alt="eyeBall" onClick={handleWLCToggle} />
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