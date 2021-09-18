import React from "react";
import eyeballicon from "../../../assets/eyeballicon.png"
function MovieCard({apiKey, movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray, setMovie, setTogglePage2, setGenresList, setToggleHeaderInfo}){
    const {title, poster_path, release_date, id} = movie

    function handleCardImageClick(){
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        .then(res =>res.json())
        .then(fullData => {
            setMovie(fullData)
            setGenresList(fullData.genres)
        })
        //setToggleHeaderInfo(true)
        setTimeout(()=>{setTogglePage2(true)},150)
    }

    function handleWatchListAddClick(){
        //add function to find match? if any matches dont allow add to watchlists
        switch(watchListArray.length){
            case 0:{
                setWatchListArray([...watchListArray, movie])
                break;
            }
            default:{
                if(watchListArray.find(element => element.id === movie.id)  === undefined){
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
                    <>
                        <p className="cardText">{`${title}`}<span className="cardDate">{release_date === undefined ? "No Release Date" : ` (${release_date.slice(0,4)})`}</span></p>
                    </>
                }  
            </div>
        </div>
    )
}


export default MovieCard