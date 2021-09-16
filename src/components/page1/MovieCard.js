import React from "react";

function MovieCard({movie, poster_prefixURL, broken_path, watchListArray, setWatchListArray, setMovie, setTogglePage2}){
    const {title, poster_path, release_date,id} = movie
    const eyeBallImg= "https://raw.githubusercontent.com/anh-vudinh/Phase-2-Group-Project--Movie-Database/main/assets/eyeball-icon.png"

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
            <img src={eyeBallImg} className="eyeBallIcon" alt="eyeBall" onClick={()=> setWatchListArray([...watchListArray, movie])} />
            <div className="cardText"><p className="cardReleaseDate">{release_date === "" ? "No Release Date" : release_date}</p></div>
        </div>
    )
}


export default MovieCard