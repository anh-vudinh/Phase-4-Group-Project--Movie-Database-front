import React,{useEffect, useState} from "react";
import CpWatchListItem from "./CpWatchListItem"


function CpWatchList({selectedUser, BASE_URL_BACK, selectedWL, setSelectedWL}) {
   
    const [watchlistsArray, setWatchlistArray] = useState([])
    
    useEffect(()=> {
        if (selectedUser === "") return;
        const dataToSend={username:selectedUser.username}
        const headers = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }
        fetch(`${BASE_URL_BACK}/watchlists/cpWL`,headers)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setWatchlistArray(data)}
    
        )

    }, [selectedUser])


    const watchlistList = watchlistsArray.map((watchlist,index) => 
    
        <CpWatchListItem 
            key={index} 
            username={selectedUser.username} 
            watchlist={watchlist} 
            selectedWL={selectedWL} 
            handleWatchListClick={handleWatchListClick}/>
 
    )

    function handleWatchListClick(watchlist){
      setSelectedWL(watchlist)
    }
    return (
        
        <div className="userWatchListContainer">{watchlistList}</div>
          
    )

    
}


export default CpWatchList;