import React, {useState} from "react";
import { useEffect } from "react/cjs/react.development";

function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength, poster_prefixURL}){
    const [movie, setMovie]= useState([])
    const [movieID, setMovieID] = useState("popular")
   
    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    
    const headerPageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    
    const link = typeof movieID === "string"? `${apiUrl}${movieID}?api_key=${apiKey}${headerPageNumber}`: `${apiUrl}${movieID}?api_key=${apiKey}` 

    
    useEffect(()=>{
        fetch(link)
        .then(res => res.json())
        .then(randomMovie =>  handlePageLoad(randomMovie))
        

    },[movieID])

    function handlePageLoad(randomMovie){
        
      if(movieID === "popular"){
        setMovie(randomMovie.results[randomMovieIndex])
        setMovieID(randomMovie.results[randomMovieIndex].id)
        
      } else if (typeof movieID === "number"){
        setMovie(randomMovie)
        console.log(randomMovie)
      }
  
    }
    
    return(
        <>
            <div id="headerBanner" style={{backgroundImage: `url(${poster_prefixURL}${movie.backdrop_path})`}}></div>
            
            <div id="headerImageContainer">
                <div id="movie-details">
                    <h1>{movie.title} 
                    <span style={{fontSize:"22px"}}> ({movie.length !== 0 ? movie.release_date.slice(0,4) : null }) </span> </h1>
                    <em>{movie.vote_average}/10⭐ 
                    <span>{movie.runtime}</span>
                    </em>
                    <p>{movie.overview}</p>
                </div>
                
                
                <img id="headerImage" src={`${poster_prefixURL}${movie.poster_path}`} alt={movie.title}></img>
                

            </div>
        </>

    )

}

export default Header





    //const realseYear = movie.release_date.slice(0,4)
    //const link = `${apiUrl}${movieID}?api_key=${apiKey}${typeof movieID !== 'number'?headerPageNumber : "" }}`


    // fetch(`${apiUrl}${movieID}?api_key=${apiKey}${typeof movieID !== 'number'? headerPageNumber : "" }}`)