import React, {useEffect, useState} from "react";
import youtubelogo from "../../../assets/youtubelogo.png"

function YoutubeIcon({movie, setMovieArray, showExtraMovieContainer, setExtraMovieWarning}){

    const {title, release_date} = movie
    const [toggleShowYTBtn, setToggleShowYTBtn] = useState(false)
    const disableAPICycle = false
    const youtubeSearchURL = "https://www.googleapis.com/youtube/v3/search"
    const freeMoviesChannelID = "UCuVPpxrm2VAgpH3Ktln4HXg"
    const youtubeAPIKeysArray = ["AIzaSyBZFkxNgDZ1T0TJjmYe7Mr4KzXfaI11slc", "AIzaSyAOiv8mStM1qbCxD9RXTey75e333JrGpFc", "AIzaSyCAZ5RwZDLww9K_SkPuOyLcTHhhchQO0-w", "AIzaSyDXr28bhyORGrn9GJOu3oP1qh-wBwiPSJU"]
    const [currentAPIKey, setCurrentAPIKey] = useState(youtubeAPIKeysArray[0])
    const [storedYTMovieLink, setStoredYTMovieLink] = useState([])
    const [toggleRetryFetchCounter, setToggleRetryFetchCounter] = useState(0)
    const [toggleRetryFetch, setToggleRetryFetch] = useState(false)
    const regex = /[^a-z0-9]/gi

    useEffect(()=>{                                         // this useEffect takes the first YT API Key and tries to perform a search on YT Free Movies channel
        if(movie.id !== undefined){                         // if a positive match is returned a YT Btn will be toggled to show to replace the trailer with a full movie to watch
            fetch(`${youtubeSearchURL}?part=snippet&channelId=${freeMoviesChannelID}&maxResults=1&q=${title.replaceAll(" ","%20").toLowerCase()}+${release_date.slice(0,4)}&type=video&videoType=movie&key=${currentAPIKey}`)
            .then(resp => resp.json())
            .then(dataArray => {
                if(dataArray.pageInfo !== undefined){ 
                    if(dataArray.pageInfo.totalResults > 0 && dataArray.pageInfo.resultsPerPage > 0){                                        // successful fetch and movie found
                        const ytTitle = dataArray.items[0].snippet.title.toLowerCase()
                        const indexofYTTitle = ytTitle.indexOf("(")
                        const sliceYearYTTitle = indexofYTTitle === -1? ytTitle : ytTitle.slice(0,indexofYTTitle)
                        const filteredYTTitle = sliceYearYTTitle.replaceAll("&amp;","").replaceAll("and","").replaceAll(regex, "")
                        const filteredDBTitle = movie.title.toLowerCase().replaceAll("and","").replaceAll(regex, "")
                        if(filteredDBTitle === filteredYTTitle){
                            setToggleShowYTBtn(true)                                                    
                            setStoredYTMovieLink(dataArray)
                            setExtraMovieWarning(true)
                        }else{
                            setToggleShowYTBtn(false)
                        }
                    }else{                                                                          // sucessful fetch but movie not found
                        setToggleShowYTBtn(false)
                    }
                }else{                                                                              // if the first search failed due to API key quota maxed, 
                    setToggleShowYTBtn(false)
                    if(!disableAPICycle){cycleAPIKeys(dataArray)}                                   // this else logic will cycle through the available keys until it tries them all once
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie, toggleRetryFetch])

    function cycleAPIKeys(errorArray){
        if(errorArray.error.code === 403){
            if(toggleRetryFetchCounter < youtubeAPIKeysArray.length-1){                             // logic to determine which key is tried
                setCurrentAPIKey(youtubeAPIKeysArray.indexOf(currentAPIKey)+1 < youtubeAPIKeysArray.length? youtubeAPIKeysArray[youtubeAPIKeysArray.indexOf(currentAPIKey)+1] : youtubeAPIKeysArray[0]) 
                setToggleRetryFetchCounter(toggleRetryFetchCounter+1)                               // keeps track of the current API Key being tried
                setTimeout(()=>{setToggleRetryFetch(!toggleRetryFetch)}, 500)                       // prevents the cycler from iterating through the keys too quickly
            }else{                                                                                  // if all YT API keys have been cycled through once and all are maxed, stop cycle
                setToggleRetryFetchCounter(0)
            }
        }
    }

    function handleOnClick(){
        setMovieArray(
            [{  id: storedYTMovieLink.etag,
                key: storedYTMovieLink.items[0].id.videoId
            }]
        )
    }

    return(
        <>
            {toggleShowYTBtn? <img className={showExtraMovieContainer? "youtubeIcon fade-in" : "youtubeIcon"} src={youtubelogo} alt="youtube logo" onClick={handleOnClick}/> : null}
        </>
    )
}

export default YoutubeIcon;

//https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuVPpxrm2VAgpH3Ktln4HXg&maxResults=1&q=bedazzled&type=video&videoType=movie&key=[YOUR_API_KEY]