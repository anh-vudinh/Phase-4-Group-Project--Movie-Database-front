import React,{useEffect, useState} from "react";

function Cast({movie, togglePage2, poster_prefixURL, apiKey, blankAvatar}){

    const [movieCastArray, setMovieCastArray] = useState([])
    const [toggleShowMoreCast, setToggleShowMoreCast] = useState(false)

    useEffect(()=>{
        if(movie.id !== undefined){
            setMovieCastArray([])  //reset the array so that we don't have a visual problem where user can see the old array for a split second before it refreshes
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`)
            .then(res=> res.json())
            .then(creditArray => { 
                setMovieCastArray(creditArray.cast)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    const cast = movieCastArray === undefined? null : movieCastArray.map((casts,index) =>
        <div className="castCardContainer" key={index}>
            <img className="castImage" src={casts.profile_path === null ? blankAvatar :`${poster_prefixURL}${casts.profile_path}`} alt={casts.id}/>
            <div className="castName"><p>{casts.name}</p></div>
        </div>
    )

    let isDown = false;
    let startX;
    let scrollLeft;

    function handleMouseDown(){
        const slider = document.querySelector('.castContainer');
        slider.addEventListener('mousedown', (e)=> {
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
        <div className={togglePage2? "castContainer":"hidden"} onMouseDown={(e)=> handleMouseDown(e)}>
            {togglePage2? toggleShowMoreCast? cast : cast.slice(0,11) : null}
            {cast.length < 11? null :
                <button onClick={()=> setToggleShowMoreCast(!toggleShowMoreCast)}>
                    {toggleShowMoreCast? <><p>Show</p> <p>Less...</p></> : <><p>Show</p> <p>More...</p></>}
                </button> 
            }
        </div>
    )
}

export default Cast