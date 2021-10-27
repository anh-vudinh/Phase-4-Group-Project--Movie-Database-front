import React, {useEffect, useState} from "react";
import CpUserItem from "./CpUserItem"; 

function CpUsers({BASE_URL_BACK, selectedUser, setSelectedUser}) {
    
    const [usersArray, setUsersArray] = useState([])
   

    useEffect(()=> {
        fetch(`${BASE_URL_BACK}/cpanels`)
        .then(resp => resp.json())
        .then(data => setUsersArray(data))

    }, [])

    const userList = usersArray.map((user,index) => 
    
       <CpUserItem key={index} user={user} selectedUser={selectedUser} handleUserClick={handleUserClick}/>
    
    )
    function handleUserClick(user){
        setSelectedUser(user)

    }
    return (
        
           <div className="userContainer">{userList}</div>
          
    )
    
}


export default CpUsers;