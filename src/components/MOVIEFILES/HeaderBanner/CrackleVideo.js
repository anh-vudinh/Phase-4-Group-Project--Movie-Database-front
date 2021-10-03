import React from "react"
import x from "../../../assets/X.png"

function CrackleVideo({videoLink, showCrackleVideo, setShowCrackleVideo}){

    return(
        <div className={showCrackleVideo? "crackleUnderlay" : "hidden"} onClick={()=>setShowCrackleVideo(!showCrackleVideo)}>
            <div className={showCrackleVideo? "crackleIFrameContainer" : "hidden"}>
                <iframe 
                    className="crackleIFrame"
                    width="800" 
                    height="500" 
                    scrolling="no"
                    src={`https://www.crackle.com/watch/${videoLink}`}
                    title="Crackle video player" 
                    frameBorder="0" 
                    allow="accelerometer; encrypted-media; autoplay;" allowFullScreen>
                </iframe>
            </div>
            <img className="crackleExitUnderlay" 
                src={x}
                alt="x"
            />
        </div>
    )
}

export default CrackleVideo;