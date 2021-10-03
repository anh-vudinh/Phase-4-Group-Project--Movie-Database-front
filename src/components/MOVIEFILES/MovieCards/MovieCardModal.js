import React, { useEffect } from "react";

function MovieCardModal({movieCardModalPosition, movieCardModalDetails, setOpacityValue, opacityValue}){
    const {runtime, vote_average, overview, genres} = movieCardModalDetails

    const genresItems = genres !== undefined? genres.map((genre,index) => <p key={index} className="movieCardModalGenresItem">{genre.name}</p>) : null

    useEffect(()=>{                                                 // useEffect to increment opacity until modal is fully visible
        if(opacityValue < 1){
            setOpacityValue(opacityValue + 0.032)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[opacityValue])

    return(
        <div className="movieCardModalContainer" style={{left: `${movieCardModalPosition[0]}px`, top: `${movieCardModalPosition[1]}px`, opacity: `${opacityValue}`}}>
            <div className="movieCardModalDetails">
                <div className="movieCardModalHeader">
                    <p>{Math.floor(runtime/60)}h {runtime % 60}mins</p>
                    <p>{vote_average} / 10⭐</p>
                </div>
                <div className="movieCardModalBody">
                    <div className="movieCardModalOverview" style={{fontSize: `${overview.length > 350? overview.length > 470? 12 : 13 : 15}px`}}>
                        <p>{overview}</p>
                    </div>
                    <div className="movieCardModalGenres">
                        {genresItems}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCardModal