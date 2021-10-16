import React,{useEffect, useState} from "react";

function Cast({movie, poster_prefixURL, apiKey, apiPrefixURL, blankAvatar,blankAvatarM, blankAvatarF}){

    const numberOfCastToLoad = 10
    const [movieCastArray, setMovieCastArray] = useState([])
    const [toggleShowMoreCast, setToggleShowMoreCast] = useState(false)

    useEffect(()=>{
        if(movie.id !== undefined){
            setMovieCastArray([])  //reset the array so that we don't have a visual problem where user can see the old array for a split second before it refreshes
            fetch(`${apiPrefixURL}movie/${movie.id}/credits?api_key=${apiKey}`)
            .then(res=> res.json())
            .then(creditArray => { 
                setMovieCastArray(creditArray.cast)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])
    
    const cast = movieCastArray === undefined? null : movieCastArray.map((casts, index) =>
        <div className="castCardContainer" key={index}>
            <img className="castImage" alt={casts.id} src={casts.profile_path === null ? 
                casts.gender === 1? blankAvatarF : 
                casts.gender === 0? blankAvatar : blankAvatarM 
                :`${poster_prefixURL}${casts.profile_path}`}/>
            <div className="castName"><p>{casts.name}</p></div>
        </div>
    )

    function handleMouseDown(){
        const slider = document.querySelector('.castContainer');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e)=> {
            e.preventDefault();
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        })
    
        slider.addEventListener('mouseleave', ()=> {
            isDown = false;
            slider.classList.remove('active');
        })
    
        slider.addEventListener('mouseup', ()=> {
            isDown = false;
            slider.classList.remove('active');
        })
    
        slider.addEventListener('mousemove', (e)=> {
            if(!isDown) return; //stop function from running
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX)*2;
            slider.scrollLeft = scrollLeft - walk;
        })
    }

    return (
        <div className={cast.length < numberOfCastToLoad? "castContainer ccshort" : "castContainer"} onMouseDown={(e)=> handleMouseDown(e)}>
            {toggleShowMoreCast? cast : cast.slice(0,numberOfCastToLoad)}
            {cast.length < numberOfCastToLoad? null :
                <button onClick={()=> setToggleShowMoreCast(!toggleShowMoreCast)}>
                    {toggleShowMoreCast? <><p>Show</p> <p>Less...</p></> : <><p>Show</p> <p>More...</p></>}
                </button> 
            }
        </div>
    )
}

export default Cast