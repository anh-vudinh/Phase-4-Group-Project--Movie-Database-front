import React from "react";
import eyeballicon from "../../assets/eyeballicon.png"
function MovieCard({movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray, setMovie, setTogglePage2}){
    const {title, poster_path, release_date,id} = movie


    function handleCardImageClick(){
        setTogglePage2(true)
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9b9db796275919f97fb742c582ab0008`)
        .then(res =>res.json())
        .then(data => {
            setMovie(data)
           //console.log(data)
        })
      
    }
    
    return (  
        <div className="movieCard">
            <img className="cardImage" onClick={() => handleCardImageClick()}
            src={poster_path === null ? broken_path   : `${poster_prefixURL}${poster_path}`  } alt={title}></img>
            <img src={eyeballicon} className="eyeBallIcon" alt="eyeBall" onClick={()=> setWatchListArray([...watchListArray, movie])} />
            <div className="cardText"><p className="cardReleaseDate">
            {title === "" ? "No Title" : `${title} (${release_date === "" ? "" : release_date.slice(0,4)})`}
                
            </p></div>
        </div>
    )
}


export default MovieCard