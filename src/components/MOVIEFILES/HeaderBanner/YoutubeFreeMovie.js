import React, {useEffect, useState} from "react";
import youtubelogo from "../../../assets/youtubelogo.png"

function YoutubeFreeMovie({movie, setMovieArray}){
    const {title, release_date} = movie
    const youtubeAPIURL = "https://www.googleapis.com/youtube/v3/search"
    const youtubeAPIKey = "AIzaSyBZFkxNgDZ1T0TJjmYe7Mr4KzXfaI11slc"          //both api keys are valid, youtube has a 100 query limit per day so alternate if one is maxed for the day
    //const youtubeAPIKey = "AIzaSyAOiv8mStM1qbCxD9RXTey75e333JrGpFc"
    const freeMoviesChannelID = "UCuVPpxrm2VAgpH3Ktln4HXg"
    const [toggleShowYTBtn, setToggleShowYTBtn] = useState(false)
    const [storedYTMovieLink, setStoredYTMovieLink] = useState([])

    useEffect(()=>{
        if(movie.id !== undefined){
            fetch(`${youtubeAPIURL}?part=snippet&channelId=${freeMoviesChannelID}&maxResults=1&q="${release_date.slice(0,4)}"+intitle:"${title.replaceAll(" ","%20").toLowerCase()}"&type=video&videoType=movie&key=${youtubeAPIKey}`)
            .then(resp => resp.json())
            .then(dataArray => {
                if(dataArray.pageInfo !== undefined){
                    if(dataArray.pageInfo.totalResults > 0){
                        setToggleShowYTBtn(true)
                        setStoredYTMovieLink(dataArray)
                    }else{
                        setToggleShowYTBtn(false)
                    }
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    function handleOnClick(){
        setMovieArray(
            [{  id: storedYTMovieLink.etag,
                key: storedYTMovieLink.items[0].id.videoId
            }]
        )
    }

    return(
        <div className="youtubeFreeMovieLogo">
            {toggleShowYTBtn? <img src={youtubelogo} alt="youtube logo" onClick={handleOnClick}/> : null}
        </div>
    )
}

export default YoutubeFreeMovie;

//https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuVPpxrm2VAgpH3Ktln4HXg&maxResults=1&q=bedazzled&type=video&videoType=movie&key=[YOUR_API_KEY]