import React, {useEffect, useState} from "react";


function CpWatchListItem({watchlist , handleWatchListClick, selectedWL, username}) {
    
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if (watchlist.id === selectedWL.id ){
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
     }, [selectedWL])  
  
    
    return (
        <div className={isSelected? "userItem UIselected":"userItem"}  onClick={()=> handleWatchListClick(watchlist)} >
        {`${username}${watchlist.id}`}
        </div>
        )
    
}


export default CpWatchListItem;