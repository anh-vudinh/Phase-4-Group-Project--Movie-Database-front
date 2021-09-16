import react,{useEffect, useState} from "react";


function CastCard({movie, togglePage2}){
    
    const [castArray, setCastArray] = useState([])

    //getCastDataArray()
    //let castObject = []
    
    // function getCastDataArray(){
    //         fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=9b9db796275919f97fb742c582ab0008`)
    //         .then(res=> res.json())
    //         .then(creditArray => {
    //             setCastArray(creditArray.cast) 
    //             console.log(creditArray.cast)
    //             //castArray.map(cast => Object.assign([...castObject], cast))
                
    //         })

    // }

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=9b9db796275919f97fb742c582ab0008`)
            .then(res=> res.json())
            .then(creditArray => { console.log(creditArray)
                const cast =togglePage2 === true  ? creditArray.cast.map(casts => console.log(casts)) : null
                setCastArray(cast) 
    })},[])

    //const cast = castArray.map(casts => console.log(casts))

 
    return (
        <div>
            {castArray}
        </div>
    )
}



export default CastCard