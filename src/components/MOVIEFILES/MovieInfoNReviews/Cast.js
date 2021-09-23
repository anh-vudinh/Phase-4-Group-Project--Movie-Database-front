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

    const ele = document.getElementsByClassName('castContainer')
    ele.scrollTop = 100;
    ele.scrollLeft = 150;

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e) {
        console.log(e)
        pos = {
            // The current scroll 
            left: ele.scrollLeft,
            // top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    const mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
    
        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function() {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };

    return (
        <div className={togglePage2? "castContainer":"hidden"} onMouseDown={()=> mouseDownHandler}>
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