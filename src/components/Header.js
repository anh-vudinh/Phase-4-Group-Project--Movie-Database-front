import React, {useState, useEffect} from "react";
import CastCard from "./page2/CastCard";
function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength, poster_prefixURL, setSuffix, setmovieCateogry, broken_path, setMovie, movie, toggleHeaderInfo, setToggleHeaderInfo}){
    // const [movie, setMovie]= useState([])
    const [movieID, setMovieID] = useState("movie/popular")
    const [genresList, setGenresList] = useState([])
    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    const headerPageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    const alternatingLink = typeof movieID === "string"? `${apiUrl}${movieID}?api_key=${apiKey}${headerPageNumber}`:
                                                         `${apiUrl}movie/${movieID}?api_key=${apiKey}` 
    const genreLI = genresList.map(listItem => 
    <li key={listItem.name} 
    className="headerGenresLI" 
    onClick={()=> {setSuffix(`&with_genres=${listItem.id}`)
                  setmovieCateogry("Genres")}}>
                  {listItem.name}
                      
    </li>)
    
    useEffect(()=>{
        fetch(alternatingLink)
        .then(res => res.json())
        .then(randomMovieArray =>  handlePageLoad(randomMovieArray))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movieID])

    function handlePageLoad(randomMovieArray ){
        
      if(movieID === "popular" || movieID ==="movie/popular"){
          //console.log("header",randomMovieArray.results[randomMovieIndex] )
        setMovie(randomMovieArray.results[randomMovieIndex])
        
        setMovieID(randomMovieArray.results[randomMovieIndex].id) 
           
      }else if (typeof movieID === "number" ){
        setMovie(randomMovieArray)
        setGenresList([...randomMovieArray.genres])
         
      }
    }

    return(
        <>
            <div className="headerBannerContainer">
                <img className={toggleHeaderInfo? "headerDisplayInfoSmall" : "headerDisplayInfoBig"} src="https://montgomeryplanning.org/wp-content/uploads/2017/08/info-icon-490x490.png" alt="headerDisplayInfoIcon" onClick={()=> setToggleHeaderInfo(toggleHeaderInfo => !toggleHeaderInfo)}/>
                <img className="headerBannerBackground" src={movie.backdrop_path === null ? broken_path :`${poster_prefixURL}${movie.backdrop_path}`} alt={movie.title}></img>
            </div>
            
            <div className={toggleHeaderInfo? "headerImageContainer" : "hidden"}>
                <div id="movie-details">
                    <h1>{movie.title} 
                        <span style={{fontSize:"22px"}}> ({movie.length !== 0 ? movie.release_date.slice(0,4) : null }) </span>
                    </h1>
                    <em>{movie.vote_average}/10⭐ 
                        <span> ({Math.floor(movie.runtime/60)}h {movie.runtime % 60}mins)</span>
                    </em>
                    <p>{movie.overview}</p>
                    <div>Genres: <span><ul className="headerGenresUL">{genreLI}</ul></span></div>
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