import React,{useEffect, useState} from "react";


function Cast({movie, togglePage2, poster_prefixURL, broken_path}){
    //console.log("1",movie)
    const [castArray, setCastArray] = useState([])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=9b9db796275919f97fb742c582ab0008`)
            .then(res=> res.json())
            .then(creditArray => { 
                //console.log("3",creditArray)
                
            setCastArray(creditArray.cast) 
    })},[movie])


    const cast = castArray === undefined? null : castArray.map(casts =>
    <div className="castCardContainer" key={casts.id}>
        <img className="castImage" src={casts.profile_path === null ? broken_path :`${poster_prefixURL}${casts.profile_path}` } alt={casts.id}/>
        <div className="castName">{casts.name}</div>
    </div>)


    return (
        <div className={togglePage2? "castContainer":"hidden"}>
            {togglePage2 === true? cast : false}
        </div>
    )
}



export default Cast