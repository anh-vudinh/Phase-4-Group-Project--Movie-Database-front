import React from "react";

function PagesToLoadOptions({setPagesToLoad, pageNumber, currentPageCounter, pagesToLoad, setPageNumber, setCurrentPageCounter}){

    const pageOptionsArray = [20, 40, 60, 80, 100]

    const pageOptionsBtns = pageOptionsArray.map((option, index) => 
        <button 
            key={index} 
            className={pagesToLoad === option/20? "pageOptionsBtnsSelected" : "pageOptionBtns"}
            onClick={()=>handleOnPageOptionClick(option)}
        >
                {option}
        </button>
    )

    function handleOnPageOptionClick(option){
        setPageNumber(pageNumber-(pagesToLoad)+(currentPageCounter))
        setCurrentPageCounter(1)
        setPagesToLoad(option/20)
    }

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