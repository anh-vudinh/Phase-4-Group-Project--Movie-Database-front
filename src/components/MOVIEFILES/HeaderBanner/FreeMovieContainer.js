import React, {useState} from "react"
import CrackleIcon from "./CrackleIcon"
import CrackleVideo from "./CrackleVideo"
import YoutubeIcon from "./YoutubeIcon"
import extraMovieIcon from "../../../assets/extraMoviesIcon.png"

function FreeMovieContainer({movie, setMovieArray, enableCrackleVideo, enableYoutubeVideo}){

    const [showExtraMovieContainer, setShowExtraMovieContainer] = useState(false)
    const [extraMovieWarning, setExtraMovieWarning] = useState(false)
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                  BEGIN Crackle Section               ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
    const [videoLink, setVideoLink] = useState(undefined)
    const [showCrackleVideo, setShowCrackleVideo] = useState(false)
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                    END Crackle Section               ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

    function handleOnClick4Dots(){
        setShowExtraMovieContainer(!showExtraMovieContainer)
    }

    return(
        <div className = "freeMovieContainer">
            <CrackleVideo
                videoLink={videoLink}
                showCrackleVideo={showCrackleVideo}
                setShowCrackleVideo={setShowCrackleVideo}
            />

            <div className="extraMovieIcon" onClick={handleOnClick4Dots}>
                <img src={extraMovieIcon} alt="extraMoviesIcon"/>
                <p className={extraMovieWarning? "extraMovieCounter" : "hidden"}> ! </p>
            </div>

            <div className="extraMovieContainer">
                {enableCrackleVideo?
                    <CrackleIcon
                        movie={movie}
                        showCrackleVideo={showCrackleVideo}
                        videoLink={videoLink}
                        showExtraMovieContainer={showExtraMovieContainer}
                        setVideoLink={setVideoLink}
                        setShowCrackleVideo={setShowCrackleVideo}
                        setShowExtraMovieContainer={setShowExtraMovieContainer}
                        setExtraMovieWarning={setExtraMovieWarning}
                    />
                : null}

                {enableYoutubeVideo?
                    <YoutubeIcon
                        movie={movie}
                        setMovieArray={setMovieArray}
                        showExtraMovieContainer={showExtraMovieContainer}
                        setExtraMovieWarning={setExtraMovieWarning}
                    />
                : null}
            </div>
        </div>
    )
}

export default FreeMovieContainer;