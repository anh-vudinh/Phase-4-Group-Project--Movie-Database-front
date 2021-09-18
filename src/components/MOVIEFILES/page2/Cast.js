import React,{useEffect, useState} from "react";


function Cast({movie, togglePage2, poster_prefixURL, broken_path, apiKey}){

    const [castArray, setCastArray] = useState([])
    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`)
            .then(res=> res.json())
            .then(creditArray => { 
                setCastArray(creditArray.cast) 
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])


    const cast = castArray === undefined? null : castArray.map((casts,index) =>
        <div className="castCardContainer" key={index}>
            <img className="castImage" src={casts.profile_path === null ? broken_path :`${poster_prefixURL}${casts.profile_path}` } alt={casts.id}/>
            <div className="castName">{casts.name}</div>
        </div>
    )


    return (
        <div className={togglePage2? "castContainer":"hidden"}>
            {togglePage2 === true? cast : false}
        </div>
    )
}



export default Cast