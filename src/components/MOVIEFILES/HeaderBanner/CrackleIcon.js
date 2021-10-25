import React, {useEffect} from "react"
import crackleIcon from "../../../assets/crackleIcon.png"

function CrackleIcon({movie, setStartCrackleVideo, startCrackleVideo, showExtraMovieContainer, videoLink, setVideoLink, setShowCrackleVideo, setShowExtraMovieContainer, setExtraMovieWarning}){
    const {title, release_date} = movie
    const crackleDB = "http://localhost:9292/crackles/"

    useEffect(()=>{                                                         // checks the crackle DB stored in file for movies of the same name
        setVideoLink(undefined)                                             // reset videolink to default state
        setShowExtraMovieContainer(false)                                   // reset extramoviecontainer to hidden, master controller
        setExtraMovieWarning(false)                                         // reset warning to false, master controller
        
        if(movie.id !== undefined){
            const headers = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: title, release_year: release_date.slice(0,4)})
            }
    
            fetch(`${crackleDB}getMovie`, headers)
            .then(resp => resp.json())
            .then(data => {
                if (data === null){                                         // puts all the crackle data into an array
                    return setShowCrackleVideo(false)
                }else{
                    setVideoLink(data.c_id)    
                    setExtraMovieWarning(true)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    
    function handleIconClick(){
        if(startCrackleVideo === false){                                    //makes it so that crackle video persists until user chooses a new video without resetting video to very beginning
            setStartCrackleVideo(true)
            setShowCrackleVideo(true)
        }else{
            setShowCrackleVideo(true)
        }
    }

    return(
        <>
            {videoLink === undefined? null : 
                <img className={showExtraMovieContainer? "crackleIcon fade-in" : "crackleIcon"}
                    src={crackleIcon} 
                    onClick={handleIconClick} 
                    alt="crackleIcon"
                />
            }
        </>
    )
}

export default CrackleIcon;


//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Crackle DATAPULL FROM API            ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

// import xmlToJson from "../../functions/xml2json"
// import sleep from "../../functions/sleep"

// const [pageNumberCrackle, setPageNumberCrackle] = useState(1)
// const [maxPageNumberCrackle, setMaxPageNumberCrackle] = useState(0)
// const [holderArray, setHolderArray] = useState([])

// useEffect(()=>{
//     return;
//     fetch(`https://web-api-us.crackle.com/Service.svc/browse/movies/all/all/alpha-asc/US/20/${pageNumberCrackle}`)
//     .then(resp => resp.text())
//     .then(str => new DOMParser().parseFromString(str, "text/xml"))
//     .then(data => {
//         const fetchData = async () => {
//             const xxx = xmlToJson(data)
//             if(pageNumberCrackle > maxPageNumberCrackle){
//                 setMaxPageNumberCrackle(parseInt(Object.values(xxx.BrowseDetails.PageResult.TotalPages)[0]))
//             } 
//             console.log(`fetching page: ${pageNumberCrackle} of ${maxPageNumberCrackle}`)
//             if(xxx.BrowseDetails.Entries.BrowseItem !== undefined && pageNumberCrackle <= maxPageNumberCrackle){
//                 xxx.BrowseDetails.Entries.BrowseItem.map((element, index) => {
//                         console.log(`added item ${index+1}`)
//                         const convertedData = {
//                             Id: parseInt(Object.values(element.ID)[0]),
//                             Title: Object.values(element.Title)[0],
//                             ReleaseYear: parseInt(Object.values(element.ReleaseYear)[0])
//                         }
//                         setHolderArray(holderArray => [...holderArray, convertedData])
//                     }
                    
//                 )
//                 await sleep(500)
//                 if(pageNumberCrackle === maxPageNumberCrackle) return addToDB(holderArray)
//                 setPageNumberCrackle(pageNumberCrackle+1)
//             }
//         }
//         const result = fetchData()
//     })
// },[pageNumberCrackle])

// function addToDB(addData) {
//     fetch("http://localhost:3001/crackle", {
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json"
//     },
//     body: JSON.stringify(addData)
// })
//     .then((resp) => resp.json())
//     .then((data) => data);
// }

//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Send JSON DATA TO RUBY BE             ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

// useEffect(()=>{
//     return getCrackleFromDBJson()
// },[])

// function getCrackleFromDBJson(){
//     fetch("http://localhost:3001/crackle")
//     .then(resp => resp.json())
//     .then(data => {
//         console.log("sending", data)
//         sendArrayToRuby(data)
//     })
// }

// function sendArrayToRuby(array){
//     const headers = {
//     method: "POST",
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({crackles:array[0]})
//     }

//     fetch("http://localhost:9292/crackles/addMovies", headers)
//     .then(resp => resp.json())
//     .then(data => console.log(data))
// }

//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                 Check if Movies Expired             ////\\////\\////\\////\\///
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

    // const [pageNumberCrackle, setPageNumberCrackle] = useState(undefined)
    // const [holderArray, setHolderArray] = useState([])

    // checkExpiredMovies()
    // function checkExpiredMovies(){
    //     const findAnyExpiredVideos = crackleObjsArray.filter(crackleMovieItem => new Date(crackleMovieItem.ExpirationDate).toISOString() < date)
    //     if(findAnyExpiredVideos.length > 0){
    //         //clearDB and fetch from Crackle and repopuplate local DB
    //         deleteDB()
    //         setPageNumberCrackle(1)
    //     }
    // }

    // useEffect(()=>{
    //     if(pageNumberCrackle !== undefined){
    //         fetch(`https://stg-api-v2.crackle.com/browse/movies?sortOrder=alpha-asc&pageNumber=${pageNumberCrackle}&pageSize=50`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             if(pageNumberCrackle <= data.Page.Total){
    //                 setHolderArray([...holderArray, ...data.Items])
    //                 setTimeout(()=>{setPageNumberCrackle(pageNumberCrackle+1)},1500)
    //                 console.log("iran1")
    //             }else{
    //                 addToDB(holderArray)
    //                 console.log("iran2")
    //             }
    //         })
    //     }
    // },[pageNumberCrackle])

    // function addToDB(addData) {
    //     fetch(crackleDB, {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(addData)
    //     });
    // }


    // function deleteDB() {
    //     fetch("http://localhost:3001/crackle", {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: null
    //     });
    // }

//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                         END                         ////\\////\\////\\////\\///
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

