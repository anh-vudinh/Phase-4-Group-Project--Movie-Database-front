import React, {useState, useEffect} from "react";
import Trailer from "./page2/Trailer";
import informationIcon from "../../assets/informationIcon.gif"
function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength, poster_prefixURL, setSuffix, setmovieCateogry, broken_path, setMovie, movie, toggleHeaderInfo, setToggleHeaderInfo, togglePage2, setTogglePage2}){
    // const [movie, setMovie]= useState([])
    const [movieID, setMovieID] = useState("tv/popular")
    const [genresList, setGenresList] = useState([])
    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    const headerPageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    const alternatingLink = typeof movieID === "string"? 
        `${apiUrl}${movieID}?api_key=${apiKey}${headerPageNumber}`:`${apiUrl}tv/${movieID}?api_key=${apiKey}` 
    const genreLI = genresList.map(listItem => 
    <li key={listItem.name} 
        className="headerGenresLI" 
        onClick={()=> {
            setSuffix(`&with_genres=${listItem.id}`)
            setmovieCateogry("Genres")
            setTogglePage2(false)
            }
        }>
            
        {listItem.name} 
    </li>)
    
    useEffect(()=>{
        fetch(alternatingLink)
        .then(res => res.json())
        .then(randomMovieArray =>  handlePageLoad(randomMovieArray))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movieID])

    function handlePageLoad(randomMovieArray ){
           // console.log(randomMovieArray.results)
        if((movieID === "popular" || movieID ==="tv/popular") && randomMovieArray.results !== undefined){
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
                <img className={toggleHeaderInfo? "headerDisplayInfoSmall" : "headerDisplayInfoBig"} src={informationIcon} alt="headerDisplayInfoIcon" onClick={()=> setToggleHeaderInfo(toggleHeaderInfo => !toggleHeaderInfo)}/>
                <img className="headerBannerBackground" src={movie.backdrop_path === null ? broken_path :`https://www.themoviedb.org/t/p/w640_and_h360_multi_faces/${movie.backdrop_path}`} alt={movie.name}></img>
            </div>
            
            <div className={toggleHeaderInfo? "headerImageContainer" : "hidden"}>
                <div id="movie-details">
                    <h1>{movie.name} 
                        <span style={{fontSize:"22px"}}> ({(movie.length !== 0 && movie !== null && movie !== undefined) ? movie.first_air_date.slice(0,4) : null }) </span>
                    </h1>
                    <em>{movie.vote_average}/10⭐</em>
                    <p>{movie.overview}</p>
                    <div>Genres: <span><ul className="headerGenresUL">{genreLI}</ul></span></div>
                </div>
                
                <img id="headerImage" src={movie.backdrop_path === null ? broken_path : `${poster_prefixURL}${movie.poster_path}`} alt={movie.name}></img>
                
            </div>

            <Trailer movie={movie} togglePage2={togglePage2}/>
            
        </>

    )

}

export default Header





    //const realseYear = movie.first_air_date.slice(0,4)
    //const link = `${apiUrl}${movieID}?api_key=${apiKey}${typeof movieID !== 'number'?headerPageNumber : "" }}`


    // fetch(`${apiUrl}${movieID}?api_key=${apiKey}${typeof movieID !== 'number'? headerPageNumber : "" }}`)