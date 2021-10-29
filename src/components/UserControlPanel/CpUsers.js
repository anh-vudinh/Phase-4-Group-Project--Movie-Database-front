import React, {useEffect, useState} from "react";
import CpUserItem from "./CpUserItem"; 

function CpUsers({BASE_URL_BACK, toggleCpUserProfile, setToggleCpUserProfile, isFilteredView, setIsFilteredView, filteredUsersArray, setFilteredUsersArray, setWatchlistsArray, setMoviesArray, usersArray, setUsersArray, formType, setFormType, selectedUser, setSelectedUser, setToggleCpForm}) {
    
    const [searchedUsers, setSearchedUsers] = useState({username:""})

    useEffect(()=> {
        fetch(`${BASE_URL_BACK}/cpanels`)
        .then(resp => resp.json())
        .then(data => setUsersArray(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        setFilteredUsersArray(usersArray.filter(user => user.username.includes(searchedUsers.username)))
        setIsFilteredView(searchedUsers.username === ""? false : true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchedUsers])

    const userList = usersArray.map((user,index) => 
        <CpUserItem 
            key={index} 
            user={user} 
            selectedUser={selectedUser} 
            handleUserClick={handleUserClick}
        />
    )
    
    const filteredUserList = filteredUsersArray.map((user,index) => 
        <CpUserItem 
            key={index} 
            user={user} 
            selectedUser={selectedUser} 
            handleUserClick={handleUserClick}
        />
    )

    function handleUserClick(user){
        setSelectedUser(user)
        setWatchlistsArray([])
        setMoviesArray([])
    }

    function handleUserSearchOnChange(e){
        setSearchedUsers({[e.target.name]:e.target.value})
    }

    function handleUserAdd(){
        setFormType(["User","add"])
        setToggleCpForm(true)
    }

    function handleUserUpdate(){
        if(selectedUser === "") return;
        setFormType(["User","update"])
        setToggleCpForm(false)
        setToggleCpUserProfile(true)
    }

    function handleUserDelete(){
        if (selectedUser === "") return;
        sendToDB(`/users/${selectedUser.id}`)
    }
    
    function sendToDB(fetchURL){
        const headers = {
            method: "DELETE"
        }
        fetch(`${BASE_URL_BACK}${fetchURL}`,headers)
        .then(resp => resp.json())
        .then(data => {
            if (isFilteredView){
                setFilteredUsersArray(filteredUsersArray.filter(user => user.id !== selectedUser.id))
            }
            setUsersArray(usersArray.filter(user => user.id !== selectedUser.id))
            setWatchlistsArray([])
            setMoviesArray([])
            setSelectedUser("")
        })
    }

    return (
        <div className="userContainer">
            <div className="userColumnTitle">
                <p>Users</p>
            </div>
            <input className="cpUserSearch" placeholder="Username" name="username" value={searchedUsers.username} onChange={handleUserSearchOnChange}/>
            <div className="userItemsContainer">
                {searchedUsers.username === ""? userList : filteredUserList}
            </div>
            <button onClick={handleUserAdd}>Add</button>
            <button onClick={handleUserUpdate}>Update</button>
            <button onClick={handleUserDelete}>Delete</button>
        </div>
    )  
}


export default CpUsers;