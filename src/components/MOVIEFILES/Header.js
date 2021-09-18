import React, {useEffect} from "react";
import Trailer from "./page2/Trailer";
import informationIcon from "../../assets/informationIcon.png"
import languageBubble from "../../assets/languageBubble.png"
import wwwLinkIcon from "../../assets/wwwLinkIcon.png"

function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength, poster_prefixURL, setSuffix, setmovieCateogry, broken_path, setMovie, movie, toggleHeaderInfo, setToggleHeaderInfo, togglePage2, setTogglePage2, genresList, setGenresList, movieID, setMovieID}){

    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    const headerPageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    const alternatingLink = typeof movieID === "string"? 
        `${apiUrl}${movieID}?api_key=${apiKey}${headerPageNumber}`:`${apiUrl}movie/${movieID}?api_key=${apiKey}`

    const genreLI = genresList.map(listItem => 
    <li key={listItem.name} 
        className="headerGenresLI" 
        onClick={()=> {
            setSuffix(`&with_genres=${listItem.id}`)
            setmovieCateogry("Genres")
            setTimeout(()=> {setTogglePage2(false)}, 120)
            }
        }>  
        {listItem.name} 
    </li>)
    
    useEffect(()=>{
        fetch(alternatingLink)
        .then(res => res.json())
        .then(randomMovieArray => {
            handlePageLoad(randomMovieArray)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movieID])

    function handlePageLoad(randomMovieArray){
        
        if(((movieID === "popular" || movieID ==="movie/popular") && randomMovieArray.results !== undefined)){
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
                <img className={toggleHeaderInfo? "headerDisplayInfoSmall" : "headerDisplayInfoBig"} src= {informationIcon}alt="headerDisplayInfoIcon" onClick={()=> setToggleHeaderInfo(toggleHeaderInfo => !toggleHeaderInfo)}/>
                <img className="headerBannerBackground" src={movie.backdrop_path === null ? broken_path : `https://www.themoviedb.org/t/p/w640_and_h360_multi_faces/${movie.backdrop_path}`} alt={movie.title}></img>
            </div>
            
            <div className={toggleHeaderInfo? "headerImageContainer" : "hidden"}>
                <div className="movie-details">
                <img className="headerImage" src={movie.backdrop_path === null ? broken_path : `${poster_prefixURL}${movie.poster_path}`} alt={movie.title}></img>
                    <h1>{movie.title} 
                        <span style={{fontSize:"22px"}}> ({movie.length !== 0 ? movie.release_date.slice(0,4) : null })</span>
                        <div className="languageContainer">
                            <img className="languageBox" src={languageBubble} alt={movie.original_language}/>
                            <p className="languageText">{movie.original_language !== undefined? movie.original_language.toUpperCase() : ""}</p>
                        </div>
                    </h1>
                    <em>{movie.vote_average}/10⭐ 
                        <span> ({Math.floor(movie.runtime/60)}h {movie.runtime % 60}mins)</span>
                    </em>
                    <p>{movie.overview}</p>
                    <div>Genres: <span><ul className="headerGenresUL">{genreLI}</ul></span></div>
                    <div className="headerStatus"><p>{`${movie.status}`}</p></div>
                    {movie.homepage !== ""? <a href={`${movie.homepage}`} target="_blank" rel="noreferrer"><img className="headerLinkIcon" src={wwwLinkIcon} alt="Homepage Link"/></a> : null}
                </div>
            </div>

            <Trailer movie={movie} togglePage2={togglePage2} apiKey={apiKey}/>
            
        </>

    )

}

export default Header