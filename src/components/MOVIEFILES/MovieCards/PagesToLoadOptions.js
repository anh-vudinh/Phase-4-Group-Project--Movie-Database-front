import React from "react";

function PagesToLoadOptions({setPagesToLoad, pageNumber, totalPagesCount, currentPageCounter, pagesToLoad, setPageNumber, setCurrentPageCounter}){

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

    function handleOnPageOptionClick(option){                                                                                                   // allows client to choose how many movies to load per page
        setPageNumber(totalPagesCount >= pageNumber-(pagesToLoad)+(currentPageCounter)? pageNumber-(pagesToLoad)+(currentPageCounter): 1)       // logic to add on or remove pages from current view if client decides to choose more or less movies to see. 
        setCurrentPageCounter(1)                                                                                                                // 1 is error catcher, example user is on page 18 of 18, they then choose to change page options to load 4 more pages when they're already on the last page pageNumber will be set to 19
        setPagesToLoad(option/20)                                                                                                               // with the current MovieContainer.useEffect() an error will happen this defaults it to page 1, because that's what the user expects to show 
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