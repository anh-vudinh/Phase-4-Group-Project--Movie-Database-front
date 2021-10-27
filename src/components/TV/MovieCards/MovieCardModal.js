import React from "react";

function MovieCardModal({movieCardModalPosition, movieCardModalDetails, toggleMovieCardModal, startModalTimer}){
    const {vote_average, overview, genres, status} = movieCardModalDetails
    const genresItems = genres !== undefined? genres.map((genre,index) => <p key={index} className="movieCardModalGenresItem">{genre.name}</p>) : null

    return(
        <>
            {movieCardModalDetails.overview !== undefined?                                  // prevents page from error on pageload because no movie is set to modal yet
                <div className={toggleMovieCardModal? startModalTimer? "movieCardModalContainer fade-in" : "hidden" : "movieCardModalContainer"} style={{left: `${movieCardModalPosition[0]}px`, top: `${movieCardModalPosition[1]}px`}}>
                    <div className="movieCardModalDetails">
                        <div className="movieCardModalHeader">
                            <p>{status}</p>
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
            : null}
        </>
    )
}

export default MovieCardModal