import React,{useEffect} from "react";
import { useState } from "react/cjs/react.development";

function Header({totalPages, apiKey, apiUrl}){
    const [randomMovieID, setRandomMovieID] = useState(0)
    const [movie, setMovie]= useState(null)
    const randomMovieIndex = Math.floor(Math.random()*19)
    //const pageNumber = Math.floor(Math.random()*`${parseInt(totalPages)}`)
    console.log(Math.floor(Math.random()*`${parseInt(totalPages)}`))

    useEffect(() => {
        fetch(`${apiUrl}popular?api_key=${apiKey}&page=${pageNumber}`)
        .then(res=> res.json())
        .then(randomMovie => {
            // randomMovie.success !== false || parseInt(randomMovie.id) === randomMovieID? setMovie(randomMovie) : setRandomMovieID(Math.floor(Math.random()*`${parseInt(totalResults)}`))
            console.log(randomMovie)
            console.log(pageNumber)

        })
    }
    ,[randomMovieID])

    

    return(
        <>
        </>

    )

}

export default Header