import React, {useEffect, useState} from "react";


function CpUserItem({user , handleUserClick, selectedUser}) {
    
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if (user.username === selectedUser.username){
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser])  
  
    
    return (
        <div className={isSelected? "userItem UIselected":"userItem"}  onClick={()=> handleUserClick(user)} >
            {user.username}
        </div>
    )
    
}


export default CpUserItem;