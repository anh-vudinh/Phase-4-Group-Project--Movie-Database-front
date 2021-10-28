import React,{useEffect, useState} from "react";
import CpWatchListItem from "./CpWatchListItem"


function CpWatchList({selectedUser, setMoviesArray, watchlistsArray, setWatchlistsArray, formType, setFormType, BASE_URL_BACK, selectedWL, setSelectedWL, setToggleCpForm}) {
   
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
            setWatchlistsArray(data)}
        )
    }, [selectedUser])


    const watchlistList = watchlistsArray.map((watchlist,index) => 
    
        <CpWatchListItem 
            key={index}
            index={index}
            username={selectedUser.username} 
            watchlist={watchlist} 
            selectedWL={selectedWL} 
            handleWatchListClick={handleWatchListClick}
        />
    )

    function handleWatchListClick(watchlist){
        setSelectedWL(watchlist)
    }

    function handleWLAdd(){
        setFormType(["WL","add"])
        setToggleCpForm(true)
    }
 
     function handleWLDelete(){
        if (setSelectedWL === "" ) return;
        sendToDB(`/watchlists/${selectedWL.id}`)
    }
     
    function sendToDB(fetchURL){
        const headers = {
            method: "DELETE"
        }
        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => {
            setWatchlistsArray(watchlistsArray.filter(watchlist => watchlist.id !== selectedWL.id))
            setMoviesArray([])
        })
    }

    return (
        <div className="userWatchListContainer">
            <div className="userWatchlistsColumnTitle"><p>Watchlists</p></div>
            {watchlistList}
            <button onClick={handleWLAdd} >Add</button>
            <button onClick={handleWLDelete}>Delete</button>
        </div>
    )
}


export default CpWatchList;