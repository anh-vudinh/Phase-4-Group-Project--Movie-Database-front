import React from "react";

function PagesToLoadOptions({setPagesToLoad, pagesToLoad}){

    const pageOptionsArray = [20, 40, 60, 80, 100]

    const pageOptionsBtns = pageOptionsArray.map((option, index) => 
        <button 
            key={index} 
            className={pagesToLoad === option/20? "pageOptionsBtnsSelected" : "pageOptionBtns"}
            onClick={()=>setPagesToLoad(option/20)}
        >
                {option}
        </button>
    )

    return(
        <div className="pageOptionsDiv">
            <div className ="pageOptionsContainer">
                <label>Display Movies: </label>
                {pageOptionsBtns}
            </div>
        </div>
    )
}

export default PagesToLoadOptions