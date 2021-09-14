import React, {useState, useEffect} from "react";

function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength, poster_prefixURL}){
    const [movie, setMovie]= useState([])
    const [movieID, setMovieID] = useState("popular")
    const [genresList, setGenresList] = useState([])
    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    const headerPageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    const alternatingLink = typeof movieID === "string"? `${apiUrl}${movieID}?api_key=${apiKey}${headerPageNumber}`: `${apiUrl}${movieID}?api_key=${apiKey}` 
    const genreLI = genresList.map(listItem => <li key={listItem.name} className="headerGenresLI">{listItem.name}</li>)

    useEffect(()=>{
        fetch(alternatingLink)
        .then(res => res.json())
        .then(randomMovieArray =>  handlePageLoad(randomMovieArray))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movieID])

    function handlePageLoad(randomMovieArray ){     
      if(movieID === "popular"){
        setMovie(randomMovieArray.results[randomMovieIndex])
        setMovieID(randomMovieArray.results[randomMovieIndex].id)       
      }else if (typeof movieID === "number"){
        setMovie(randomMovieArray)
        setGenresList([...randomMovieArray.genres])
        // console.log(randomMovieArray)
      }
    }

    return(
        <>
            <div className="headerBannerContainer">
                <img className="headerBannerBackground" src={`${poster_prefixURL}${movie.backdrop_path}`}></img>
            </div>
            <div id="headerImageContainer">
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