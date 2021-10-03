import React, {useState, useEffect} from "react"
import crackleIcon from "../../../assets/crackleIcon.png"

function CrackleIcon({movie, showCrackleVideo, showExtraMovieContainer, videoLink, setVideoLink, setShowCrackleVideo, setShowExtraMovieContainer, setExtraMovieWarning}){
    const {title, release_date} = movie
    const crackleDB = "http://localhost:3001/crackle"
    const [crackleObjsArray, setCrackleObjsArray] = useState([])
    const regex = /[^a-zA-Z0-9]/g

    useEffect(()=>{                                                         // checks the crackle DB stored in file for movies of the same name
        setVideoLink(undefined)                                             // reset videolink to default state
        setShowExtraMovieContainer(false)                                   // reset extramoviecontainer to hidden, master controller
        setExtraMovieWarning(false)                                         // reset warning to false, master controller
        if(movie.id !== undefined && crackleObjsArray.length === 0){         
            fetch(crackleDB)
            .then(resp => resp.json())
            .then(data => {
                setCrackleObjsArray(data)                                   // puts all the crackle data into an array
            })
        }
        if(crackleObjsArray.length > 0){                                    // logic if the fetch was able to populate the array
            const crackleMovieObject = crackleObjsArray.find(crackleMovieItem => (
                    (crackleMovieItem.Title.replaceAll(regex, "").toLowerCase() === title.replaceAll(regex, "").toLowerCase()       // compares the name of crackles movie vs the names from TMDB, removes all special characters and spaces
                    && Math.abs(crackleMovieItem.ReleaseYear - parseInt(release_date.slice(0,4))) < 2)                              // also compare release years
                    )
                )
            if(crackleMovieObject === undefined){
                return setShowCrackleVideo(false)
            }                                                                             // if movie was not found do not create a Free movie icon
            setVideoLink(crackleMovieObject.Id)    
            setExtraMovieWarning(true)                                                                                 // if movie is found set the movie.id to useState so it can be used by component 

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

    return(
        <>
            {videoLink === undefined? null : 
                <img className={showExtraMovieContainer? "crackleIcon" : "hidden"}
                    src={crackleIcon} 
                    onClick={()=>setShowCrackleVideo(!showCrackleVideo)} 
                    alt="crackleIcon"
                />
            }
        </>
    )
}

export default CrackleIcon;


    // function test(){
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("platformId", "4feff02f-9c08-4570-9c77-52c789d6c127");
    //     myHeaders.append("region", "us");
        
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
        
    //     fetch("https://widevinedashus-crackle-com.akamaized.net/1/k/um/enc_ldzyb_Crackle-L08-1080hd-3800k.mp4/540ee898-ea31-4f92-b231-40dba58de797", requestOptions)
    //     .then(response => response.json())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
    // }


//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Crackle DATAPULL FROM API            ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

    // const [pageNumberCrackle, setPageNumberCrackle] = useState(1)
    // const [holderArray, setHolderArray] = useState([])

    // useEffect(()=>{
    //     if(pageNumberCrackle !== undefined){
    //         fetch(`https://stg-api-v2.crackle.com/browse/movies?sortOrder=alpha-asc&pageNumber=${pageNumberCrackle}&pageSize=50`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             if(pageNumberCrackle <= data.Page.Total){
    //                 setHolderArray([...holderArray, ...data.Items])
    //                 setTimeout(()=>{setPageNumberCrackle(pageNumberCrackle+1)},1500)
    //             }else{
    //                 //addToDB(holderArray)
    //             }
    //         })
    //     }
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

