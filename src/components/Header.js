import React, {useState} from "react";
import { useEffect } from "react/cjs/react.development";

function Header({apiKey, apiUrl, totalPagesCount, moviesDataLength}){
    const [movie, setMovie]= useState([])
    const randomMovieIndex = Math.floor(Math.random() * moviesDataLength)
    const headerPageNumber = Math.floor(Math.random() * totalPagesCount)

    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

    useEffect(()=>{
        fetch(`${apiUrl}popular?api_key=${apiKey}&page=${headerPageNumber}`)
        .then(res => res.json())
        .then(randomMovie => setMovie(randomMovie.results[randomMovieIndex])
        )
    },[])

    console.log(movie)

    return(
        <>
            <div id="headerBanner" style={{backgroundImage: `url(${poster_prefixURL}${movie.backdrop_path})`}}></div>
            <div id="headerImageContainer"><img id="headerImage" src={`${poster_prefixURL}${movie.poster_path}`}></img></div>
        </>

    )

}

export default Header