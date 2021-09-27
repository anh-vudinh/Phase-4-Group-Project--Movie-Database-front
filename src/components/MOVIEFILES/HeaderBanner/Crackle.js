import React, {useState, useEffect} from "react"
import crackleIcon from "../../../assets/crackleIcon.png"

function CrackleFreeMovie({movie, togglePage2}){
    const {title, release_date} = movie
    const crackleDB = "http://localhost:3001/crackle"
    const [crackleObjsArray, setCrackleObjsArray] = useState([])
    const [videoLink, setVideoLink] = useState(undefined)
    const [toggleShowCrackleVideo, setToggleShowCrackleVideo] = useState(false)
    const date = `${new Date().toISOString()}`
    const regex = /[^a-zA-Z0-9]/g

    useEffect(()=>{
        //test()
        setVideoLink(undefined) //reset videolink to default state
        if(movie.id !==undefined && crackleObjsArray.length === 0){
            fetch(crackleDB)
            .then(resp => resp.json())
            .then(data => {
                setCrackleObjsArray(data)
            })
        }
        if(crackleObjsArray.length > 0){
            // const crackleMovieObject = crackleObjsArray.find(crackleMovieItem => console.log(crackleMovieItem.Title.toLowerCase() === title.toLowerCase()))
            const crackleMovieObject = crackleObjsArray.find(crackleMovieItem => (
                    (crackleMovieItem.Title.replaceAll(regex, "").toLowerCase() === title.replaceAll(regex, "").toLowerCase()
                    && Math.abs(crackleMovieItem.ReleaseYear - parseInt(release_date.slice(0,4))) < 2)
                    )
                )
            if(crackleMovieObject === undefined)return;
            setVideoLink(crackleMovieObject.Id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movie])

//3667FEAA-EC17-4652-B271-82F792417E50

    function test() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("platformId", "4feff02f-9c08-4570-9c77-52c789d6c127");
        myHeaders.append("region", "us");
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'manual'
        };
        
        fetch("https://stg-api-v2.crackle.com/browse/movies?pageNumber=1&pageSize=5", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    return(
        <>
            {videoLink === undefined || togglePage2 === false? null : <img className="crackleIcon" src={crackleIcon} onClick={()=>setToggleShowCrackleVideo(!toggleShowCrackleVideo)} alt="crackleIcon"/>}
            {toggleShowCrackleVideo?
                <div className="crackleUnderlay" onDoubleClick={()=>setToggleShowCrackleVideo(false)}>
                    <div className="crackleIFrameContainer">
                        <iframe 
                            className="crackleIFrame"
                            scrolling="no"
                            src={`https://www.crackle.com/watch/${videoLink}`}
                            title="Crackle video player" 
                            frameBorder="0" 
                            allow="accelerometer; encrypted-media; autoplay;" allowFullScreen>
                        </iframe>
                    </div>
                </div>
            : null
            }
        </>
    )
}

export default CrackleFreeMovie;


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

