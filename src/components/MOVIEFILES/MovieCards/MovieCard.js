import React from "react";
import eyeballicon from "../../../assets/eyeballicon.png"

function MovieCard({apiKey, movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray, setMovie, setTogglePage2, setGenresList}){
    
    const {title, poster_path, release_date, id} = movie

    function handleCardImageClick(){
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        .then(res =>res.json())
        .then(fullMovieData => {
            setMovie(fullMovieData)
            setGenresList(fullMovieData.genres)
        })
        setTimeout(()=> {setTogglePage2(true)}, 120)
    }

    function handleWatchListAddClick(){
        //add function to find match? if any matches dont allow add to watchlists
        switch(watchListArray.length){
            case 0:{
                setWatchListArray([...watchListArray, movie])
                break;
            }
            default:{ //checks to see if the movie.id to add matches any movie ids currently in the watchlist, if return false then add clicked movie
                if(watchListArray.find(watchListItem => watchListItem.id === movie.id)  === undefined){
                    setWatchListArray([...watchListArray, movie])
                }
            }
        }
    }

    return (  
        <div className="movieCard">
            <img className="cardImage" onClick={() => handleCardImageClick()} src={poster_path === null ? broken_path : `${poster_prefixURL}${poster_path}`} alt={title}/>
            <img src={eyeballicon} className="eyeBallIcon" alt="eyeBall" onClick={handleWatchListAddClick} />
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