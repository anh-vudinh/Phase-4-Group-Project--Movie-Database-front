import React, {useEffect, useState} from "react";


function CpWatchListItem({index, watchlist , handleWatchListClick, selectedWL, username}) {
    
    const {wlname, is_default} = watchlist
    const [isSelected, setIsSelected] = useState(false)
    

    useEffect(() => {
        if (watchlist.id === selectedWL.id ){
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [selectedWL])  
  
    return (
        <div className={isSelected? "userItem UIselected":"userItem"}  onClick={()=> handleWatchListClick(watchlist)} >
            <p>{`#${index+1}: ${wlname}`}</p>
            <p>{`${is_default? "*" : ""}`}</p>        
        </div>
    )
    
}


export default CpWatchListItem;