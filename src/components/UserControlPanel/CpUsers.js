import React, {useEffect, useState} from "react";
import CpUserItem from "./CpUserItem"; 

function CpUsers({BASE_URL_BACK, setWatchlistsArray, setMoviesArray, usersArray, setUsersArray, formType, setFormType, selectedUser, setSelectedUser, setToggleCpForm}) {
    
    useEffect(()=> {
        fetch(`${BASE_URL_BACK}/cpanels`)
        .then(resp => resp.json())
        .then(data => setUsersArray(data))
    }, [])

    const userList = usersArray.map((user,index) => 
    
        <CpUserItem 
            key={index} 
            user={user} 
            selectedUser={selectedUser} 
            handleUserClick={handleUserClick}
        />
    )

    function handleUserClick(user){
        setSelectedUser(user)
    }
    function handleUserAdd(){
        setFormType(["User","add"])
        setToggleCpForm(true)
    }

    function handleUserDelete(){
        if (selectedUser === "" )
        return;
        sendToDB(`/users/${selectedUser.id}`)
    }
    
    function sendToDB(fetchURL){
        const headers = {
            method: "DELETE"
        }
        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => {
            setUsersArray(usersArray.filter(user => user.id !== selectedUser.id))
            setWatchlistsArray([])
            setMoviesArray([])
        })
    }

    return (
        <div className="userContainer">
            <div className="userColumnTitle"><p>Users</p></div>
            {userList}
            <button onClick={handleUserAdd} >Add</button>
            <button onClick={handleUserDelete}>Delete</button>
        </div>
    )  
}


export default CpUsers;